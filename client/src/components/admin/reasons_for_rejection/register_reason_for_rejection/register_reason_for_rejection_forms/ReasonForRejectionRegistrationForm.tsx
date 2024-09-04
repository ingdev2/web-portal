"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import ReasonForRejectionRegistrationFormData from "./ReasonForRejectionRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsReasonForRejection } from "@/redux/features/medical_req/reason_for_rejection/reasonForRejection";

import {
  useCreateMedicalReqReasonForRejectionMutation,
  useGetAllMedicalReqReasonsForRejectionQuery,
} from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

const ReasonForRejectionRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [
    reasonForRejectionNameLocalState,
    setReasonForRejectionNameLocalState,
  ] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [
    reasonForRejectionMessageLocalState,
    setReasonForRejectionMessageLocalState,
  ] = useState("");

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewData, setIsSubmittingNewData] = useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const reasonForRejectionErrorsState = useAppSelector(
    (state) => state.reasonForRejection.errors
  );

  const [
    createReasonForRejection,
    {
      data: reasonForRejectionData,
      isLoading: reasonForRejectionLoading,
      isSuccess: reasonForRejectionSuccess,
      isError: reasonForRejectionError,
    },
  ] = useCreateMedicalReqReasonForRejectionMutation({
    fixedCacheKey: "createReasonForRejection",
  });

  const {
    data: allReasonsForRejectionData,
    isLoading: allReasonsForRejectionLoading,
    isFetching: allReasonsForRejectionFetching,
    error: allReasonsForRejectionError,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const handleCreateReasonForRejection = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewData(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewData(true);

      const response: any = await createReasonForRejection({
        rejection_title: reasonForRejectionNameLocalState,
        reason_message: reasonForRejectionMessageLocalState,
      });

      let createDataError = response.error;

      let createValidationData = response.data?.message;

      let createDataSuccess = response.data;

      if (createDataError || createValidationData) {
        const errorMessage = createDataError?.data.message;
        const validationDataMessage = createValidationData;

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

      if (createDataSuccess && !createDataError && !createValidationData) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewData(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allReasonsForRejectionData
          ?.filter((reason) =>
            reason.rejection_title.toUpperCase().includes(value.toUpperCase())
          )
          .map((company) => ({
            value: company.rejection_title,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleGoToAllData = async () => {
    try {
      setIsSubmittingGoToAllData(true);

      await router.replace("/admin/dashboard/all_reasons_for_rejection", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToAllData(false);
      setModalIsOpenSuccess(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsReasonForRejection([]));
    setShowErrorMessage(false);
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
        alignContent: "center",
        paddingInline: "13px",
      }}
    >
      {modalIsOpenConfirm && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-create-reason-for-rejection"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear un nuevo motivo de rechazo de solicitud?"
          subtitleCustomModal={
            <p>
              Se creará el motivo de rechazo con nombre:&nbsp;
              <b>{reasonForRejectionNameLocalState}.</b>
            </p>
          }
          handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingNewData}
          handleClickCustomModal={handleButtonClick}
        ></CustomModalTwoOptions>
      )}

      {modalIsOpenSuccess && (
        <CustomModalNoContent
          key={"custom-success-modal-create-reason-for-rejection"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"reason-for-rejection-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Motivo de rechazo creado correctamente!"
              subtitleCustomResult="El motivo ha sido agregado a la lista de motivos de rechazo de solicitud."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de motivos de rechazo"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            reasonForRejectionErrorsState?.toString() ||
            "¡Error en la petición!"
          }
        />
      )}

      <ReasonForRejectionRegistrationFormData
        handleCreateUserEpsCompanyDataForm={handleCreateReasonForRejection}
        reasonForRejectionNameDataForm={reasonForRejectionNameLocalState}
        handleOnChangeReasonForRejectionNameDataForm={(e) => {
          setReasonForRejectionNameLocalState(e.toUpperCase());
        }}
        handleSearchNameReasonForRejectionDataForm={handleSearch}
        optionsReasonForRejectionNameDataForm={options}
        reasonForRejectionMessageDataForm={reasonForRejectionMessageLocalState}
        handleOnChangeReasonForRejectionMessageDataForm={(e) => {
          setReasonForRejectionMessageLocalState(e.target.value);
        }}
        buttonSubmitFormLoadingDataForm={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormDataForm={handleButtonClick}
      />
    </Col>
  );
};

export default ReasonForRejectionRegistrationForm;
