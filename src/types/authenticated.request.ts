import { ContextConfigDefault, FastifyRequest, RawRequestDefaultExpression, RawServerDefault } from "fastify";

export interface User {
  id: number;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
}

export interface UserRawRequest extends RawRequestDefaultExpression {
  user: User;
}

// @ts-ignore
export interface AuthenticatedRequest extends FastifyRequest<any, RawServerDefault, UserRawRequest, ContextConfigDefault> {
  raw: UserRawRequest;
}
