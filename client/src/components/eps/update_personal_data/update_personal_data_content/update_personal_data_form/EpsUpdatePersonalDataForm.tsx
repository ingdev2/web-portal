"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import EpsUpdatePersonalDataFormData from "./EpsUpdatePersonalDataFormData";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  setAuthMethodUserEps,
  setCellphoneUserEps,
  setEmailUserEps,
  setErrorsUserEps,
  setCompanyAreaUserEps,
} from "@/redux/features/eps/epsSlice";
import { setIdUserEps } from "@/redux/features/eps/epsSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";
import { useUpdateUserEpsMutation } from "@/redux/apis/users/usersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";

const EpsUpdatePersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserEpsState = useAppSelector((state) => state.eps.id);
  const nameUserEpsState = useAppSelector((state) => state.eps.name);
  const lastNameUserEpsState = useAppSelector((state) => state.eps.last_name);
  const idTypeNameUserEpsState = useAppSelector(
    (state) => state.eps.id_type_abbrev
  );
  const idNumberUserEpsState = useAppSelector((state) => state.eps.id_number);
  const genderNameUserEpsState = useAppSelector(
    (state) => state.eps.user_gender_abbrev
  );
  const epsCompanyAbbrevUserEpsState = useAppSelector(
    (state) => state.eps.eps_company_abbrev
  );
  const companyAreaNumberUserEpsState = useAppSelector(
    (state) => state.eps.company_area
  );
  const emailUserEpsState = useAppSelector((state) => state.eps.email);
  const cellphoneUserEpsState = useAppSelector((state) => state.eps.cellphone);
  const authMethodUserEpsState = useAppSelector(
    (state) => state.eps.authentication_method
  );
  const epsErrorsState = useAppSelector((state) => state.eps.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [emailUserEpsLocalState, setEmailUserEpsLocalState] = useState("");
  const [cellphoneUserEpsLocalState, setCellphoneUserEpsLocalState] =
    useState(0);
  const [authMethodEpsLocalState, setAuthMethodEpsLocalState] = useState(0);
  const [epsAuthMethodsListLocalState, setEpsAuthMethodsListLocalState]: any =
    useState([]);
  const [
    companyAreaNumberUserEpsLocalState,
    setCompanyAreaNumberUserEpsLocalState,
  ] = useState(0);
  const [epsCompanyAreasListLocalState, setEpsCompanyAreasListLocalState]: any =
    useState([]);

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageEps, setShowErrorMessageEps] = useState(false);

  const {
    data: userEpsData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberUserEpsState);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const {
    data: companyAreaData,
    isLoading: companyAreaLoading,
    isFetching: companyAreaFetching,
    error: companyAreaError,
  } = useGetAllCompanyAreaQuery(null);

  const [
    updatePersonalDataEps,
    {
      data: createMedicalReqEpsData,
      isLoading: createMedicalReqEpsLoading,
      isSuccess: createMedicalReqEpsSuccess,
      isError: createMedicalReqEpsError,
    },
  ] = useUpdateUserEpsMutation({
    fixedCacheKey: "updatePersonalDataEps",
  });

  useEffect(() => {
    if (!userEpsLoading && !userEpsFetching && userEpsData && !idUserEpsState) {
      dispatch(setIdUserEps(userEpsData.id));
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setEpsAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserEps("¡No se pudo obtener los métodos de autenticación!")
      );
      setShowErrorMessageEps(true);
      setEpsAuthMethodsListLocalState(authMethodData);
    }
    if (!companyAreaLoading && !companyAreaFetching && companyAreaData) {
      setEpsCompanyAreasListLocalState(companyAreaData);
    }
    if (companyAreaError) {
      dispatch(setErrorsUserEps("¡No se pudo obtener las áreas de empresas!"));
      setShowErrorMessageEps(true);
      setEpsCompanyAreasListLocalState(companyAreaData);
    }
  }, [userEpsData, userEpsLoading, userEpsFetching, idUserEpsState]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updatePersonalDataEps({
        id: idUserEpsState,
        updateUser: {
          email: emailUserEpsLocalState || emailUserEpsState,
          cellphone: cellphoneUserEpsLocalState || cellphoneUserEpsState,
          authentication_method:
            authMethodEpsLocalState || authMethodUserEpsState,
          company_area:
            companyAreaNumberUserEpsLocalState || companyAreaNumberUserEpsState,
        },
      });

      var updatePersonalDataError = response.error;

      var updatePersonalDataStatus = response.data.status;

      var updatePersonalDataValidationData = response.data?.message;

      if (updatePersonalDataError || updatePersonalDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = updatePersonalDataError?.data.message;
        const validationDataMessage = updatePersonalDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserEps(errorMessage[0]));

          setShowErrorMessageEps(true);
        }
        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUserEps(validationDataMessage[0]));

          setShowErrorMessageEps(true);
        }
        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsUserEps(errorMessage));
          dispatch(setErrorsUserEps(validationDataMessage));
          setShowErrorMessageEps(true);
        }
      }

      if (updatePersonalDataStatus === 202 && !updatePersonalDataError) {
        setHasChanges(false);

        dispatch(setEmailUserEps(emailUserEpsLocalState || emailUserEpsState));
        dispatch(
          setCellphoneUserEps(
            cellphoneUserEpsLocalState || cellphoneUserEpsState
          )
        );
        dispatch(
          setAuthMethodUserEps(
            authMethodEpsLocalState || authMethodUserEpsState
          )
        );
        dispatch(
          setCompanyAreaUserEps(
            companyAreaNumberUserEpsLocalState || companyAreaNumberUserEpsState
          )
        );

        setSuccessMessage("¡Datos del paciente actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
      setEmailUserEpsLocalState("");
      setCellphoneUserEpsLocalState(0);
      setAuthMethodEpsLocalState(0);
    }
  };

  const handleOnChangeCompanyArea = (value: number) => {
    setHasChanges(true);

    setCompanyAreaNumberUserEpsLocalState(value);

    const selectedCompanyArea: any = epsCompanyAreasListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsUserEps([]));
    setShowErrorMessageEps(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "450px",
        minWidth: "231px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        padding: "0px",
        margin: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          paddingBlock: "7px",
          paddingInline: "7px",
        }}
      >
        <Button
          style={{
            paddingInline: "7px",
            color: "#015E90",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="link"
          size="large"
          className="back-to-homepage-button"
          icon={<IoMdArrowRoundBack size={17} />}
          onClick={() => {
            router.push("/eps/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      {userEpsLoading && userEpsFetching ? (
        <CustomSpin />
      ) : (
        <Card
          key={"card-update-personal-data-eps-form"}
          style={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
            padding: "0px",
            marginInline: "13px",
          }}
        >
          {showErrorMessageEps && (
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

          <EpsUpdatePersonalDataFormData
            nameUserEpsFormData={
              `${nameUserEpsState} ${lastNameUserEpsState}` || NOT_REGISTER
            }
            idTypeNameUserEpsFormData={idTypeNameUserEpsState || NOT_REGISTER}
            idNumberUserEpsFormData={idNumberUserEpsState || NOT_REGISTER}
            genderNameUserEpsFormData={genderNameUserEpsState || NOT_REGISTER}
            epsCompanyUserEpsFormData={
              epsCompanyAbbrevUserEpsState || NOT_REGISTER
            }
            handleConfirmUpdatePersonalDataFormData={
              handleConfirmUpdatePersonalData
            }
            initialValuesUpdatePersonalDataFormData={{
              "email-eps-hosvital": emailUserEpsState || NOT_REGISTER,
              "cellphone-eps-hosvital": cellphoneUserEpsState || NOT_REGISTER,
              "areas-company-eps":
                companyAreaNumberUserEpsState || NOT_REGISTER,
              "radio-select-auth-method-update-personal-data-eps":
                authMethodUserEpsState,
            }}
            emailUserEpsFormData={emailUserEpsState || NOT_REGISTER}
            onChangeEmailUserEpsFormData={(e) => {
              setHasChanges(true);

              setEmailUserEpsLocalState(e.target.value.toLowerCase());
            }}
            cellphoneUserEpsFormData={cellphoneUserEpsState || NOT_REGISTER}
            onChangeCellphoneUserEpsFormData={(e) => {
              setHasChanges(true);

              setCellphoneUserEpsLocalState(parseInt(e.target.value, 10));
            }}
            companyAreasLoadingDataForm={companyAreaLoading}
            companyAreaValueDataForm={companyAreaNumberUserEpsLocalState}
            handleOnChangeCompanyAreaDataForm={handleOnChangeCompanyArea}
            epsCompanyAreasListDataForm={epsCompanyAreasListLocalState}
            authMethodUserEpsFormData={authMethodUserEpsState}
            onChangeAuthMethodUserEpsFormData={(e) => {
              setHasChanges(true);

              setAuthMethodEpsLocalState(e.target.value);
            }}
            epsAuthMethodsListFormData={epsAuthMethodsListLocalState}
            isSubmittingUpdatePersonalDataFormData={
              isSubmittingUpdatePersonalData
            }
            hasChangesFormData={hasChanges}
            handleButtonClickFormData={handleButtonClick}
          />
        </Card>
      )}
    </Col>
  );
};

export default EpsUpdatePersonalDataForm;
