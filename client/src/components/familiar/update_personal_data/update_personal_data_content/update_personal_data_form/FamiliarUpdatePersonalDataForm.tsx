"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import FamiliarUpdatePersonalDataFormData from "./FamiliarUpdatePersonalDataFormData";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  setIdUserFamiliar,
  setAuthMethodUserFamiliar,
  setCellphoneUserFamiliar,
  setEmailUserFamiliar,
  setWhatsappUserFamiliar,
  setErrorsUserFamiliar,
} from "@/redux/features/familiar/familiarSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";
import { useUpdateFamiliarMutation } from "@/redux/apis/relatives/relativesApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

const FamiliarUpdatePersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const NOT_REGISTER: string = "NO REGISTRA";

  const namePatientOfFamiliarState = useAppSelector(
    (state) => state.patient.name
  );
  const idUserFamiliarState = useAppSelector((state) => state.familiar.id);
  const nameUserFamiliarState = useAppSelector((state) => state.familiar.name);
  const lastNameUserFamiliarState = useAppSelector(
    (state) => state.familiar.last_name
  );
  const idTypeNameUserFamiliarState = useAppSelector(
    (state) => state.familiar.id_type_abbrev
  );
  const idNumberUserFamiliarState = useAppSelector(
    (state) => state.familiar.id_number
  );
  const genderNameUserFamiliarState = useAppSelector(
    (state) => state.familiar.user_gender_abbrev
  );
  const relWithPatientAbbrevUserState = useAppSelector(
    (state) => state.familiar.rel_with_patient_abbrev
  );
  const emailUserFamiliarState = useAppSelector(
    (state) => state.familiar.email
  );
  const cellphoneUserFamiliarState = useAppSelector(
    (state) => state.familiar.cellphone
  );
  const whatsappNumberUserFamiliarState = useAppSelector(
    (state) => state.familiar.whatsapp
  );
  const authMethodUserFamiliarState = useAppSelector(
    (state) => state.familiar.authentication_method
  );
  const familiarErrorsState = useAppSelector((state) => state.familiar.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [emailUserFamiliarLocalState, setEmailUserFamiliarLocalState] =
    useState("");
  const [cellphoneUserFamiliarLocalState, setCellphoneUserFamiliarLocalState] =
    useState(0);
  const [
    whatsappNumberUserFamiliarLocalState,
    setWhatsappNumberUserFamiliarLocalState,
  ] = useState(0);
  const [authMethodFamiliarLocalState, setAuthMethodFamiliarLocalState] =
    useState(0);
  const [epsAuthMethodsListLocalState, setEpsAuthMethodsListLocalState]: any =
    useState([]);
  const [
    familiarCompanyAreasListLocalState,
    setFamiliarCompanyAreasListLocalState,
  ]: any = useState([]);

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageFamiliar, setShowErrorMessageFamiliar] =
    useState(false);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdQuery(idUserFamiliarState);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [
    updatePersonalDataFamiliar,
    {
      data: createMedicalReqFamiliarData,
      isLoading: createMedicalReqFamiliarLoading,
      isSuccess: createMedicalReqFamiliarSuccess,
      isError: createMedicalReqFamiliarError,
    },
  ] = useUpdateFamiliarMutation({
    fixedCacheKey: "updatePersonalDataFamiliar",
  });

  useEffect(() => {
    if (
      !userFamiliarLoading &&
      !userFamiliarFetching &&
      userFamiliarData &&
      !idUserFamiliarState
    ) {
      dispatch(setIdUserFamiliar(userFamiliarData.id));
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setEpsAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserFamiliar(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessageFamiliar(true);
      setEpsAuthMethodsListLocalState(authMethodData);
    }
  }, [
    userFamiliarData,
    userFamiliarLoading,
    userFamiliarFetching,
    idUserFamiliarState,
  ]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updatePersonalDataFamiliar({
        id: idUserFamiliarState,
        updateFamiliar: {
          email: emailUserFamiliarLocalState || emailUserFamiliarState,
          cellphone:
            cellphoneUserFamiliarLocalState || cellphoneUserFamiliarState,
          whatsapp:
            whatsappNumberUserFamiliarLocalState ||
            whatsappNumberUserFamiliarState,
          authentication_method:
            authMethodFamiliarLocalState || authMethodUserFamiliarState,
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
          dispatch(setErrorsUserFamiliar(errorMessage[0]));

          setShowErrorMessageFamiliar(true);
        }
        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUserFamiliar(validationDataMessage[0]));

          setShowErrorMessageFamiliar(true);
        }
        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsUserFamiliar(errorMessage));
          dispatch(setErrorsUserFamiliar(validationDataMessage));
          setShowErrorMessageFamiliar(true);
        }
      }

      if (updatePersonalDataStatus === 202 && !updatePersonalDataError) {
        setHasChanges(false);

        dispatch(
          setEmailUserFamiliar(
            emailUserFamiliarLocalState || emailUserFamiliarState
          )
        );
        dispatch(
          setCellphoneUserFamiliar(
            cellphoneUserFamiliarLocalState || cellphoneUserFamiliarState
          )
        );
        dispatch(
          setWhatsappUserFamiliar(
            whatsappNumberUserFamiliarLocalState ||
              whatsappNumberUserFamiliarState
          )
        );
        dispatch(
          setAuthMethodUserFamiliar(
            authMethodFamiliarLocalState || authMethodUserFamiliarState
          )
        );

        setSuccessMessage("¡Datos del paciente actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
      setEmailUserFamiliarLocalState("");
      setCellphoneUserFamiliarLocalState(0);
      setAuthMethodFamiliarLocalState(0);
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsUserFamiliar([]));
    setShowErrorMessageFamiliar(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "540px",
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
            router.push("/familiar/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      {userFamiliarLoading && userFamiliarFetching ? (
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
          {showErrorMessageFamiliar && (
            <CustomMessage
              typeMessage="error"
              message={
                familiarErrorsState?.toString() || "¡Error en la petición!"
              }
            />
          )}

          {showSuccessMessage && (
            <CustomMessage
              typeMessage="success"
              message={successMessage || "¡Proceso finalizado con éxito!"}
            />
          )}

          <FamiliarUpdatePersonalDataFormData
            nameUserPatientFormData={
              `${nameUserFamiliarState} ${lastNameUserFamiliarState}` ||
              NOT_REGISTER
            }
            nameOfPatientFormData={namePatientOfFamiliarState}
            idTypeNameUserPatientFormData={
              idTypeNameUserFamiliarState || NOT_REGISTER
            }
            idNumberUserPatientFormData={
              idNumberUserFamiliarState || NOT_REGISTER
            }
            genderNameUserPatientFormData={
              genderNameUserFamiliarState || NOT_REGISTER
            }
            relwithPatientUserFamiliarFormData={
              relWithPatientAbbrevUserState || NOT_REGISTER
            }
            handleConfirmUpdatePersonalDataFormData={
              handleConfirmUpdatePersonalData
            }
            initialValuesUpdatePersonalDataFormData={{
              "email-familiar": emailUserFamiliarState || NOT_REGISTER,
              "cellphone-familiar": cellphoneUserFamiliarState || NOT_REGISTER,
              "whatsapp-familiar":
                whatsappNumberUserFamiliarState || NOT_REGISTER,
              "radio-select-auth-method-update-personal-data-familiar":
                authMethodUserFamiliarState,
            }}
            emailUserPatientFormData={emailUserFamiliarState || NOT_REGISTER}
            onChangeEmailUserPatientFormData={(e) => {
              setHasChanges(true);

              setEmailUserFamiliarLocalState(e.target.value.toLowerCase());
            }}
            cellphoneUserPatientFormData={
              cellphoneUserFamiliarState || NOT_REGISTER
            }
            onChangeCellphoneUserPatientFormData={(e) => {
              setHasChanges(true);

              setCellphoneUserFamiliarLocalState(parseInt(e.target.value, 10));
            }}
            whatsappUserPatientFormData={
              whatsappNumberUserFamiliarState || NOT_REGISTER
            }
            onChangeWhatsappUserPatientFormData={(e) => {
              setHasChanges(true);

              setWhatsappNumberUserFamiliarLocalState(
                parseInt(e.target.value, 10)
              );
            }}
            authMethodUserPatientFormData={authMethodUserFamiliarState}
            onChangeAuthMethodUserPatientFormData={(e) => {
              setHasChanges(true);

              setAuthMethodFamiliarLocalState(e.target.value);
            }}
            patientAuthMethodsListFormData={epsAuthMethodsListLocalState}
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

export default FamiliarUpdatePersonalDataForm;
