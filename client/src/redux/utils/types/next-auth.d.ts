import NextAuth, { DefaultSession } from "next-auth";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

declare module "next-auth" {
  interface Session {
    user: {
      access_token?: string;
      refresh_token?: string;
      access_token_expires_in?: number;
      id_type?: number;
      id_number?: number;
      role?: UserRolType;
    } & DefaultSession["user"];
  }
}
