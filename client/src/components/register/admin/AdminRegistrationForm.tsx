"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { CheckboxProps, Col } from "antd";
import AdminRegistrationFormData from "./AdminRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsAdmin } from "@/redux/features/admin/adminSlice";

import { useCreateAdminMutation } from "@/redux/apis/register/registerAdminApi";
import { useGetAllPositionLevelsQuery } from "@/redux/apis/position_level/positionLevelApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";

import { checkboxProcessingPersonalDataValidator } from "@/helpers/checkbox_validator/checkbox_validator";

const AdminRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const adminErrorsState = useAppSelector((state) => state.admin.errors);

  const [adminNameLocalState, setAdminNameLocalState] = useState("");
  const [adminLastNameLocalState, setAdminLastNameLocalState] = useState("");
  const [adminIdTypeLocalState, setAdminIdTypeLocalState] = useState(0);
  const [adminIdTypeNameLocalState, setAdminIdTypeNameLocalState] =
    useState("");
  const [adminIdTypesListLocalState, setAdminIdTypesListLocalState]: any[] =
    useState([]);
  const [adminIdNumberLocalState, setAdminIdNumberLocalState] = useState(0);
  const [adminGenderLocalState, setAdminGenderLocalState] = useState(0);
  const [adminGenderListLocalState, setAdminGenderListLocalState]: any[] =
    useState([]);
  const [adminCorporateEmailLocalState, setAdminCorporateEmailLocalState] =
    useState("");
  const [
    companyAreaNumberAdminLocalState,
    setCompanyAreaNumberAdminLocalState,
  ] = useState(0);
  const [
    adminCompanyAreasListLocalState,
    setAdminCompanyAreasListLocalState,
  ]: any = useState([]);
  const [
    positionLevelNumberAdminLocalState,
    setPositionLevelNumberAdminLocalState,
  ] = useState(0);
  const [positionLevelListLocalState, setPositionLevelListLocalState]: any =
    useState([]);
  const [
    positionLevelNameAdminLocalState,
    setPositionLevelNameAdminLocalState,
  ] = useState("");
  const [passwordAdminLocalState, setPasswordAdminLocalState] = useState("");

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewAdmin, setIsSubmittingNewAdmin] = useState(false);
  const [isSubmittingGoToAllAdmins, setIsSubmittingGoToAllAdmins] =
    useState(false);
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const {
    data: positionLevelData,
    isLoading: positionLevelLoading,
    isFetching: positionLevelFetching,
    error: positionLevelError,
  } = useGetAllPositionLevelsQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: gendersData,
    isLoading: gendersLoading,
    isFetching: gendersFetching,
    error: gendersError,
  } = useGetAllGendersQuery(null);

  const {
    data: companyAreaData,
    isLoading: companyAreaLoading,
    isFetching: companyAreaFetching,
    error: companyAreaError,
  } = useGetAllCompanyAreaQuery(null);

  const [
    createAdmin,
    {
      data: createAdminData,
      isLoading: createAdminLoading,
      isSuccess: createAdminSuccess,
      isError: createAdminError,
    },
  ] = useCreateAdminMutation({
    fixedCacheKey: "createAdminData",
  });

  useEffect(() => {
    if (!idTypesLoading && !idTypesFetching && idTypesData) {
      setAdminIdTypesListLocalState(idTypesData);
    }
    if (idTypesError) {
      dispatch(
        setErrorsAdmin("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageAdmin(true);
      setAdminIdTypesListLocalState(idTypesData);
    }
    if (!gendersLoading && !gendersFetching && gendersData) {
      setAdminGenderListLocalState(gendersData);
    }
    if (gendersError) {
      dispatch(setErrorsAdmin("¡No se pudo obtener los tipos de géneros!"));
      setShowErrorMessageAdmin(true);
      setAdminGenderListLocalState(gendersData);
    }
    if (!companyAreaLoading && !companyAreaFetching && companyAreaData) {
      setAdminCompanyAreasListLocalState(companyAreaData);
    }
    if (companyAreaError) {
      dispatch(setErrorsAdmin("¡No se pudo obtener las áreas de empresas!"));
      setShowErrorMessageAdmin(true);
      setAdminCompanyAreasListLocalState(companyAreaData);
    }
    if (!positionLevelLoading && !positionLevelFetching && positionLevelData) {
      setPositionLevelListLocalState(positionLevelData);
    }
    if (positionLevelError) {
      dispatch(setErrorsAdmin("¡No se pudo obtener los niveles de cargo!"));
      setShowErrorMessageAdmin(true);
      setPositionLevelListLocalState(positionLevelData);
    }
  }, [
    idTypesData,
    idTypesError,
    gendersData,
    gendersError,
    companyAreaData,
    companyAreaError,
    positionLevelData,
    positionLevelError,
    adminNameLocalState,
    adminLastNameLocalState,
    adminIdNumberLocalState,
  ]);

  const handleCreateAdmin = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewAdmin(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewAdmin(true);

      const response: any = await createAdmin({
        name: adminNameLocalState,
        last_name: adminLastNameLocalState,
        admin_id_type: adminIdTypeLocalState,
        id_number: adminIdNumberLocalState,
        admin_gender: adminGenderLocalState,
        position_level: positionLevelNumberAdminLocalState,
        company_area: companyAreaNumberAdminLocalState,
        corporate_email: adminCorporateEmailLocalState,
        password: passwordAdminLocalState,
      });

      var createAdminError = response.error;

      var createAdminValidationData = response.data?.message;

      var createAdminSuccess = response.data;

      if (createAdminError || createAdminValidationData) {
        const errorMessage = createAdminError?.data.message;
        const validationDataMessage = createAdminValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsAdmin(errorMessage[0]));

          setShowErrorMessageAdmin(true);
        }
        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsAdmin(validationDataMessage[0]));

          setShowErrorMessageAdmin(true);
        }

        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsAdmin(errorMessage));
          dispatch(setErrorsAdmin(validationDataMessage));
          setShowErrorMessageAdmin(true);
        }
      }

      if (
        createAdminSuccess &&
        !createAdminError &&
        !createAdminValidationData
      ) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewAdmin(false);
    }
  };

  const handleOnChangeSelectIdType = (value: number) => {
    setAdminIdTypeLocalState(value);

    const selectedType: any = adminIdTypesListLocalState?.find(
      (type: any) => type.id === value
    );

    setAdminIdTypeNameLocalState(selectedType?.name);
  };

  const handleOnChangeSelectCompanyArea = (value: number) => {
    setCompanyAreaNumberAdminLocalState(value);

    const selectedCompanyArea: any = adminCompanyAreasListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleOnChangeSelectPositionLevel = (value: number) => {
    setPositionLevelNumberAdminLocalState(value);

    const selectedPositionLevel: any = positionLevelListLocalState?.find(
      (type: any) => type.id === value
    );

    setPositionLevelNameAdminLocalState(selectedPositionLevel?.name);
  };

  const handleGoToAllAdmins = async () => {
    try {
      setIsSubmittingGoToAllAdmins(true);

      await router.replace("/admin/dashboard/all_admins", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToAllAdmins(false);
      setModalIsOpenSuccess(false);
    }
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsAdmin([]));
    setShowErrorMessageAdmin(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        paddingInline: "13px",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {modalIsOpenConfirm && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-create-admin"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear un nuevo administrador?"
          subtitleCustomModal={
            <p>
              Se creará el administrador con nombre&nbsp;
              <b>{adminNameLocalState},</b> con tipo de identificación&nbsp;
              <b>{adminIdTypeNameLocalState},</b>&nbsp;número de
              identificación&nbsp;
              <b>{adminIdNumberLocalState},</b>&nbsp;con el nivel de
              cargo:&nbsp;
              <b>{positionLevelNameAdminLocalState}</b>
            </p>
          }
          handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingNewAdmin}
          handleClickCustomModal={handleButtonClick}
        ></CustomModalTwoOptions>
      )}

      {modalIsOpenSuccess && (
        <CustomModalNoContent
          key={"custom-success-modal-create-admin"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"admin-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Administrador creado correctamente!"
              subtitleCustomResult="El administrador ha sido agregado satisfactoriamente a la lista."
              handleClickCustomResult={handleGoToAllAdmins}
              isSubmittingButton={isSubmittingGoToAllAdmins}
              textButtonCustomResult="Regresar a lista de administradores"
            />
          }
        />
      )}

      {showErrorMessageAdmin && (
        <CustomMessage
          typeMessage="error"
          message={adminErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      <AdminRegistrationFormData
        handleCreateAdminDataForm={handleCreateAdmin}
        positionLevelLoadingDataForm={positionLevelLoading}
        positionLevelListDataForm={positionLevelListLocalState}
        positionLevelValueDataForm={positionLevelNumberAdminLocalState}
        handleOnChangePositionLevelDataForm={handleOnChangeSelectPositionLevel}
        adminNameDataForm={adminNameLocalState}
        handleOnChangeAdminNameDataForm={(e) => {
          setAdminNameLocalState(e.target.value.toUpperCase());
        }}
        adminLastNameDataForm={adminLastNameLocalState}
        handleOnChangeAdminLastNameDataForm={(e) => {
          setAdminLastNameLocalState(e.target.value.toUpperCase());
        }}
        idTypeSelectorLoadingDataForm={
          idTypesLoading && idTypesFetching && !idTypesData
        }
        adminIdTypeValueDataForm={adminIdTypeLocalState}
        handleOnChangeSelectIdTypeDataForm={handleOnChangeSelectIdType}
        adminIdTypeListDataForm={adminIdTypesListLocalState}
        adminIdNumberDataForm={adminIdNumberLocalState}
        handleOnChangeAdminIdNumberDataForm={(e) => {
          setAdminIdNumberLocalState(parseInt(e.target.value, 10));
        }}
        genderSelectorLoadingDataForm={
          gendersLoading && gendersFetching && !gendersData
        }
        adminGenderValueDataForm={adminGenderLocalState}
        companyAreasLoadingDataForm={companyAreaLoading}
        companyAreaValueDataForm={companyAreaNumberAdminLocalState}
        handleOnChangeCompanyAreaDataForm={handleOnChangeSelectCompanyArea}
        adminCompanyAreasListDataForm={adminCompanyAreasListLocalState}
        handleOnChangeSelectGenderDataForm={(e) => {
          setAdminGenderLocalState(e);
        }}
        adminGenderListDataForm={adminGenderListLocalState}
        adminEmailDataForm={adminCorporateEmailLocalState}
        handleOnChangeAdminEmailDataForm={(e) => {
          setAdminCorporateEmailLocalState(e.target.value.toLowerCase());
        }}
        passwordAdminValueDataForm={passwordAdminLocalState}
        handleOnChangePasswordAdminValueDataForm={(e) =>
          setPasswordAdminLocalState(e.target.value.trim())
        }
        checkboxValidatorDataForm={checkboxProcessingPersonalDataValidator}
        isCheckboxCheckedDataForm={isCheckboxChecked}
        handleCheckboxChangeDataForm={handleCheckboxChange}
        buttonSubmitFormLoadingDataForm={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormDataForm={handleButtonClick}
        handleOnChangeValidatorPasswordDataForm={(_, value) => {
          if (
            !adminNameLocalState ||
            !adminLastNameLocalState ||
            !adminIdNumberLocalState
          ) {
            return Promise.resolve();
          }

          const passwordUpperCase = value?.toUpperCase();

          const nameWords = adminNameLocalState?.toUpperCase().split(" ");

          const lastNameWords = adminLastNameLocalState
            ?.toUpperCase()
            .split(" ");

          const idNumber = String(adminIdNumberLocalState);

          if (nameWords?.some((word) => passwordUpperCase?.includes(word))) {
            return Promise.reject(
              new Error(
                "¡La contraseña no puede contener datos del nombre del usuario!"
              )
            );
          }

          if (
            lastNameWords?.some((word) => passwordUpperCase?.includes(word))
          ) {
            return Promise.reject(
              new Error(
                "¡La contraseña no puede contener datos del apellido del usuario!"
              )
            );
          }

          if (passwordUpperCase?.includes(idNumber)) {
            return Promise.reject(
              new Error(
                "¡La contraseña no puede contener datos del número de cédula del usuario!"
              )
            );
          }

          return Promise.resolve();
        }}
      />
    </Col>
  );
};

export default AdminRegistrationForm;
