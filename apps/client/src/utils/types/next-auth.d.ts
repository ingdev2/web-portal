import NextAuth, { DefaultSession } from "next-auth";
import { UserRolType } from "../../../../apps/api/src/utils/enums/user_roles.enum";
import { AdminRolType } from "../../../../apps/api/src/utils/enums/admin_roles.enum";
import { AllowedRoleType } from "./allowed_role_type";

declare module "next-auth" {
  interface Session {
    user: {
      access_token?: string;
      refresh_token?: string;
      access_token_expires_in?: number;
      id_type?: number;
      id_number?: number;
      role?: AllowedRoleType;
    } & DefaultSession["user"];
  }
}
