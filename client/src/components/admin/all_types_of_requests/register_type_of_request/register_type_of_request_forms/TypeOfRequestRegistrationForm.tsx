"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import TypeOfRequestRegistrationFormData from "./TypeOfRequestRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsTypeOfMedicalRequest } from "@/redux/features/medical_req/type_of_medical_request/typeOfMedicalRequest";

import {
  useCreateMedicalReqTypeMutation,
  useGetAllMedicalReqTypesQuery,
} from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";

const TypeOfRequestRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [typeOfRequestNameLocalState, setTypeOfRequestNameLocalState] =
    useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewData, setIsSubmittingNewData] = useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const typeOfRequestErrorsState = useAppSelector(
    (state) => state.typeOfMedicalRequest.errors
  );

  const [
    createTypeOfRequest,
    {
      data: typeOfRequestData,
      isLoading: typeOfRequestLoading,
      isSuccess: typeOfRequestSuccess,
      isError: typeOfRequestError,
    },
  ] = useCreateMedicalReqTypeMutation({
    fixedCacheKey: "createTypeOfRequest",
  });

  const {
    data: allTypesOfRequestsData,
    isLoading: allTypesOfRequestsLoading,
    isFetching: allTypesOfRequestsFetching,
    error: allTypesOfRequestsError,
  } = useGetAllMedicalReqTypesQuery(null);

  const handleCreateTypeOfRequest = () => {
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

      const response: any = await createTypeOfRequest({
        name: typeOfRequestNameLocalState,
      });

      let createDataError = response.error;

      let createValidationData = response.data?.message;

      let createDataSuccess = response.data;

      if (createDataError || createValidationData) {
        const errorMessage = createDataError?.data.message;
        const validationDataMessage = createValidationData;

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
        allTypesOfRequestsData
          ?.filter((types) =>
            types.name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleGoToAllData = async () => {
    try {
      setIsSubmittingGoToAllData(true);

      await router.replace("/admin/dashboard/all_types_of_requests", {
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
    dispatch(setErrorsTypeOfMedicalRequest([]));
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
          key={"custom-confirm-modal-create-type-of-request"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear un nuevo tipo de solicitud?"
          subtitleCustomModal={
            <p>
              Se creará un nuevo tipo de solicitud con nombre:&nbsp;
              <b>{typeOfRequestNameLocalState}.</b>
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
          key={"custom-success-modal-create-type-of-request"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"type-of-request-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Tipo de solicitud creado correctamente!"
              subtitleCustomResult="El tipo de solicitud ha sido agregado a la lista de tipos de requerimientos brindados en el portal web."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de tipos de solicitudes"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            typeOfRequestErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <TypeOfRequestRegistrationFormData
        handleCreateDataFormData={handleCreateTypeOfRequest}
        idTypeRequestNameFormData={typeOfRequestNameLocalState}
        handleOnChangeTypeOfRequestNameFormData={(e) => {
          setTypeOfRequestNameLocalState(e.toUpperCase());
        }}
        handleSearchNameTypeOfRequestFormData={handleSearch}
        optionsTypeOfRequestNameFormData={options}
        buttonSubmitFormLoadingFormData={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormData={handleButtonClick}
      />
    </Col>
  );
};

export default TypeOfRequestRegistrationForm;
