"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import CompanyAreaRegistrationFormData from "./CompanyAreaRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsCompanyArea } from "@/redux/features/company_area/companyAreaSlice";

import {
  useCreateCompanyAreaMutation,
  useGetAllCompanyAreaQuery,
} from "@/redux/apis/company_area/companyAreaApi";

const CompanyAreaRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [companyAreaNameLocalState, setCompanyAreaNameLocalState] =
    useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewData, setIsSubmittingNewData] = useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const companyAreaErrorsState = useAppSelector(
    (state) => state.companyArea.errors
  );

  const [
    createCompanyArea,
    {
      data: companyAreaData,
      isLoading: companyAreaLoading,
      isSuccess: companyAreaSuccess,
      isError: companyAreaError,
    },
  ] = useCreateCompanyAreaMutation({
    fixedCacheKey: "createCompanyArea",
  });

  const {
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const handleCreateCompanyArea = () => {
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

      const response: any = await createCompanyArea({
        name: companyAreaNameLocalState,
      });

      let createDataError = response.error;

      let createValidationData = response.data?.message;

      let createDataSuccess = response.data;

      if (createDataError || createValidationData) {
        const errorMessage = createDataError?.data.message;
        const validationDataMessage = createValidationData;

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
        allCompanyAreasData
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

      await router.replace("/admin/dashboard/all_company_areas", {
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
    dispatch(setErrorsCompanyArea([]));
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
          key={"custom-confirm-modal-create-company-area"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear una nueva área de empresa?"
          subtitleCustomModal={
            <p>
              Se creará una nueva área de empresa con nombre:&nbsp;
              <b>{companyAreaNameLocalState}.</b>
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
          key={"custom-success-modal-create-company-area"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"company-area-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Área de empresa creada correctamente!"
              subtitleCustomResult="El área ha sido agregada a la lista de áreas de una empresa."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de áreas de empresa"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            companyAreaErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <CompanyAreaRegistrationFormData
        handleCreateDataFormData={handleCreateCompanyArea}
        companyAreaNameFormData={companyAreaNameLocalState}
        handleOnChangeCompanyAreaNameFormData={(e) => {
          setCompanyAreaNameLocalState(e.toUpperCase());
        }}
        handleSearchNameCompanyAreaFormData={handleSearch}
        optionsCompanyAreasNameFormData={options}
        buttonSubmitFormLoadingFormData={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormData={handleButtonClick}
      />
    </Col>
  );
};

export default CompanyAreaRegistrationForm;
