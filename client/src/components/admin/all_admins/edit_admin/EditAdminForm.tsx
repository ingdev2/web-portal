"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditAdminFormData from "./EditAdminFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdSelectedAdmin,
  setNameSelectedAdmin,
  setLastNameSelectedAdmin,
  setIdNumberSelectedAdmin,
  setCorporateEmailSelectedAdmin,
  setCompanyAreaSelectedAdmin,
  setPositionLevelSelectedAdmin,
  setErrorsSelectedAdmin,
} from "@/redux/features/admin/selectedAdminSlice";

import {
  useGetAdminByIdNumberQuery,
  useUpdateAdminMutation,
} from "@/redux/apis/admins/adminsApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAllPositionLevelsQuery } from "@/redux/apis/position_level/positionLevelApi";
import { transformNameToIdMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const EditAdminForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idAdminState = useAppSelector((state) => state.selectedAdmin.id);
  const nameAdminState = useAppSelector((state) => state.selectedAdmin.name);
  const lastNameAdminState = useAppSelector(
    (state) => state.selectedAdmin.last_name
  );
  const idTypeNameAdminState = useAppSelector(
    (state) => state.selectedAdmin.admin_id_type
  );
  const idNumberAdminState = useAppSelector(
    (state) => state.selectedAdmin.id_number
  );
  const emailAdminState = useAppSelector(
    (state) => state.selectedAdmin.corporate_email
  );
  const companyAreaAdminState = useAppSelector(
    (state) => state.selectedAdmin.company_area
  );
  const positionLevelAdminState = useAppSelector(
    (state) => state.selectedAdmin.position_level
  );

  const adminErrorsState = useAppSelector(
    (state) => state.selectedAdmin.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [nameAdminLocalState, setNameAdminLocalState] = useState("");
  const [lastNameAdminLocalState, setLastNameAdminLocalState] = useState("");
  const [idNumberAdminLocalState, setIdNumberAdminLocalState] = useState(0);
  const [emailAdminLocalState, setEmailAdminLocalState] = useState("");
  const [companyAreaAdminLocalState, setCompanyAreaAdminLocalState] =
    useState(0);
  const [companyAreasListLocalState, setCompanyAreasListLocalState]: any =
    useState([]);
  const [positionLevelAdminLocalState, setPositionLevelAdminLocalState] =
    useState(0);
  const [positionLevelsListLocalState, setPositionLevelsListLocalState]: any =
    useState([]);

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const {
    data: adminData,
    isLoading: adminLoading,
    isFetching: adminFetching,
    error: adminError,
  } = useGetAdminByIdNumberQuery(idNumberAdminState);

  const {
    data: allCompanyAreaData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: allPositionLevelsData,
    isLoading: allPositionLevelsLoading,
    isFetching: allPositionLevelsFetching,
    error: allPositionLevelsError,
  } = useGetAllPositionLevelsQuery(null);

  const [
    updateAdminData,
    {
      data: createMedicalReqPatientData,
      isLoading: createMedicalReqPatientLoading,
      isSuccess: createMedicalReqPatientSuccess,
      isError: createMedicalReqPatientError,
    },
  ] = useUpdateAdminMutation({
    fixedCacheKey: "updateAdminData",
  });

  const companyAreaGetId = transformNameToIdMap(allCompanyAreaData);
  const positionLevelGetId = transformNameToIdMap(allPositionLevelsData);

  useEffect(() => {
    if (adminData && !idAdminState && !adminLoading && !adminFetching) {
      dispatch(setIdSelectedAdmin(adminData.id));
    }
    if (
      allCompanyAreaData &&
      !allCompanyAreasLoading &&
      !allCompanyAreasFetching
    ) {
      setCompanyAreasListLocalState(allCompanyAreaData);
    }
    if (allCompanyAreasError) {
      dispatch(
        setErrorsSelectedAdmin("¡No se pudo obtener las áreas de la empresa!")
      );
      setShowErrorMessagePatient(true);
      setCompanyAreasListLocalState(allCompanyAreaData);
    }
    if (
      allPositionLevelsData &&
      !allPositionLevelsLoading &&
      !allPositionLevelsFetching
    ) {
      setPositionLevelsListLocalState(allPositionLevelsData);
    }
    if (allPositionLevelsError) {
      dispatch(
        setErrorsSelectedAdmin("¡No se pudo obtener los niveles del cargo!")
      );
      setShowErrorMessagePatient(true);
      setPositionLevelsListLocalState(allPositionLevelsData);
    }
  }, [
    adminData,
    idAdminState,
    allCompanyAreaData,
    allCompanyAreasError,
    allPositionLevelsData,
    allPositionLevelsError,
  ]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updateAdminData({
        id: idAdminState,
        updateAdmin: {
          name: nameAdminLocalState || nameAdminState,
          last_name: lastNameAdminLocalState || lastNameAdminState,
          id_number: idNumberAdminLocalState || idNumberAdminState,
          corporate_email: emailAdminLocalState || emailAdminState,
          company_area:
            companyAreaAdminLocalState ||
            companyAreaGetId[companyAreaAdminState],
          position_level:
            positionLevelAdminLocalState ||
            positionLevelGetId[positionLevelAdminState],
        },
      });

      var editAdminDataError = response.error;

      var editAdminDataStatus = response.data.status;

      var editAdminDataValidationData = response.data?.message;

      if (editAdminDataError || editAdminDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editAdminDataError?.data.message;
        const validationDataMessage = editAdminDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsSelectedAdmin(errorMessage[0]));

          setShowErrorMessagePatient(true);
        }
        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsSelectedAdmin(validationDataMessage[0]));

          setShowErrorMessagePatient(true);
        }
        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsSelectedAdmin(errorMessage));
          dispatch(setErrorsSelectedAdmin(validationDataMessage));
          setShowErrorMessagePatient(true);
        }
      }

      if (editAdminDataStatus === 202 && !editAdminDataError) {
        setHasChanges(false);

        dispatch(setNameSelectedAdmin(nameAdminLocalState || nameAdminState));
        dispatch(
          setLastNameSelectedAdmin(
            lastNameAdminLocalState || lastNameAdminState
          )
        );
        dispatch(
          setIdNumberSelectedAdmin(
            idNumberAdminLocalState || idNumberAdminState
          )
        );
        dispatch(
          setCorporateEmailSelectedAdmin(
            emailAdminLocalState || emailAdminState
          )
        );
        dispatch(
          setCompanyAreaSelectedAdmin(
            companyAreaAdminLocalState || companyAreaAdminState
          )
        );
        dispatch(
          setPositionLevelSelectedAdmin(
            positionLevelAdminLocalState || positionLevelAdminState
          )
        );

        setSuccessMessage(
          "¡Datos del administrador actualizados correctamente!"
        );
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
      setNameAdminLocalState(""),
        setLastNameAdminLocalState(""),
        setIdNumberAdminLocalState(0),
        setEmailAdminLocalState("");
      setCompanyAreaAdminLocalState(0);
      setPositionLevelAdminLocalState(0);
    }
  };

  const handleOnChangeCompanyArea = (value: number) => {
    setHasChanges(true);

    setCompanyAreaAdminLocalState(value);

    const selectedCompanyArea: any = companyAreasListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleOnChangePositionLevel = (value: number) => {
    setHasChanges(true);

    setPositionLevelAdminLocalState(value);

    const selectedPositionLevel: any = positionLevelsListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsSelectedAdmin([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <>
      {showErrorMessagePatient && (
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

      <EditAdminFormData
        nameAdminFormData={nameAdminState || NOT_REGISTER}
        onChangeNameAdminFormData={(e) => {
          setHasChanges(true);

          setNameAdminLocalState(e.target.value.toUpperCase());
        }}
        lastNameAdminFormData={lastNameAdminState || NOT_REGISTER}
        onChangeLastNameAdminFormData={(e) => {
          setHasChanges(true);

          setLastNameAdminLocalState(e.target.value.toUpperCase());
        }}
        idTypeNameAdminFormData={
          idTypeNameAdminState.toString() || NOT_REGISTER
        }
        idNumberAdminFormData={idNumberAdminState || NOT_REGISTER}
        onChangeIdNumberAdminFormData={(e) => {
          setHasChanges(true);

          setIdNumberAdminLocalState(e.target.value);
        }}
        companyAreaAdminValueFormData={companyAreaAdminLocalState}
        companyAreasAdminListDataForm={companyAreasListLocalState}
        companyAreasLoadingDataForm={allCompanyAreasLoading}
        onChangeCompanyAreaAdminDataForm={handleOnChangeCompanyArea}
        positionLevelAdminValueFormData={positionLevelAdminLocalState}
        positionLevelsAdminListDataForm={positionLevelsListLocalState}
        positionLevelLoadingDataForm={allPositionLevelsLoading}
        onChangePositionLevelAdminDataForm={handleOnChangePositionLevel}
        emailEditAdminFormData={emailAdminState || NOT_REGISTER}
        onChangeEmailEditAdminFormData={(e) => {
          setHasChanges(true);

          setEmailAdminLocalState(e.target.value.toLowerCase());
        }}
        handleConfirmEditAdminFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-admin-name": nameAdminState || NOT_REGISTER,
          "edit-admin-lastname": lastNameAdminState || NOT_REGISTER,
          "edit-admin-id-types": idTypeNameAdminState || NOT_REGISTER,
          "email-patient-hosvital": emailAdminState || NOT_REGISTER,
          "edit-admin-id-number": idNumberAdminState || NOT_REGISTER,
          "edit-admin-position-level": positionLevelAdminState || NOT_REGISTER,
          "edit-admin-areas-company": companyAreaAdminState || NOT_REGISTER,
          "edit-admin-email": emailAdminState || NOT_REGISTER,
        }}
        isSubmittingEditAdminFormData={isSubmittingUpdatePersonalData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditAdminForm;
