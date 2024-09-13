"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditEpsCompanyFormData from "./EditEpsCompanyFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdEpsCompany,
  setMainEmailEpsCompany,
  setErrorsEpsCompany,
} from "@/redux/features/eps_company/epsCompanySlice";

import {
  useGetEpsCompanyByIdQuery,
  useUpdateEpsCompanyByIdMutation,
} from "@/redux/apis/eps_company/epsCompanyApi";

const EditEpsCompanyForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idEpsState = useAppSelector((state) => state.epsCompany.id);
  const nameEpsCompanyState = useAppSelector((state) => state.epsCompany.name);
  const nitEpsCompanyState = useAppSelector((state) => state.epsCompany.nit);
  const mainEmailEpsCompanyState = useAppSelector(
    (state) => state.epsCompany.main_email
  );

  const epsCompayErrorsState = useAppSelector(
    (state) => state.epsCompany.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [nameEpsCompanyLocalState, setNameEpsCompanyLocalState] = useState("");
  const [nitEpsCompanyLocalState, setNitEpsCompanyLocalState] = useState("");
  const [emailEpsCompanyLocalState, setEmailEpsCompanyLocalState] =
    useState("");

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: epsData,
    isLoading: epsLoading,
    isFetching: epsFetching,
    error: epsError,
  } = useGetEpsCompanyByIdQuery(idEpsState);

  const [
    updateEpsCompanyData,
    {
      data: updateEpsCompanyMainData,
      isLoading: updateEpsLoading,
      isSuccess: updateEpsSuccess,
      isError: updateEpsError,
    },
  ] = useUpdateEpsCompanyByIdMutation({
    fixedCacheKey: "updateEpsCompanyData",
  });

  useEffect(() => {
    if (epsData && !idEpsState && !epsLoading && !epsFetching) {
      dispatch(setIdEpsCompany(epsData.id));
    }
  }, [epsData, idEpsState]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updateEpsCompanyData({
        id: idEpsState,
        updateData: {
          main_email: emailEpsCompanyLocalState || mainEmailEpsCompanyState,
        },
      });

      let editEpsDataError = response.error;

      let editEpsDataStatus = response.data?.status;

      let editEpsDataValidationData = response.data?.message;

      if (editEpsDataError || editEpsDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editEpsDataError?.data.message;
        const validationDataMessage = editEpsDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsEpsCompany(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsEpsCompany(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsEpsCompany(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsEpsCompany(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editEpsDataStatus === 202 && !editEpsDataError) {
        setHasChanges(false);

        dispatch(
          setMainEmailEpsCompany(
            emailEpsCompanyLocalState || mainEmailEpsCompanyState
          )
        );

        setSuccessMessage(
          "¡Datos de empresa de EPS actualizados correctamente!"
        );
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);
      setEmailEpsCompanyLocalState("");
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsEpsCompany([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={epsCompayErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditEpsCompanyFormData
        nameEpsCompanyFormData={nameEpsCompanyState || NOT_REGISTER}
        onChangeNameEpsCompanyFormData={(e) => {
          setHasChanges(true);

          setNameEpsCompanyLocalState(e.target.value.toUpperCase());
        }}
        nitEpsCompanyFormData={nitEpsCompanyState || NOT_REGISTER}
        onChangeNitEpsCompanyFormData={(e) => {
          setHasChanges(true);

          setNitEpsCompanyLocalState(e.target.value);
        }}
        emailEpsCompanyFormData={nitEpsCompanyState || NOT_REGISTER}
        onChangeEmailEpsCompanyFormData={(e) => {
          setHasChanges(true);

          setEmailEpsCompanyLocalState(e.target.value.toLowerCase());
        }}
        handleConfirmEpsCompanyFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-eps-company-nit": nitEpsCompanyState || NOT_REGISTER,
          "edit-eps-company-name": nameEpsCompanyState || NOT_REGISTER,
          "edit-eps-company-email": mainEmailEpsCompanyState || NOT_REGISTER,
        }}
        isSubmittingEditAdminFormData={isSubmittingUpdateData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditEpsCompanyForm;
