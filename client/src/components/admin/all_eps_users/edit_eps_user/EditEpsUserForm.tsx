"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditAdminFormData from "./EditEpsFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdUserEps,
  setEmailUserEps,
  setCellphoneUserEps,
  setCompanyAreaUserEps,
  setErrorsUserEps,
} from "@/redux/features/eps/epsSlice";

import {
  useGetUserByIdNumberEpsQuery,
  useUpdateUserEpsMutation,
} from "@/redux/apis/users/usersApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAllEpsCompanyQuery } from "@/redux/apis/eps_company/epsCompanyApi";
import { transformNameToIdMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const EditEpsUserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idEpsState = useAppSelector((state) => state.eps.id);
  const nameEpsState = useAppSelector((state) => state.eps.name);
  const lastNameEpsState = useAppSelector((state) => state.eps.last_name);
  const idTypeNameEpsState = useAppSelector((state) => state.eps.user_id_type);
  const idNumberEpsState = useAppSelector((state) => state.eps.id_number);
  const cellphoneEpsState = useAppSelector((state) => state.eps.cellphone);
  const emailEpsState = useAppSelector((state) => state.eps.email);
  const companyAreaEpsState = useAppSelector((state) => state.eps.company_area);
  const epsCompanyEpsState = useAppSelector((state) => state.eps.eps_company);

  const epsErrorsState = useAppSelector((state) => state.eps.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [nameEpsLocalState, setNameEpsLocalState] = useState("");
  const [lastNameEpsLocalState, setLastNameEpsLocalState] = useState("");
  const [idNumberEpsLocalState, setIdNumberEpsLocalState] = useState(0);

  const [countryCode, setCountryCode] = useState(0);
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  var fullCellphoneNumber = `${countryCode}${areaCode}${phoneNumber}`;

  const [emailEpsLocalState, setEmailEpsLocalState] = useState("");
  const [companyAreaEpsLocalState, setCompanyAreaEpsLocalState] = useState(0);
  const [companyAreasListLocalState, setCompanyAreasListLocalState]: any =
    useState([]);
  const [epsCompanyUserEpsLocalState, setEpsCompanyUserEpsLocalState] =
    useState(0);
  const [epsCompaniesListLocalState, setEpsCompaniesListLocalState]: any =
    useState([]);

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: epsData,
    isLoading: epsLoading,
    isFetching: epsFetching,
    error: epsError,
  } = useGetUserByIdNumberEpsQuery(idNumberEpsState);

  const {
    data: allCompanyAreaData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: allEpsCompaniesData,
    isLoading: allEpsCompaniesLoading,
    isFetching: allEpsCompaniesFetching,
    error: allEpsCompaniesError,
  } = useGetAllEpsCompanyQuery(null);

  const [
    updateEpsData,
    {
      data: updateEpsPersonalData,
      isLoading: updateEpsLoading,
      isSuccess: updateEpsSuccess,
      isError: updateEpsError,
    },
  ] = useUpdateUserEpsMutation({
    fixedCacheKey: "updateEpsData",
  });

  const companyAreaGetId = transformNameToIdMap(allCompanyAreaData);

  useEffect(() => {
    if (epsData && !idEpsState && !epsLoading && !epsFetching) {
      dispatch(setIdUserEps(epsData.id));
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
        setErrorsUserEps("¡No se pudo obtener las áreas de la empresa!")
      );
      setShowErrorMessage(true);
      setCompanyAreasListLocalState(allCompanyAreaData);
    }
    if (
      allEpsCompaniesData &&
      !allEpsCompaniesLoading &&
      !allEpsCompaniesFetching
    ) {
      setEpsCompaniesListLocalState(allEpsCompaniesData);
    }
    if (allEpsCompaniesError) {
      dispatch(
        setErrorsUserEps(
          "¡No se pudo obtener las entidades prestadoras de salud!"
        )
      );
      setShowErrorMessage(true);
      setEpsCompaniesListLocalState(allEpsCompaniesData);
    }
  }, [
    epsData,
    idEpsState,
    allCompanyAreaData,
    allCompanyAreasError,
    allEpsCompaniesData,
    allEpsCompaniesError,
    fullCellphoneNumber,
  ]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updateEpsData({
        id: idEpsState,
        updateUser: {
          cellphone: parseInt(fullCellphoneNumber, 10) || cellphoneEpsState,
          email: emailEpsLocalState || emailEpsState,
          company_area:
            companyAreaEpsLocalState || companyAreaGetId[companyAreaEpsState],
        },
      });

      var editEpsDataError = response.error;

      var editEpsDataStatus = response.data.status;

      var editEpsDataValidationData = response.data?.message;

      if (editEpsDataError || editEpsDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editEpsDataError?.data.message;
        const validationDataMessage = editEpsDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserEps(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUserEps(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUserEps(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsUserEps(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editEpsDataStatus === 202 && !editEpsDataError) {
        setHasChanges(false);

        dispatch(
          setCellphoneUserEps(
            parseInt(fullCellphoneNumber, 10) || cellphoneEpsState
          )
        );
        dispatch(setEmailUserEps(emailEpsLocalState || emailEpsState));
        dispatch(
          setCompanyAreaUserEps(companyAreaEpsLocalState || companyAreaEpsState)
        );

        setSuccessMessage(
          "¡Datos del usuario de EPS actualizados correctamente!"
        );
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
      setEmailEpsLocalState("");
      setCompanyAreaEpsLocalState(0);
    }
  };

  const handleOnChangeCompanyArea = (value: number) => {
    setHasChanges(true);

    setCompanyAreaEpsLocalState(value);

    const selectedCompanyArea: any = companyAreasListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleOnChangeEpsCompany = (value: number) => {
    setHasChanges(true);

    setEpsCompanyUserEpsLocalState(value);

    const selectedPositionLevel: any = epsCompaniesListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handlePhoneInputChange = (value: any) => {
    setHasChanges(true);

    if (value) {
      setCountryCode(value.countryCode || 0);
      setAreaCode(value.areaCode || "");
      setPhoneNumber(value.phoneNumber || "");
    }
  };

  const combinePhoneDetails = () => {
    return `${areaCode}${phoneNumber}`;
  };

  const validatorCellphoneInput = (_: any, value: any) => {
    const combinedPhone = combinePhoneDetails();

    if (!combinedPhone) {
      return Promise.resolve();
    }

    const phonePattern = /^[0-9]+$/;

    if (
      phonePattern.test(combinedPhone) &&
      combinedPhone.length >= 7 &&
      combinedPhone.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de teléfono inválido");
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsUserEps([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={epsErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditAdminFormData
        nameAdminFormData={nameEpsState || NOT_REGISTER}
        onChangeNameAdminFormData={(e) => {
          setHasChanges(true);

          setNameEpsLocalState(e.target.value.toUpperCase());
        }}
        lastNameAdminFormData={lastNameEpsState || NOT_REGISTER}
        onChangeLastNameAdminFormData={(e) => {
          setHasChanges(true);

          setLastNameEpsLocalState(e.target.value.toUpperCase());
        }}
        idTypeNameAdminFormData={idTypeNameEpsState.toString() || NOT_REGISTER}
        idNumberAdminFormData={idNumberEpsState || NOT_REGISTER}
        onChangeIdNumberAdminFormData={(e) => {
          setHasChanges(true);

          setIdNumberEpsLocalState(e.target.value);
        }}
        companyAreaAdminValueFormData={companyAreaEpsLocalState}
        companyAreasAdminListDataForm={companyAreasListLocalState}
        companyAreasLoadingDataForm={allCompanyAreasLoading}
        onChangeCompanyAreaAdminDataForm={handleOnChangeCompanyArea}
        positionLevelAdminValueFormData={epsCompanyUserEpsLocalState}
        positionLevelsAdminListDataForm={epsCompaniesListLocalState}
        positionLevelLoadingDataForm={allEpsCompaniesLoading}
        onChangePositionLevelAdminDataForm={handleOnChangeEpsCompany}
        cellphoneEpsFormData={
          (cellphoneEpsState && cellphoneEpsState.toString()) || undefined
        }
        onChangeCellphoneEpsFormData={handlePhoneInputChange}
        validatorCellphoneInputFormData={validatorCellphoneInput}
        emailEditAdminFormData={emailEpsState || NOT_REGISTER}
        onChangeEmailEditAdminFormData={(e) => {
          setHasChanges(true);

          setEmailEpsLocalState(e.target.value.toLowerCase());
        }}
        handleConfirmEditAdminFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-eps-name": nameEpsState || NOT_REGISTER,
          "edit-eps-lastname": lastNameEpsState || NOT_REGISTER,
          "edit-eps-id-types": idTypeNameEpsState || NOT_REGISTER,
          "edit-eps-id-number": idNumberEpsState || NOT_REGISTER,
          "edit-eps-company-user-eps": epsCompanyEpsState || NOT_REGISTER,
          "edit-eps-areas-company": companyAreaEpsState || NOT_REGISTER,
          "edit-eps-cellphone": cellphoneEpsState || NOT_REGISTER,
          "edit-eps-email": emailEpsState || NOT_REGISTER,
        }}
        isSubmittingEditAdminFormData={isSubmittingUpdatePersonalData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditEpsUserForm;
