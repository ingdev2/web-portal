"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AdminPersonalDataFormData from "./AdminPersonalDataFormData";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import AdminChangePasswordForm from "../admin_change_password_form/AdminChangePasswordForm";
import { TbPasswordUser } from "react-icons/tb";

import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import { setErrorsAdmin } from "@/redux/features/admin/adminSlice";

import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

const AdminPersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idAdminState = useAppSelector((state) => state.admin.id);
  const nameAdminState = useAppSelector((state) => state.admin.name);
  const lastNameAdminState = useAppSelector((state) => state.admin.last_name);
  const idTypeNameAdminState = useAppSelector(
    (state) => state.admin.admin_id_type_abbrev
  );
  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);
  const genderNameAdminState = useAppSelector(
    (state) => state.admin.admin_gender_abbrev
  );
  const positionLevelNameAdminState = useAppSelector(
    (state) => state.admin.position_level_abbrev
  );
  const companyAreaNameAdminState = useAppSelector(
    (state) => state.admin.company_area_abbrev
  );
  const emailAdminState = useAppSelector(
    (state) => state.admin.corporate_email
  );
  const authMethodAdminState = useAppSelector(
    (state) => state.admin.authentication_method
  );
  const adminErrorsState = useAppSelector((state) => state.admin.errors);

  const isOpenModalChangePassword = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const [authMethodAdminLocalState, setAuthMethodAdminLocalState] = useState(0);
  const [
    adminAuthMethodsListLocalState,
    setAdminAuthMethodsListLocalState,
  ]: any = useState([]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  useEffect(() => {
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setAdminAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsAdmin("¡No se pudo obtener los métodos de autenticación!")
      );
      setShowErrorMessageAdmin(true);
      setAdminAuthMethodsListLocalState(authMethodData);
    }
  }, [authMethodData, authMethodError, isOpenModalChangePassword]);

  return (
    <>
      {!nameAdminState ||
      !lastNameAdminState ||
      !idTypeNameAdminState ||
      !idNumberAdminState ||
      !genderNameAdminState ? (
        <CustomSpin />
      ) : (
        <>
          {showErrorMessageAdmin && (
            <CustomMessage
              typeMessage="error"
              message={adminErrorsState?.toString() || "¡Error en la petición!"}
            />
          )}

          {showSuccessMessage && (
            <CustomMessage
              typeMessage="success"
              message={successMessage || "¡Proceso finalizado con éxito!"}
            />
          )}

          {isOpenModalChangePassword && (
            <CustomModalNoContent
              key={"custom-modal-change-password-admin"}
              widthCustomModalNoContent={"31%"}
              openCustomModalState={isOpenModalChangePassword}
              closableCustomModal={true}
              maskClosableCustomModal={true}
              handleCancelCustomModal={() => {
                dispatch(setAdminModalIsOpen(false));
              }}
              contentCustomModal={<AdminChangePasswordForm />}
            />
          )}

          <AdminPersonalDataFormData
            nameAdminFormData={nameAdminState || NOT_REGISTER}
            lastNameAdminFormData={lastNameAdminState || NOT_REGISTER}
            idTypeNameAdminFormData={idTypeNameAdminState || NOT_REGISTER}
            idNumberAdminFormData={idNumberAdminState || NOT_REGISTER}
            genderNameAdminFormData={genderNameAdminState || NOT_REGISTER}
            positionLevelAdminFormData={
              positionLevelNameAdminState || NOT_REGISTER
            }
            emailAdminFormData={emailAdminState || NOT_REGISTER}
            companyAreaAdminFormData={companyAreaNameAdminState}
            authMethodAdminFormData={authMethodAdminState}
            onChangeAuthMethodAdminFormData={(e) => {}}
            adminAuthMethodsListFormData={adminAuthMethodsListLocalState}
            iconChangePasswordAdminDataForm={<TbPasswordUser size={17} />}
            onClickChangePasswordDataForm={() => {
              dispatch(setAdminModalIsOpen(true));
            }}
          />
        </>
      )}
    </>
  );
};

export default AdminPersonalDataForm;
