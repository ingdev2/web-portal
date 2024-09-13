"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditCompanyAreaFormData from "./EditCompanyAreaFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdCompanyArea,
  setNameCompanyArea,
  setErrorsCompanyArea,
} from "@/redux/features/company_area/companyAreaSlice";

import {
  useGetCompanyAreaByIdQuery,
  useUpdateCompanyAreaByIdMutation,
} from "@/redux/apis/company_area/companyAreaApi";

const EditCompanyAreaForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idCompanyAreaState = useAppSelector((state) => state.companyArea.id);
  const nameCompanyAreaState = useAppSelector(
    (state) => state.companyArea.name
  );

  const companyAreaErrorsState = useAppSelector(
    (state) => state.companyArea.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [nameCompanyAreaLocalState, setNameCompanyAreaLocalState] =
    useState("");

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: companyAreaData,
    isLoading: companyAreaLoading,
    isFetching: companyAreaFetching,
    error: companyAreaError,
  } = useGetCompanyAreaByIdQuery(idCompanyAreaState);

  const [
    updateCompanyAreaData,
    {
      data: updateCompanyAreaMainData,
      isLoading: updateCompanyAreaLoading,
      isSuccess: updateCompanyAreaSuccess,
      isError: updateCompanyAreaError,
    },
  ] = useUpdateCompanyAreaByIdMutation({
    fixedCacheKey: "updateCompanyAreaData",
  });

  useEffect(() => {
    if (
      companyAreaData &&
      !idCompanyAreaState &&
      !companyAreaLoading &&
      !companyAreaFetching
    ) {
      dispatch(setIdCompanyArea(companyAreaData.id));
    }
  }, [companyAreaData, idCompanyAreaState]);

  const handleConfirmUpdateData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updateCompanyAreaData({
        id: idCompanyAreaState,
        updateCompanyArea: {
          name: nameCompanyAreaLocalState || nameCompanyAreaState,
        },
      });

      let editDataError = response.error;

      let editDataStatus = response.data?.status;

      let editDataValidationData = response.data?.message;

      if (editDataError || editDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editDataError?.data.message;
        const validationDataMessage = editDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsCompanyArea(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsCompanyArea(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsCompanyArea(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsCompanyArea(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editDataStatus === 202 && !editDataError) {
        setHasChanges(false);

        dispatch(
          setNameCompanyArea(nameCompanyAreaLocalState || nameCompanyAreaState)
        );

        setSuccessMessage(
          "¡Datos de tipo de solicitud actualizados correctamente!"
        );
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);
      setNameCompanyAreaLocalState("");
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsCompanyArea([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            companyAreaErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditCompanyAreaFormData
        nameCompanyAreaFormData={nameCompanyAreaState || NOT_REGISTER}
        onChangeNameCompanyAreaFormData={(e) => {
          setHasChanges(true);

          setNameCompanyAreaLocalState(e.target.value.toUpperCase());
        }}
        handleConfirmDataFormData={handleConfirmUpdateData}
        initialValuesEditFormData={{
          "edit-company-area-name": nameCompanyAreaState || NOT_REGISTER,
        }}
        isSubmittingEditFormData={isSubmittingUpdateData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditCompanyAreaForm;
