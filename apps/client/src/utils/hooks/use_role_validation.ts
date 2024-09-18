import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { AllowedRoleType } from "../types/allowed_role_type";

export const useRoleValidation = (allowedRoles: AllowedRoleType[]) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session && session.user.role) {
      const userRole = session.user.role;

      if (!allowedRoles.includes(userRole)) {
        notFound();
      }
    }
  }, [session, status, allowedRoles]);
};
