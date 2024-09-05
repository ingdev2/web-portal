"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditReasonForRejectionFormData from "./EditReasonForRejectionFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdReasonForRejection,
  setRejectionTitleReasonForRejection,
  setReasonMessageReasonForRejection,
  setErrorsReasonForRejection,
} from "@/redux/features/medical_req/reason_for_rejection/reasonForRejection";

import {
  useGetMedicalReqReasonsForRejectionByIdQuery,
  useUpdateMedicalReqReasonForRejectionByIdMutation,
} from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

const EditReasonForRejectionForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idReasonForRejectionState = useAppSelector(
    (state) => state.reasonForRejection.id
  );
  const titleNameReasonForRejectionState = useAppSelector(
    (state) => state.reasonForRejection.rejection_title
  );
  const messageReasonForRejectionState = useAppSelector(
    (state) => state.reasonForRejection.reason_message
  );

  const reasonForRejectionErrorsState = useAppSelector(
    (state) => state.reasonForRejection.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [
    titleNameReasonForRejectionLocalState,
    setTitleNameReasonForRejectionLocalState,
  ] = useState("");
  const [
    messageReasonForRejectionLocalState,
    setMessageReasonForRejectionLocalState,
  ] = useState("");

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: reasonForRejectionData,
    isLoading: reasonForRejectionLoading,
    isFetching: reasonForRejectionFetching,
    error: reasonForRejectionError,
  } = useGetMedicalReqReasonsForRejectionByIdQuery(idReasonForRejectionState);

  const [
    updateReasonForRejectionData,
    {
      data: updateReasonForRejectionMainData,
      isLoading: updateReasonForRejectionLoading,
      isSuccess: updateReasonForRejectionSuccess,
      isError: updateReasonForRejectionError,
    },
  ] = useUpdateMedicalReqReasonForRejectionByIdMutation({
    fixedCacheKey: "updateReasonForRejectionData",
  });

  useEffect(() => {
    if (
      reasonForRejectionData &&
      !idReasonForRejectionState &&
      !reasonForRejectionLoading &&
      !reasonForRejectionFetching
    ) {
      dispatch(setIdReasonForRejection(reasonForRejectionData.id));
    }
  }, [reasonForRejectionData, idReasonForRejectionState]);

  const handleConfirmUpdateData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updateReasonForRejectionData({
        id: idReasonForRejectionState,
        updateReasonForRejection: {
          rejection_title:
            titleNameReasonForRejectionLocalState ||
            titleNameReasonForRejectionState,
          reason_message:
            messageReasonForRejectionLocalState ||
            messageReasonForRejectionState,
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
          dispatch(setErrorsReasonForRejection(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsReasonForRejection(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsReasonForRejection(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsReasonForRejection(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editDataStatus === 202 && !editDataError) {
        setHasChanges(false);

        dispatch(
          setRejectionTitleReasonForRejection(
            titleNameReasonForRejectionLocalState ||
              titleNameReasonForRejectionState
          )
        );

        dispatch(
          setReasonMessageReasonForRejection(
            messageReasonForRejectionLocalState ||
              messageReasonForRejectionState
          )
        );

        setSuccessMessage(
          "¡Datos de motivo de rechazo actualizados correctamente!"
        );
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);
      setTitleNameReasonForRejectionLocalState("");
      setMessageReasonForRejectionLocalState("");
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsReasonForRejection([]));
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

      <EditReasonForRejectionFormData
        nameReasonForRejectionFormData={
          titleNameReasonForRejectionState || NOT_REGISTER
        }
        onChangeNameReasonForRejectionFormData={(e) => {
          setHasChanges(true);

          setTitleNameReasonForRejectionLocalState(
            e.target.value.toUpperCase()
          );
        }}
        messageReasonForRejectionFormData={
          messageReasonForRejectionState || NOT_REGISTER
        }
        onChangeMessageReasonForRejectionFormData={(e) => {
          setHasChanges(true);

          setMessageReasonForRejectionLocalState(e.target.value);
        }}
        handleConfirmDataFormData={handleConfirmUpdateData}
        initialValuesEditFormData={{
          "edit-reason-for-rejection-name":
            titleNameReasonForRejectionState || NOT_REGISTER,
          "edit-reason-for-rejection-message":
            messageReasonForRejectionState || NOT_REGISTER,
        }}
        isSubmittingEditFormData={isSubmittingUpdateData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditReasonForRejectionForm;
