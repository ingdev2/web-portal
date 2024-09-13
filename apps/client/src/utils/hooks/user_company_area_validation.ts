import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIdNumberAdmin } from "@/redux/features/admin/adminSlice";

export const userCompanyAreaValidation = (
  allowedCompanyArea: (number | undefined)[]
) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberAdminLoginState = useAppSelector(
    (state) => state.adminLogin.id_number
  );
  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);

  const {
    data: adminData,
    isLoading: adminDataLoading,
    isFetching: adminDataFetching,
    error: adminDataError,
  } = useGetAdminByIdNumberQuery(idNumberAdminLoginState);

  useEffect(() => {
    if (!idNumberAdminState) {
      dispatch(setIdNumberAdmin(adminData?.id_number));
    }

    if (status === "authenticated" && session && adminData) {
      if (!allowedCompanyArea.includes(adminData?.company_area)) {
        return notFound();
      }
    }
  }, [session, status, allowedCompanyArea, idNumberAdminState, adminData]);
};
