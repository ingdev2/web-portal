"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFirstName } from "@/helpers/get_first_name/get_first_name";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

import {
  setNameAdmin,
  setDefaultValuesAdmin,
  setLastNameAdmin,
} from "@/redux/features/admin/adminSlice";
import { resetLoginAdminState } from "@/redux/features/login/adminLoginSlice";
import { setDefaultValuesUserPatient } from "@/redux/features/patient/patientSlice";
import { setDefaultValuesUserEps } from "@/redux/features/eps/epsSlice";
import { setDefaultValuesUserFamiliar } from "@/redux/features/familiar/familiarSlice";
import { setDefaultValuesMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";

const AdminHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberAdminState = useAppSelector(
    (state) => state.adminLogin.id_number
  );

  const nameAdminState = useAppSelector((state) => state.admin.name);
  const lastNameAdminState = useAppSelector((state) => state.admin.last_name);

  const {
    data: isAdminData,
    isLoading: isAdminLoading,
    isFetching: isAdminFetching,
    error: isAdminError,
  } = useGetAdminByIdNumberQuery(idNumberAdminState);

  useEffect(() => {
    if (!nameAdminState || !lastNameAdminState) {
      dispatch(setNameAdmin(isAdminData?.name));
      dispatch(setLastNameAdmin(isAdminData?.last_name));
    }
  }, [nameAdminState, lastNameAdminState]);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/admin/dashboard/update_personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      dispatch(resetLoginAdminState());
      dispatch(setDefaultValuesAdmin());
      dispatch(setDefaultValuesUserPatient());
      dispatch(setDefaultValuesUserEps());
      dispatch(setDefaultValuesUserFamiliar());
      dispatch(setDefaultValuesMedicalReq());
      signOut({
        redirect: true,
        callbackUrl: "/login_admin",
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      {isAdminFetching &&
      isAdminLoading &&
      !nameAdminState &&
      !lastNameAdminState ? (
        <CustomSpin />
      ) : (
        <CustomDropdown
          titleCustomDropdown={`${getFirstName(nameAdminState)} ${getFirstName(
            lastNameAdminState
          )}`}
          iconCustomItem1={<PiUserListBold />}
          iconCustomItem2={<FaSignOutAlt />}
          titleCustomItem1="Actualizar Datos"
          titleCustomItem2="Cerrar Sesión"
          handleClickCustomItem1={handleClickUpdatePersonalData}
          handleClickCustomItem2={handleClickSignOut}
          iconCustomDropdown={<UserOutlined />}
        />
      )}
    </>
  );
};

export default AdminHeaderLayout;
