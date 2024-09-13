"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditTypeOfRequestFormData from "./EditTypeOfRequestFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdTypeOfMedicalRequest,
  setNameTypeOfMedicalRequest,
  setErrorsTypeOfMedicalRequest,
} from "@/redux/features/medical_req/type_of_medical_request/typeOfMedicalRequestSlice";

import {
  useGetMedicalReqTypeByIdQuery,
  useUpdateMedicalReqTypeByIdMutation,
} from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";

const EditTypeOfRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idTypeOfRequestState = useAppSelector(
    (state) => state.typeOfMedicalRequest.id
  );
  const nameTypeOfRequestState = useAppSelector(
    (state) => state.typeOfMedicalRequest.name
  );

  const reasonForRejectionErrorsState = useAppSelector(
    (state) => state.typeOfMedicalRequest.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [nameTypeOfRequestLocalState, setNameTypeOfRequestLocalState] =
    useState("");

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: typeOfRequestData,
    isLoading: typeOfRequestLoading,
    isFetching: typeOfRequestFetching,
    error: typeOfRequestError,
  } = useGetMedicalReqTypeByIdQuery(idTypeOfRequestState);

  const [
    updateTypeOfRequestData,
    {
      data: updateTypeOfRequestMainData,
      isLoading: updateTypeOfRequestLoading,
      isSuccess: updateTypeOfRequestSuccess,
      isError: updateTypeOfRequestError,
    },
  ] = useUpdateMedicalReqTypeByIdMutation({
    fixedCacheKey: "updateTypeOfRequestData",
  });

  useEffect(() => {
    if (
      typeOfRequestData &&
      !idTypeOfRequestState &&
      !typeOfRequestLoading &&
      !typeOfRequestFetching
    ) {
      dispatch(setIdTypeOfMedicalRequest(typeOfRequestData.id));
    }
  }, [typeOfRequestData, idTypeOfRequestState]);

  const handleConfirmUpdateData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updateTypeOfRequestData({
        id: idTypeOfRequestState,
        updateTypeOfRequest: {
          name: nameTypeOfRequestLocalState || nameTypeOfRequestState,
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
          dispatch(setErrorsTypeOfMedicalRequest(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsTypeOfMedicalRequest(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsTypeOfMedicalRequest(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsTypeOfMedicalRequest(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editDataStatus === 202 && !editDataError) {
        setHasChanges(false);

        dispatch(
          setNameTypeOfMedicalRequest(
            nameTypeOfRequestLocalState || nameTypeOfRequestState
          )
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
      setNameTypeOfRequestLocalState("");
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsTypeOfMedicalRequest([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            reasonForRejectionErrorsState?.toString() ||
            "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditTypeOfRequestFormData
        nameTypeOfRequestFormData={nameTypeOfRequestState || NOT_REGISTER}
        onChangeNameTypeOfRequestFormData={(e) => {
          setHasChanges(true);

          setNameTypeOfRequestLocalState(e.target.value.toUpperCase());
        }}
        handleConfirmDataFormData={handleConfirmUpdateData}
        initialValuesEditFormData={{
          "edit-type-of-request-name": nameTypeOfRequestState || NOT_REGISTER,
        }}
        isSubmittingEditFormData={isSubmittingUpdateData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditTypeOfRequestForm;
