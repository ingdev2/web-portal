"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import EpsCompanyRegistrationFormData from "./EpsCompanyRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsEpsCompany } from "@/redux/features/eps_company/epsCompanySlice";

import {
  useCreateEpsCompanyMutation,
  useGetAllEpsCompanyQuery,
} from "@/redux/apis/eps_company/epsCompanyApi";

const EpsCompanyRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [epsCompanyNameLocalState, setEpsCompanyNameLocalState] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [epsCompanyNitLocalState, setEpsCompanyNitLocalState] = useState("");
  const [epsCompanyEmailLocalState, setEpsCompanyEmailLocalState] =
    useState("");

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewEpsCompany, setIsSubmittingNewEpsCompany] =
    useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const userEpsCompanyErrorsState = useAppSelector(
    (state) => state.epsCompany.errors
  );

  const [
    createEpsCompany,
    {
      data: createEpsCompanyData,
      isLoading: createEpsCompanyLoading,
      isSuccess: createEpsCompanySuccess,
      isError: createEpsCompanyError,
    },
  ] = useCreateEpsCompanyMutation({
    fixedCacheKey: "createEpsCompany",
  });

  const {
    data: allEpsCompanyData,
    isLoading: allEpsCompanyLoading,
    isFetching: allEpsCompanyFetching,
    error: allEpsCompanyError,
  } = useGetAllEpsCompanyQuery(null);

  const handleCreateEpsCompany = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewEpsCompany(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewEpsCompany(true);

      const response: any = await createEpsCompany({
        name: epsCompanyNameLocalState,
        nit: epsCompanyNitLocalState,
        main_email: epsCompanyEmailLocalState,
      });

      let createDataError = response.error;

      let createValidationData = response.data?.message;

      let createDataSuccess = response.data;

      if (createDataError || createValidationData) {
        const errorMessage = createDataError?.data.message;
        const validationDataMessage = createValidationData;

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

      if (createDataSuccess && !createDataError && !createValidationData) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewEpsCompany(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allEpsCompanyData
          ?.filter((companies) =>
            companies.name.toUpperCase().includes(value.toUpperCase())
          )
          .map((company) => ({
            value: company.name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleGoToAllData = async () => {
    try {
      setIsSubmittingGoToAllData(true);

      await router.replace("/admin/dashboard/all_eps_companies", {
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
    dispatch(setErrorsEpsCompany([]));
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
          key={"custom-confirm-modal-create-user-eps-company"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear una nueva empresa de EPS?"
          subtitleCustomModal={
            <p>
              Se creará la empresa con nombre:&nbsp;
              <b>{epsCompanyNameLocalState},</b>
              &nbsp; con número NIT:&nbsp;<b>{epsCompanyNitLocalState}.</b>
            </p>
          }
          handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingNewEpsCompany}
          handleClickCustomModal={handleButtonClick}
        ></CustomModalTwoOptions>
      )}

      {modalIsOpenSuccess && (
        <CustomModalNoContent
          key={"custom-success-modal-create-user-eps-company"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"user-eps-company-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Empresa de EPS creada correctamente!"
              subtitleCustomResult="La empresa ha sido agregada a la lista de empresa de EPS."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de empresa EPS"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            userEpsCompanyErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <EpsCompanyRegistrationFormData
        handleCreateUserEpsCompanyDataForm={handleCreateEpsCompany}
        epsCompanyNameDataForm={epsCompanyNameLocalState}
        handleOnChangeEpsCompanyNameDataForm={(e) => {
          setEpsCompanyNameLocalState(e.toUpperCase());
        }}
        handleSearchNameEpsCompanyDataForm={handleSearch}
        optionsEpsCompanyNameDataForm={options}
        epsCompanyNitDataForm={epsCompanyNitLocalState}
        handleOnChangeEpsCompanyNitDataForm={(e) => {
          setEpsCompanyNitLocalState(e.target.value);
        }}
        epsCompanyEmailDataForm={epsCompanyEmailLocalState}
        handleOnChangeEpsCompanyEmailDataForm={(e) => {
          setEpsCompanyEmailLocalState(e.target.value.toLowerCase());
        }}
        buttonSubmitFormLoadingDataForm={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormDataForm={handleButtonClick}
      />
    </Col>
  );
};

export default EpsCompanyRegistrationForm;
