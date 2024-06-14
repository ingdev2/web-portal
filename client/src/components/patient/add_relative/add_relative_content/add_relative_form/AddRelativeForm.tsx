"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, CheckboxProps, Col } from "antd";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import { setIdUserPatient } from "@/redux/features/patient/patientSlice";
import {
  setErrorsUserFamiliar,
  setIdTypesUserFamiliar,
} from "@/redux/features/familiar/familiarSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useCreateFamiliarMutation } from "@/redux/apis/register/registerRelativesApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

import { checkboxValidator } from "@/helpers/checkbox_validator/checkbox_validator";
import AddRelativeDataForm from "./AddRelativeDataForm";

const AddRelativeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idTypesListFamiliarState = useAppSelector(
    (state) => state.familiar.idTypesFamiliar
  );
  const idTypeFamiliarState = useAppSelector(
    (state) => state.familiar.user_id_type
  );
  const userFamiliarErrorsState = useAppSelector(
    (state) => state.familiar.errors
  );

  const [familiarNameLocalState, setFamiliarNameLocalState] = useState("");
  const [familiarLastNameLocalState, setFamiliarLastNameLocalState] =
    useState("");
  const [familiarIdTypeLocalState, setFamiliarIdTypeLocalState] = useState(0);
  const [familiarIdTypeNameLocalState, setFamiliarIdTypeNameLocalState] =
    useState("");
  const [familiarIdNumberLocalState, setFamiliarIdNumberLocalState] =
    useState(0);
  const [familiarGenderLocalState, setFamiliarGenderLocalState] = useState(0);
  const [familiarGenderListLocalState, setFamiliarGenderListLocalState]: any[] =
    useState([]);
  const [familiarEmailLocalState, setFamiliarEmailLocalState] = useState("");
  const [familiarCellphoneLocalState, setFamiliarCellphoneLocalState] =
    useState(0);
  const [familiarWhatsappLocalState, setFamiliarWhatsappLocalState] =
    useState(0);
  const [
    familiarRelationshipListLocalState,
    setFamiliarRelationshipListLocalState,
  ]: any[] = useState([]);
  const [familiarRelationshipLocalState, setFamiliarRelationshipLocalState] =
    useState(0);
  const [
    familiarRelationshipNameLocalState,
    setFamiliarRelationshipNameLocalState,
  ] = useState("");
  const [familiarAuthMethodLocalState, setFamiliarAuthMethodLocalState] =
    useState(0);
  const [
    familiarAuthMethodsListLocalState,
    setFamiliarAuthMethodsListLocalState,
  ]: any[] = useState([]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewFamiliar, setIsSubmittingNewFamiliar] = useState(false);
  const [isSubmittingGoToListOfRelatives, setIsSubmittingGoToListOfRelatives] =
    useState(false);
  const [showErrorMessageUserFamiliar, setShowErrorMessageUserFamiliar] =
    useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const {
    data: relationshipTypesData,
    isLoading: relationshipTypesLoading,
    isFetching: relationshipTypesFetching,
    error: relationshipTypesError,
  } = useGetAllRelationshipTypesQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: gendersData,
    isLoading: gendersLoading,
    isFetching: gendersFetching,
    error: gendersError,
  } = useGetAllGendersQuery(null);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [
    addAuthFamiliarToPatient,
    {
      data: addAuthFamiliarToPatientData,
      isLoading: addAuthFamiliarToPatientLoading,
      isSuccess: addAuthFamiliarToPatientSuccess,
      isError: addAuthFamiliarToPatientError,
    },
  ] = useCreateFamiliarMutation({
    fixedCacheKey: "addAuthFamiliarToPatientData",
  });

  useEffect(() => {
    if (
      !userPatientLoading &&
      !userPatientFetching &&
      userPatientData &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
    }
    if (!idTypesLoading && !idTypesFetching && idTypesData) {
      dispatch(setIdTypesUserFamiliar(idTypesData));
    }
    if (idTypesError) {
      dispatch(
        setErrorsUserFamiliar(
          "¡No se pudo obtener los tipos de identificación!"
        )
      );
      setShowErrorMessageUserFamiliar(true);
      dispatch(setIdTypesUserFamiliar(idTypesData));
    }
    if (!gendersLoading && !gendersFetching && gendersData) {
      setFamiliarGenderListLocalState(gendersData);
    }
    if (gendersError) {
      dispatch(
        setErrorsUserFamiliar("¡No se pudo obtener los tipos de géneros!")
      );
      setShowErrorMessageUserFamiliar(true);
      setFamiliarGenderListLocalState(gendersData);
    }
    if (
      !relationshipTypesLoading &&
      !relationshipTypesFetching &&
      relationshipTypesData
    ) {
      setFamiliarRelationshipListLocalState(relationshipTypesData);
    }
    if (relationshipTypesError) {
      dispatch(
        setErrorsUserFamiliar("¡No se pudo obtener los tipos de parentesco!")
      );
      setShowErrorMessageUserFamiliar(true);
      setFamiliarRelationshipListLocalState(relationshipTypesData);
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setFamiliarAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserFamiliar(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessageUserFamiliar(true);
      setFamiliarAuthMethodsListLocalState(authMethodData);
    }
    if (familiarNameLocalState || familiarLastNameLocalState) {
    }
  }, [
    idUserPatientState,
    userPatientData,
    idTypesData,
    idTypesError,
    gendersData,
    gendersError,
    authMethodData,
    authMethodError,
    relationshipTypesData,
    relationshipTypesError,
  ]);

  const handleAddAuthFamiliar = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewFamiliar(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewFamiliar(true);

      const response: any = await addAuthFamiliarToPatient({
        patientId: idUserPatientState,
        newFamiliar: {
          name: familiarNameLocalState,
          last_name: familiarLastNameLocalState,
          user_id_type: familiarIdTypeLocalState,
          id_number: familiarIdNumberLocalState,
          user_gender: familiarGenderLocalState,
          email: familiarEmailLocalState,
          cellphone: familiarCellphoneLocalState || undefined,
          authentication_method: familiarAuthMethodLocalState,
          rel_with_patient: familiarRelationshipLocalState,
          whatsapp: familiarWhatsappLocalState || undefined,
        },
      });

      var addAuthFamiliarError = response.error;

      var addAuthFamiliarValidationData = response.data?.message;

      var addAuthFamiliarSuccess = response.data;

      if (addAuthFamiliarError || addAuthFamiliarValidationData) {
        const errorMessage = addAuthFamiliarError?.data.message;
        const validationDataMessage = addAuthFamiliarValidationData;

        if (
          Array.isArray(errorMessage) ||
          Array.isArray(validationDataMessage)
        ) {
          dispatch(setErrorsUserFamiliar(errorMessage[0]));
          dispatch(setErrorsUserFamiliar(validationDataMessage[0]));
          setShowErrorMessageUserFamiliar(true);
        }
        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsUserFamiliar(errorMessage));
          dispatch(setErrorsUserFamiliar(validationDataMessage));
          setShowErrorMessageUserFamiliar(true);
        }
      }

      if (
        addAuthFamiliarSuccess &&
        !addAuthFamiliarError &&
        !addAuthFamiliarValidationData
      ) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewFamiliar(false);
    }
  };

  const handleOnChangeSelectRelationship = (value: number) => {
    setFamiliarRelationshipLocalState(value);

    const selectedType: any = familiarRelationshipListLocalState?.find(
      (type: any) => type.id === value
    );
    setFamiliarRelationshipNameLocalState(selectedType?.name);
  };

  const handleOnChangeSelectIdType = (value: number) => {
    setFamiliarIdTypeLocalState(value);

    const selectedType: any = idTypesListFamiliarState?.find(
      (type: any) => type.id === value
    );
    setFamiliarIdTypeNameLocalState(selectedType?.name);
  };

  const handleGoToListOfRelatives = async () => {
    try {
      setIsSubmittingGoToListOfRelatives(true);

      await router.replace("/patient/homepage/family_nucleus", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToListOfRelatives(false);
      setModalIsOpenSuccess(false);
    }
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserFamiliar([]));
    setShowErrorMessageUserFamiliar(false);
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
        paddingInline: "31px",
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
            router.push("/patient/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      <Card
        key={"card-add-auth-familiar-form"}
        style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {modalIsOpenConfirm && (
          <CustomModalTwoOptions
            key={"custom-confirm-modal-add-auth-familiar"}
            openCustomModalState={modalIsOpenConfirm}
            iconCustomModal={<FcInfo size={77} />}
            titleCustomModal="¿Deseas agregar un familiar autorizado?"
            subtitleCustomModal={
              <p>
                Se agregará el familiar <b>{familiarNameLocalState},</b> con
                tipo de identificación&nbsp;
                <b>{familiarIdTypeNameLocalState},</b>&nbsp;número de
                identificación&nbsp;
                <b>{familiarIdNumberLocalState},</b>&nbsp;con tipo de
                parentesco:&nbsp;<b>{familiarRelationshipNameLocalState}</b>
              </p>
            }
            handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
            handleConfirmCustomModal={handleConfirmDataModal}
            isSubmittingConfirm={isSubmittingNewFamiliar}
            handleClickCustomModal={handleButtonClick}
          ></CustomModalTwoOptions>
        )}

        {modalIsOpenSuccess && (
          <CustomModalNoContent
            key={"custom-success-modal-add-auth-familiar"}
            widthCustomModalNoContent={"54%"}
            openCustomModalState={modalIsOpenSuccess}
            closableCustomModal={false}
            maskClosableCustomModal={false}
            contentCustomModal={
              <CustomResultOneButton
                key={"auth-familiar-created-custom-result"}
                statusTypeResult={"success"}
                titleCustomResult="¡Familiar Autorizado Agregado Correctamente!"
                subtitleCustomResult="El familiar ha sido agregado a su lista de parientes autorizados para ver y solicitar documentos médicos de usted."
                handleClickCustomResult={handleGoToListOfRelatives}
                isSubmittingButton={isSubmittingGoToListOfRelatives}
                textButtonCustomResult="Ver lista de familiares"
              />
            }
          ></CustomModalNoContent>
        )}

        {showErrorMessageUserFamiliar && (
          <CustomMessage
            typeMessage="error"
            message={
              userFamiliarErrorsState?.toString() || "¡Error en la petición!"
            }
          />
        )}

        <AddRelativeDataForm
          handleAddAuthFamiliarDataForm={handleAddAuthFamiliar}
          relationshipSelectorLoadingDataForm={
            idTypesLoading && idTypesFetching && !idTypesData
          }
          familiarRelationshipValueDataForm={familiarRelationshipLocalState}
          handleOnChangeSelectRelationshipDataForm={
            handleOnChangeSelectRelationship
          }
          familiarRelationshipListDataForm={familiarRelationshipListLocalState}
          familiarNameDataForm={familiarNameLocalState}
          handleOnChangeFamiliarNameDataForm={(e) => {
            setFamiliarNameLocalState(e.target.value.toUpperCase());
          }}
          familiarLastNameDataForm={familiarLastNameLocalState}
          handleOnChangeFamiliarLastNameDataForm={(e) => {
            setFamiliarLastNameLocalState(e.target.value.toUpperCase());
          }}
          idTypeSelectorLoadingDataForm={
            idTypesLoading && idTypesFetching && !idTypesData
          }
          familiarIdTypeValueDataForm={familiarIdTypeLocalState}
          handleOnChangeSelectIdTypeDataForm={handleOnChangeSelectIdType}
          familiarIdTypeListDataForm={idTypesListFamiliarState}
          familiarIdNumberDataForm={familiarIdNumberLocalState}
          handleOnChangeFamiliarIdNumberDataForm={(e) => {
            setFamiliarIdNumberLocalState(parseInt(e.target.value, 10));
          }}
          genderSelectorLoadingDataForm={
            gendersLoading && gendersFetching && !gendersData
          }
          familiarGenderValueDataForm={familiarGenderLocalState}
          handleOnChangeSelectGenderDataForm={(e) => {
            setFamiliarGenderLocalState(e);
          }}
          familiarGenderListDataForm={familiarGenderListLocalState}
          familiarEmailDataForm={familiarEmailLocalState}
          handleOnChangeFamiliarEmailDataForm={(e) => {
            setFamiliarEmailLocalState(e.target.value.toLowerCase());
          }}
          familiarCellphoneDataForm={familiarCellphoneLocalState}
          handleOnChangeFamiliarCellphoneDataForm={(e) =>
            setFamiliarCellphoneLocalState(parseInt(e.target.value, 10))
          }
          familiarAuthMethodValueDataForm={familiarAuthMethodLocalState}
          handleOnChangeSelectAuthMethodDataForm={(e) =>
            setFamiliarAuthMethodLocalState(e.target.value)
          }
          familiarAuthMethodListDataForm={familiarAuthMethodsListLocalState}
          familiarWhatsappDataForm={familiarWhatsappLocalState}
          handleOnChangeFamiliarWhatsappDataForm={(e) =>
            setFamiliarWhatsappLocalState(parseInt(e.target.value, 10))
          }
          checkboxValidatorDataForm={checkboxValidator}
          isCheckboxCheckedDataForm={isCheckboxChecked}
          handleCheckboxChangeDataForm={handleCheckboxChange}
          buttonSubmitFormLoadingDataForm={
            isSubmittingConfirmModal && !modalIsOpenConfirm
          }
          handleButtonSubmitFormDataForm={handleButtonClick}
        />
      </Card>
    </Col>
  );
};

export default AddRelativeForm;
