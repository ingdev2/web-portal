"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import FamiliarCreateRequestFormData from "./FamiliarCreateRequestFormData";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import {
  setTypesMedicalReq,
  setReqTypeMedicalReq,
  setPatientClassStatusMedicalReq,
  setPatientClassStatusAbbrevMedicalReq,
  setUserMessageMedicalReq,
  setFileCopyApplicantIdentificationDocumentMedicalReq,
  removeFileCopyApplicantIdentificationDocumentMedicalReq,
  setFileCopyPatientCitizenshipCardMedicalReq,
  removeFileCopyPatientCitizenshipCardMedicalReq,
  setDefaultValuesMedicalReq,
  setErrorsMedicalReq,
  setRightPetitionMedicalReq,
  setFileCopyRightPetitionMedicalReq,
  removeFileCopyRightPetitionMedicalReq,
  setFileCopyPatientCivilRegistrationMedicalReq,
  removeFileCopyPatientCivilRegistrationMedicalReq,
  setFileCopyMarriageCertificateMedicalReq,
  removeFileCopyMarriageCertificateMedicalReq,
  setFileCopyCohabitationCertificateMedicalReq,
  removeFileCopyCohabitationCertificateMedicalReq,
  setFileCopyParentsCitizenshipCardMedicalReq,
  removeFileCopyParentsCitizenshipCardMedicalReq,
  setFileUserMessageMedicalReq,
  removeFileUserMessageMessageMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";
import {
  setDefaultValuesUserFamiliar,
  setPatientIdTypeAbbrevFamiliar,
} from "@/redux/features/familiar/familiarSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";
import {
  setNameUserPatient,
  setIdTypeUserPatient,
  setIdNumberUserPatient,
  setBirthdateUserPatient,
  setDefaultValuesUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useCreateMedicalReqFamiliarMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllPatientClassStatusQuery } from "@/redux/apis/patient_class_status/patientClassStatusApi";
import { useGetIdTypeByIdQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";
import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

import { processAndUploadFiles } from "@/helpers/process_and_upload_files/process_and_upload_files";
import { calculatePatientAge } from "@/helpers/calculate_patient_age/calculate_patient_age";
import { handleDeceasedPatient } from "@/helpers/handle_deceased_patient/handle_deceased_patient";

const FamiliarCreateRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uploadFiles } = processAndUploadFiles();

  const idUserFamiliarState = useAppSelector((state) => state.familiar.id);
  const idNumberUserFamiliarState = useAppSelector(
    (state) => state.familiarLogin.id_number_familiar
  );

  const namePatientOfFamiliarState = useAppSelector(
    (state) => state.patient.name
  );
  const idTypePatientOfFamiliarState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idNumberPatientOfFamiliarState = useAppSelector(
    (state) => state.patient.id_number
  );
  const birthdatePatientOfFamiliarState = useAppSelector(
    (state) => state.patient.birthdate
  );

  const relWithPatientNumberFamiliarState = useAppSelector(
    (state) => state.familiar.rel_with_patient
  );
  const relWithPatientAbbrevFamiliarState = useAppSelector(
    (state) => state.familiar.rel_with_patient_abbrev
  );
  const idTypeAbbrevPatientOfFamiliarState = useAppSelector(
    (state) => state.familiar.patient_id_type_abbrev
  );
  const idNumberPatientOfFamiliarFState = useAppSelector(
    (state) => state.familiar.patient_id_number
  );

  const patientCategoryNumberState = useAppSelector(
    (state) => state.medicalReq.patient_class_status
  );
  const patientCategoryNameState = useAppSelector(
    (state) => state.medicalReq.patient_class_status_abbrev
  );
  const typesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.typesMedicalReq
  );
  const reqTypeState = useAppSelector(
    (state) => state.medicalReq.requirement_type
  );
  const haveRightPetitionState = useAppSelector(
    (state) => state.medicalReq.right_petition
  );
  const rightPetitionFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_right_petition
  );
  const userMessageMedicalReqState = useAppSelector(
    (state) => state.medicalReq.user_message
  );
  const userMessageFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_user_message_documents
  );
  const copyApplicantIdentificationFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_applicant_identification_document
  );
  const copyPatientCitizenshipCardFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_patient_citizenship_card
  );
  const copyPatientCivilRegistrationFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_patient_civil_registration
  );
  const copyParentsCitizenshipFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_parents_citizenship_card
  );
  const copyMarriageCertificateFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_marriage_certificate
  );
  const copyCohabitationCertificateFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_cohabitation_certificate
  );
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [reqTypeNameLocalState, setReqTypeNameLocalState] = useState("");
  const [thePatienHasDiedLocalState, setThePatienHasDiedLocalState] =
    useState(false);
  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewMedicalReq, setIsSubmittingNewMedicalReq] =
    useState(false);
  const [
    isSubmittingGoToListOfMedicalReq,
    setIsSubmittingGoToListOfMedicalReq,
  ] = useState(false);
  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const {
    data: reqTypesData,
    isLoading: reqTypesLoading,
    isFetching: reqTypesFetching,
    error: reqTypesError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: patientClassStatusData,
    isLoading: patientClassStatusLoading,
    isFetching: patientClassStatusFetching,
    error: patientClassStatusError,
  } = useGetAllPatientClassStatusQuery(null);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdQuery(idUserFamiliarState, {
    skip: !idUserFamiliarState,
  });

  const {
    data: userPatientOfFamiliarData,
    isLoading: userPatientOfFamiliarLoading,
    isFetching: userPatientOfFamiliarFetching,
    error: userPatientOfFamiliarError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientOfFamiliarFState);

  const {
    data: idTypeData,
    isLoading: idTypeLoading,
    isFetching: idTypeFetching,
    error: idTypeError,
  } = useGetIdTypeByIdQuery(idTypePatientOfFamiliarState);

  const [
    createMedicalReqFamiliar,
    {
      data: createMedicalReqFamiliarData,
      isLoading: createMedicalReqFamiliarLoading,
      isSuccess: createMedicalReqFamiliarSuccess,
      isError: createMedicalReqFamiliarError,
    },
  ] = useCreateMedicalReqFamiliarMutation({
    fixedCacheKey: "createMedicalReqFamiliarData",
  });

  useEffect(() => {
    if (
      userPatientOfFamiliarData &&
      !userPatientOfFamiliarLoading &&
      !userPatientOfFamiliarFetching &&
      !userPatientOfFamiliarError &&
      idNumberPatientOfFamiliarFState
    ) {
      dispatch(setNameUserPatient(userPatientOfFamiliarData.name));
      dispatch(setIdTypeUserPatient(userPatientOfFamiliarData.user_id_type));
      dispatch(setIdNumberUserPatient(userPatientOfFamiliarData.id_number));
      dispatch(setBirthdateUserPatient(userPatientOfFamiliarData.birthdate));
    }
    if (idTypeData && !idTypeLoading && !idTypeFetching && !idTypeError) {
      dispatch(setPatientIdTypeAbbrevFamiliar(idTypeData.name));
    }
    if (
      reqTypesData &&
      !reqTypesLoading &&
      !reqTypesFetching &&
      !reqTypesError
    ) {
      dispatch(setTypesMedicalReq(reqTypesData));
    }
    if (reqTypesError) {
      dispatch(
        setErrorsMedicalReq(
          "¡No se pudo obtener los tipos de requerimientos médicos!"
        )
      );
      setShowErrorMessageMedicalReq(true);
      dispatch(setTypesMedicalReq(reqTypesData));
    }
    if (
      birthdatePatientOfFamiliarState &&
      patientClassStatusData &&
      !thePatienHasDiedLocalState &&
      !patientClassStatusError
    ) {
      calculatePatientAge(
        birthdatePatientOfFamiliarState,
        patientClassStatusData,
        dispatch
      );
    }
    if (thePatienHasDiedLocalState && patientClassStatusData) {
      handleDeceasedPatient(patientClassStatusData, dispatch);
    }
  }, [
    userPatientOfFamiliarData,
    userPatientOfFamiliarError,
    idTypePatientOfFamiliarState,
    idTypeData,
    idTypeError,
    idTypeAbbrevPatientOfFamiliarState,
    reqTypesData,
    reqTypesError,
    birthdatePatientOfFamiliarState,
    patientClassStatusData,
    patientClassStatusError,
    thePatienHasDiedLocalState,
    haveRightPetitionState,
    idNumberPatientOfFamiliarFState,
  ]);

  const handleCreateRequest = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewMedicalReq(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewMedicalReq(true);

      const statesToUpload = [
        {
          state: rightPetitionFilesMedicalReqState,
          paramName: "copy_right_petition",
        },
        {
          state: copyApplicantIdentificationFilesMedicalReqState,
          paramName: "copy_applicant_identification_document",
        },
        {
          state: copyPatientCitizenshipCardFilesMedicalReqState,
          paramName: "copy_patient_citizenship_card",
        },
        {
          state: copyPatientCivilRegistrationFilesMedicalReqState,
          paramName: "copy_patient_civil_registration",
        },
        {
          state: copyParentsCitizenshipFilesMedicalReqState,
          paramName: "copy_parents_citizenship_card",
        },
        {
          state: copyMarriageCertificateFilesMedicalReqState,
          paramName: "copy_marriage_certificate",
        },
        {
          state: copyCohabitationCertificateFilesMedicalReqState,
          paramName: "copy_cohabitation_certificate",
        },
        {
          state: userMessageFilesMedicalReqState,
          paramName: "user_message_documents",
        },
      ];

      const responses: Record<string, string[]> = {};

      let errors: string[] = [];

      if (statesToUpload.some(({ state }) => state && state.length > 0)) {
        for (const { state, paramName } of statesToUpload) {
          if (state && state.length > 0) {
            const { success, error } = await uploadFiles(state);
            if (error) {
              errors.push(error);
            } else {
              responses[paramName] = success;
            }
          }
        }
      }

      if (errors.length > 0) {
        dispatch(setErrorsMedicalReq(errors[0]));
        setShowErrorMessageMedicalReq(true);

        return;
      }

      const response: any = await createMedicalReqFamiliar({
        familiarId: idUserFamiliarState,
        medicalReqFamiliar: {
          requirement_type: reqTypeState,
          patient_class_status: patientCategoryNumberState,
          relationship_with_patient: relWithPatientNumberFamiliarState,
          patient_id_type: idTypePatientOfFamiliarState,
          patient_id_number: idNumberPatientOfFamiliarState,
          right_petition: haveRightPetitionState,
          user_message: userMessageMedicalReqState,
          ...responses,
        },
      });

      if (response.error) {
        const errorMessage = response.error?.data?.message;

        dispatch(
          setErrorsMedicalReq(
            Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
          )
        );

        setShowErrorMessageMedicalReq(true);
      } else {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);

        dispatch(setDefaultValuesUserPatient());
        dispatch(setDefaultValuesMedicalReq());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewMedicalReq(false);
    }
  };

  const handleOnChangeSelectIdType = (value: number) => {
    dispatch(setReqTypeMedicalReq(value));

    const selectedType: any = typesMedicalReqState?.find(
      (type: any) => type.id === value
    );
    setReqTypeNameLocalState(selectedType?.name);
  };

  const handleGoToListOfMedicalReq = async () => {
    try {
      dispatch(setIsPageLoading(true));

      await router.replace("/familiar/homepage/request_list", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setModalIsOpenSuccess(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsMedicalReq([]));
    setShowErrorMessageMedicalReq(false);
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
            router.push("/familiar/homepage", {
              scroll: true,
            });
            dispatch(setDefaultValuesMedicalReq());
          }}
        >
          Ir a inicio
        </Button>
      </div>

      {modalIsOpenConfirm && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-create-medical-req-familiar"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear una nueva solicitud?"
          subtitleCustomModal={
            <p>
              Se realizará un nuevo requerimiento de tipo&nbsp;
              <b>{reqTypeNameLocalState},</b> del paciente&nbsp;
              <b>{namePatientOfFamiliarState}</b>
            </p>
          }
          handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingNewMedicalReq}
          handleClickCustomModal={handleButtonClick}
        ></CustomModalTwoOptions>
      )}

      {modalIsOpenSuccess && (
        <CustomModalNoContent
          key={"custom-success-modal-create-medical-req-familiar"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"medical-req-created-custom-result-familiar"}
              statusTypeResult={"success"}
              titleCustomResult="¡Solicitud Creada Correctamente!"
              subtitleCustomResult="Su requerimiento médico ha sido recibido en nuestro sistema, intentaremos darle respuesta a su solicitud lo más pronto posible."
              handleClickCustomResult={handleGoToListOfMedicalReq}
              isSubmittingButton={isSubmittingGoToListOfMedicalReq}
              textButtonCustomResult="Ver mis solicitudes hechas"
            />
          }
        ></CustomModalNoContent>
      )}

      <Card
        key={"card-create-medical-req-form-familiar"}
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
        {showErrorMessageMedicalReq && (
          <CustomMessage
            typeMessage="error"
            message={
              medicalReqErrorsState?.toString() || "¡Error en la petición!"
            }
          />
        )}

        {!userFamiliarData && !userPatientOfFamiliarData && !reqTypesData ? (
          <CustomSpin />
        ) : (
          <FamiliarCreateRequestFormData
            relWithPatientAbbrevFamiliarDataForm={
              relWithPatientAbbrevFamiliarState
            }
            patientNameDataForm={namePatientOfFamiliarState}
            patientIdTypeDataForm={idTypeAbbrevPatientOfFamiliarState}
            patientIdNumberDataForm={idNumberPatientOfFamiliarState}
            handleCreateRequestDataForm={handleCreateRequest}
            reqTypeSelectorLoadingDataForm={
              reqTypesLoading && reqTypesFetching && !reqTypesData
            }
            familiarReqTypeValueDataForm={reqTypeState}
            handleOnChangeSelectReqTypeDataForm={handleOnChangeSelectIdType}
            familiarReqTypeListDataForm={typesMedicalReqState}
            haveRightPetitionFamiliarDataForm={
              haveRightPetitionState ? true : false
            }
            onChangeHaveRightPetitionFamiliarDataForm={(e) => {
              const newValue = e.target.value === true;

              dispatch(setRightPetitionMedicalReq(newValue));
            }}
            copyRightPetitionSetterDataform={setFileCopyRightPetitionMedicalReq}
            copyRightPetitionRemoverDataform={
              removeFileCopyRightPetitionMedicalReq
            }
            thePatientHasDiedDataForm={
              thePatienHasDiedLocalState ? true : false
            }
            onChangeThePatientHasDiedDataForm={(e) => {
              const newValue = e.target.value === true;

              setThePatienHasDiedLocalState(newValue);
            }}
            patientCategoryDataForm={patientCategoryNameState}
            userMessageMedicalReqDataForm={userMessageMedicalReqState}
            copyAplicantIdentificationDocumentSetterDataform={
              setFileCopyApplicantIdentificationDocumentMedicalReq
            }
            copyAplicantIdentificationDocumentRemoverDataform={
              removeFileCopyApplicantIdentificationDocumentMedicalReq
            }
            copyPatientCitizenshipCardSetterDataform={
              setFileCopyPatientCitizenshipCardMedicalReq
            }
            copyPatientCitizenshipCardRemoverDataform={
              removeFileCopyPatientCitizenshipCardMedicalReq
            }
            copyPatientCivilRegistrySetterDataform={
              setFileCopyPatientCivilRegistrationMedicalReq
            }
            copyPatientCivilRegistryRemoverDataform={
              removeFileCopyPatientCivilRegistrationMedicalReq
            }
            copyMarriageCertificateSetterDataform={
              setFileCopyMarriageCertificateMedicalReq
            }
            copyMarriageCertificateRemoverDataform={
              removeFileCopyMarriageCertificateMedicalReq
            }
            copyCohabitationCertificateSetterDataform={
              setFileCopyCohabitationCertificateMedicalReq
            }
            copyCohabitationCertificateRemoverDataform={
              removeFileCopyCohabitationCertificateMedicalReq
            }
            copyParentCitizenshipCardSetterDataform={
              setFileCopyParentsCitizenshipCardMedicalReq
            }
            copyParentCitizenshipCardRemoverDataform={
              removeFileCopyParentsCitizenshipCardMedicalReq
            }
            copyReferenceDocumentsRequestSetterDataform={
              setFileUserMessageMedicalReq
            }
            copyReferenceDocumentsRequestRemoverDataform={
              removeFileUserMessageMessageMedicalReq
            }
            handleOnChangeUserMessageMedicalReqDataForm={(e) =>
              dispatch(setUserMessageMedicalReq(e.target.value))
            }
            buttonSubmitFormLoadingDataForm={
              isSubmittingConfirmModal && !modalIsOpenConfirm
            }
            handleButtonSubmitFormDataForm={handleButtonClick}
          />
        )}
      </Card>
    </Col>
  );
};

export default FamiliarCreateRequestForm;
