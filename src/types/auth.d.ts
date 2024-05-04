/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      error?: string;
    } & DefaultSession["user"];
    accessToken: string;
    error?: string;
  }

  interface User extends DefaultUser {
    accessToken: string;
    jwtExpiredTime: number;
  }
}
