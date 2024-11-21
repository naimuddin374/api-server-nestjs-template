import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { AuthenticationResultType, InitiateAuthRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { CognitoGroup, UserType } from "../types/systemType";
// import { MemberCreateRequest } from "../users/dto/member-create-request.dto";
import { isValidEmail } from "./helper";

export interface CognitoUserData {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ListerEmailData {
  companyName?: string;
  userName?: string;
  userType?: any;
}

export class CognitoWrapper {
  protected cogniotClient: CognitoIdentityServiceProvider;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.cogniotClient = new AWS.CognitoIdentityServiceProvider({
      apiVersion: "2016-04-18",
    });
  }

  // public async createNewCognitoUser(requestBody: MemberCreateRequest, password: string, emailData?: ListerEmailData): Promise<string | null> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const poolData = {
  //         UserPoolId: process.env.AWS_USER_POOL || "",
  //         Username: requestBody.email,
  //         TemporaryPassword: password,
  //         UserAttributes: [
  //           { Name: "email", Value: requestBody.email },
  //           { Name: "email_verified", Value: "true" },
  //           { Name: "family_name", Value: requestBody.lastName },
  //           { Name: "given_name", Value: requestBody.firstName },
  //           { Name: "custom:userType", Value: requestBody.userType },
  //           { Name: "custom:listerCompany", Value: emailData && emailData.companyName ? emailData.companyName : "" },
  //           { Name: "custom:listerAdminName", Value: emailData && emailData.userName ? emailData.userName : "" },
  //         ],
  //       };
  //       const cognitoUser: CognitoIdentityServiceProvider.AdminCreateUserResponse = await this.cogniotClient.adminCreateUser(poolData).promise();
  //       console.log("created users=", cognitoUser);
  //       if (cognitoUser.User && cognitoUser.User.Username) resolve(cognitoUser.User.Username);
  //       else resolve(null);
  //     } catch (error: any) {
  //       console.log("error happened in cogniot user creation, error = ", error.toString());
  //       reject(error.toString().split(":").pop());
  //     }
  //   });
  // }

  public async addCongnitoUsertoGroup(userName: string, groupName: string): Promise<void> {
    console.log("userName=", userName);
    try {
      const poolData: CognitoIdentityServiceProvider.AdminAddUserToGroupRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: userName,
        GroupName: groupName,
      };

      if (groupName === CognitoGroup.SuperAdmin) throw new Error("Requested group cannot be assigned through api request. Contact with Admin");

      const addGroupResponse = await this.cogniotClient.adminAddUserToGroup(poolData).promise();
      console.log("add group response = ", addGroupResponse);
    } catch (error: any) {
      // console.log('add user to cogniot group error = ', error.toString());
      console.log("assign to group error=", error);
      throw new Error(error);
    }
  }

  //** DELETE COGNITO GROUP */
  public async removeUserGroup(userName: string, groupName: string): Promise<void> {
    try {
      const removeUserParams: CognitoIdentityServiceProvider.AdminRemoveUserFromGroupRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: userName,
        GroupName: groupName,
      };
      const deleteGroupResponse = await this.cogniotClient.adminRemoveUserFromGroup(removeUserParams).promise();
      console.log("delete group response = ", deleteGroupResponse);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // Enable cognito user
  public async enableCognitoUser(cognitoUserId: string): Promise<void> {
    try {
      const poolData: CognitoIdentityServiceProvider.AdminEnableUserRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: cognitoUserId,
      };

      const userResponse = await this.cogniotClient.adminEnableUser(poolData).promise();
      console.log("enable user response = ", userResponse);
    } catch (error: any) {
      console.log("enable user error = ", error.toString());
    }
  }

  // Disable cognito user
  public async disableCognitoUser(cognitoUserId: string): Promise<void> {
    try {
      const poolData: CognitoIdentityServiceProvider.AdminDisableUserRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: cognitoUserId,
      };

      const userResponse = await this.cogniotClient.adminDisableUser(poolData).promise();
      console.log("disable user response = ", userResponse);
    } catch (error: any) {
      console.log("disable user error = ", error.toString());
    }
  }

  // Update cognito user
  public async updateCognitoUser(cognitoUserId: string, firstName: string, lastName: string, userType?: UserType): Promise<void> {
    try {
      const userAttributes = [
        {
          Name: "family_name",
          Value: lastName,
        },
        {
          Name: "given_name",
          Value: firstName,
        },
      ];

      if (userType) {
        userAttributes.push({
          Name: "custom:userType",
          Value: userType,
        });
      }

      const poolData: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: cognitoUserId,
        UserAttributes: userAttributes,
      };

      const userResponse = await this.cogniotClient.adminUpdateUserAttributes(poolData).promise();
      console.log("update user attr response = ", userResponse);
    } catch (error: any) {
      console.log("update user attr error = ", error.toString());
    }
  }

  // Get cognito user group
  public async getCognitoUserGroup(email: string): Promise<CognitoIdentityServiceProvider.Types.AdminListGroupsForUserResponse | undefined> {
    let cognitoUserName = "";
    try {
      if (isValidEmail(email)) {
        const result: any = await this.getCognitoUser(email);
        if (!result) return undefined;
        cognitoUserName = result.Username;
      } else {
        cognitoUserName = email;
      }

      const poolData: CognitoIdentityServiceProvider.AdminGetUserRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: cognitoUserName,
      };

      const userResponse = await this.cogniotClient.adminListGroupsForUser(poolData).promise();
      console.log("get user attr response = ", userResponse);
      return userResponse;
    } catch (error: any) {
      console.log("get user attr error = ", error.toString());
    }
  }

  // Get cognito user
  public async getCognitoUser(email: string): Promise<CognitoIdentityServiceProvider.Types.UserType | undefined> {
    let filter = "";
    try {
      if (isValidEmail(email)) {
        filter = `email = "${email}"`;
      } else {
        filter = `username = "${email}"`;
      }

      const params: CognitoIdentityServiceProvider.ListUsersRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Filter: filter, // Filter by email address
        Limit: 1, // Set limit to 1 as email should be unique
      };

      const result: any = await this.cogniotClient.listUsers(params).promise();
      if (result.Users.length === 0) {
        throw new Error("User not found");
      }
      return result.Users[0];
    } catch (error: any) {
      console.log("get user attr error = ", error.toString());
    }
  }

  /** THIS METHOD WILL RESET USER PASSWORD */
  public async getResetUserPassword(email: string): Promise<CognitoIdentityServiceProvider.Types.AdminResetUserPasswordResponse | undefined> {
    try {
      const poolData: CognitoIdentityServiceProvider.AdminGetUserRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: email,
      };

      const userResponse = await this.cogniotClient.adminResetUserPassword(poolData).promise();
      console.log("get user attr response = ", userResponse);
      return userResponse;
    } catch (error: any) {
      console.log("get user attr error = ", error.toString());
      throw error;
    }
  }

  /** THIS METHOD WILL FORCE LOGOUT */
  public async userForceLogout(email: string): Promise<CognitoIdentityServiceProvider.Types.AdminUserGlobalSignOutResponse | undefined> {
    try {
      const poolData: CognitoIdentityServiceProvider.AdminGetUserRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: email,
      };

      const userResponse = await this.cogniotClient.adminUserGlobalSignOut(poolData).promise();
      console.log("get user attr response = ", userResponse);
      return userResponse;
    } catch (error: any) {
      console.log("get user attr error = ", error.toString());
      throw error;
    }
  }

  /** THIS METHOD WILL CREATE AND CONFIRM A USER IN ONE FUNCTION CALL. IT IS CREATED ONLY TO BE USED IN TESTING CODE */

  // public async createAndConfirmUser(
  //   requestBody: any,
  //   temporaryPassword: string,
  //   permanentPassword: string,
  //   emailData?: ListerEmailData,
  // ): Promise<string | null> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const createdUser = await this.createNewCognitoUser(requestBody, temporaryPassword, emailData);

  //       // Set the user's permanent password
  //       if (createdUser) {
  //         await this.cogniotClient
  //           .adminSetUserPassword({
  //             UserPoolId: process.env.AWS_USER_POOL || "",
  //             Username: requestBody.email,
  //             Password: permanentPassword,
  //             Permanent: true,
  //           })
  //           .promise();
  //       }
  //       if (createdUser) resolve(createdUser);
  //       else resolve(null);
  //     } catch (error: any) {
  //       console.log("error happened in cognito user creation, error = ", error.toString());
  //       reject(error.toString().split(":").pop());
  //     }
  //   });
  // }

  public async loginUser(email: string, password: string): Promise<AuthenticationResultType | null> {
    try {
      const authParams: InitiateAuthRequest = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: process.env["COGNITO_CLIENT_ID"]!,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      };

      const response = await this.cogniotClient.initiateAuth(authParams).promise();

      if (response.AuthenticationResult && response.AuthenticationResult.AccessToken) {
        return response.AuthenticationResult;
      }

      return null;
    } catch (err) {
      console.error("Error occured during login: ", err);
      return null;
    }
  }

  public async refreshToken(token: string): Promise<string | undefined> {
    try {
      const params = {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: process.env["COGNITO_CLIENT_ID"]!,
        AuthParameters: {
          REFRESH_TOKEN: token,
        },
      };

      const authResult = await this.cogniotClient.initiateAuth(params).promise();

      return authResult.AuthenticationResult?.AccessToken;
    } catch (err) {}
  }

  public async deleteCognitoUser(email: string): Promise<boolean> {
    try {
      const poolData: CognitoIdentityServiceProvider.AdminDeleteUserRequest = {
        UserPoolId: process.env.AWS_USER_POOL ?? "",
        Username: email,
      };

      await this.cogniotClient.adminDeleteUser(poolData).promise();
      return true;
    } catch (error: any) {
      console.error("Error in deleting an user: ", error.toString());
      return false;
    }
  }
}
