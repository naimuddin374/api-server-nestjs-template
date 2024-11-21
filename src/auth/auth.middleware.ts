import { Injectable, Logger, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { CognitoWrapper } from "../util/cognitoWrapper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwk: { keys: PublicKey[] } = require(`../../${process.env.JKS_FILE}.json`);

interface CognitoToken extends JwtPayload {
  sub: string;
  "cognito:groups": string[];
}
interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

export interface User {
  id: string;
  groups: string[];
}

const pemMap = jwk.keys.reduce((result: { [key: string]: string }, key) => {
  const pem = jwkToPem(key as jwkToPem.JWK);
  result[key.kid] = pem;
  return result;
}, {});

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  private readonly cognitoWrapper = new CognitoWrapper()

  private verifyJwt(token: string, accessPem?: string): CognitoToken {
    if (accessPem === undefined) {
      this.logger.log("user not exist in JWT");
      throw new UnauthorizedException("Invalid Token");
    }
    try {
      return verify(token, accessPem, { algorithms: ["RS256"] }) as CognitoToken;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        this.logger.log("Expired Token");
      } else {
        this.logger.log("Error resolving token:", err);
      }
      throw new UnauthorizedException(err.message);
    }
  }

  private getKeyId(token: string): string {
    const decodedToken = decode(token, { complete: true });
    if (!decodedToken || !decodedToken.header.kid) {
      this.logger.log("Invalid JWT format");
      throw new UnauthorizedException("Invalid Token");
    }
    return decodedToken.header.kid;
  }

  public async use(req: any, _: any, next: (error?: unknown) => void) {
    const token = req.headers["authorization"] as string;

    try {
      if (!token) {
        this.logger.log("No token provided");
        throw new UnauthorizedException("No token provided");
      }
      // console.log('req headers = ', req.headers);

      const keyId = this.getKeyId(token);
      const decoded = this.verifyJwt(token, pemMap[keyId]);
      const userId = decoded.sub;

      // Get cogntio user info
      const cognitoUser = await this.cognitoWrapper.getCognitoUser(userId)
      if (!cognitoUser) {
        throw new UnauthorizedException("Invalid Token");
      }
      
      if (!cognitoUser.Enabled) {
        throw new UnauthorizedException("Your account is disabled");
      }
      let userEmail = ""
      let userRole = ""
      let userName = ""
      if (cognitoUser.Attributes && cognitoUser.Attributes.length > 0) {
        cognitoUser.Attributes.forEach(element => {
          if (element.Value) {
            switch (element.Name) {
              case "email":
                userEmail = element.Value
                break;
              case "custom:role":
                userRole = element.Value
                break;
              case "given_name":
                const lastName = cognitoUser.Attributes?.find(e => e.Name === "family_name" && e.Value)?.Value
                userName = `${element.Value} ${lastName}`
                break;
            }
          }
        })
      }

      req.user = {
        userId,
        userEmail,
        userRole,
        userName,
      };
      next();
    } catch (error: unknown) {
      // To end the request lifecycle we need to call next even if we throw an exception during the process.
      next(error);
    }
  }
}
