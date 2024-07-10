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
} from "@/redux/features/medical_req/medicalReqSlice";
import {
  setIdUserFamiliar,
  setPatientIdNumberFamiliar,
  setPatientIdTypeAbbrevFamiliar,
} from "@/redux/features/familiar/familiarSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";
import {
  setNameUserPatient,
  setIdTypeUserPatient,
  setBirthdateUserPatient,
  setDefaultValuesUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useCreateMedicalReqFamiliarMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllPatientClassStatusQuery } from "@/redux/apis/patient_class_status/patientClassStatusApi";
import { useGetIdTypeByIdQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetFamiliarByIdNumberQuery } from "@/redux/apis/relatives/relativesApi";
import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useUploadFileMutation } from "@/redux/apis/upload_view_files/uploadViewFilesApi";

import { PatientClassificationStatus } from "@/../../api/src/medical_req/enums/patient_classification_status.enum";

const FamiliarCreateRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
  const birthdatePatientOfFamiliarState = useAppSelector(
    (state) => state.patient.birthdate
  );

  const idTypeAbbrevPatientOfFamiliarState = useAppSelector(
    (state) => state.familiar.patient_id_type_abbrev
  );
  const idNumberPatientOfFamiliarState = useAppSelector(
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
  const userMessageMedicalReqState = useAppSelector(
    (state) => state.medicalReq.user_message
  );
  const userMessageFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_user_message_documents
  );
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );
  const medicalReqFiles = useAppSelector(
    (state) => state.medicalReq.files_user_message_documents
  );

  const [reqTypeNameLocalState, setReqTypeNameLocalState] = useState("");
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
  } = useGetFamiliarByIdNumberQuery(idNumberUserFamiliarState);

  const {
    data: userPatientOfFamiliarData,
    isLoading: userPatientOfFamiliarLoading,
    isFetching: userPatientOfFamiliarFetching,
    error: userPatientOfFamiliarError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientOfFamiliarState);

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

  const [
    uploadFileToS3,
    {
      data: uploadFileToS3Data,
      isLoading: uploadFileToS3Loading,
      isSuccess: uploadFileToS3Success,
      isError: uploadFileToS3Error,
    },
  ] = useUploadFileMutation({
    fixedCacheKey: "uploadFileToS3Data",
  });

  useEffect(() => {
    console.log(medicalReqFiles);

    if (
      !userFamiliarLoading &&
      !userFamiliarFetching &&
      userFamiliarData &&
      !idUserFamiliarState
    ) {
      dispatch(setIdUserFamiliar(userFamiliarData.id));
    }
    if (
      !userFamiliarLoading &&
      !userFamiliarFetching &&
      userFamiliarData &&
      !idNumberPatientOfFamiliarState
    ) {
      dispatch(setPatientIdNumberFamiliar(userFamiliarData.patient_id_number));
    }
    if (
      !userPatientOfFamiliarLoading &&
      !userPatientOfFamiliarFetching &&
      userPatientOfFamiliarData
    ) {
      dispatch(setNameUserPatient(userPatientOfFamiliarData.name));
      dispatch(setIdTypeUserPatient(userPatientOfFamiliarData.user_id_type));
      dispatch(setBirthdateUserPatient(userPatientOfFamiliarData.birthdate));
    }
    if (
      !idTypeLoading &&
      !idTypeFetching &&
      idTypeData &&
      !idTypeAbbrevPatientOfFamiliarState
    ) {
      dispatch(setPatientIdTypeAbbrevFamiliar(idTypeData.name));
    }
    if (!reqTypesLoading && !reqTypesFetching && reqTypesData) {
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
    if (birthdatePatientOfFamiliarState && patientClassStatusData) {
      const birthDate = new Date(birthdatePatientOfFamiliarState);

      const today = new Date();

      var age = today.getFullYear() - birthDate.getFullYear();

      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      let patientClassStatusId: number | null = null;
      let patientClassName: string | null = null;

      if (age < 18) {
        patientClassName = PatientClassificationStatus.YOUNGER;
      } else {
        patientClassName = PatientClassificationStatus.ADULT;
      }

      const matchedClass = patientClassStatusData.find(
        (patientClass: any) => patientClass.name === patientClassName
      );

      if (matchedClass) {
        patientClassStatusId = matchedClass.id;
      }

      if (patientClassStatusId) {
        dispatch(setPatientClassStatusMedicalReq(patientClassStatusId || 0));
        dispatch(setPatientClassStatusAbbrevMedicalReq(patientClassName || ""));
      }
    }
  }, [
    userFamiliarData,
    idUserFamiliarState,
    idNumberPatientOfFamiliarState,
    userPatientOfFamiliarData,
    idTypePatientOfFamiliarState,
    idTypeData,
    idTypeAbbrevPatientOfFamiliarState,
    reqTypesData,
    birthdatePatientOfFamiliarState,
    patientClassStatusData,
    medicalReqFiles,
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

      // const responses: Record<string, string[]> = {};
      // let errors: string[] = [];

      // if (
      //   userMessageFilesMedicalReqState &&
      //   userMessageFilesMedicalReqState.length > 0
      // ) {
      //   const statesToUpload = [
      //     {
      //       files: userMessageFilesMedicalReqState,
      //       paramName: "user_message_documents",
      //     },
      //   ];

      //   const processAndUploadFiles = async (
      //     files: Array<Express.Multer.File>
      //   ): Promise<{ success: string[]; error: string | null }> => {
      //     const formData = new FormData();

      //     files.forEach((file) => {
      //       formData.append(
      //         "files",
      //         new Blob([file.buffer], { type: file.mimetype }),
      //         file.originalname
      //       );
      //     });

      //     try {
      //       var s3Response: any = await uploadFileToS3(formData);

      //       if (s3Response.error) {
      //         const errorMessage = s3Response.error?.data?.message;

      //         return {
      //           success: [],
      //           error: Array.isArray(errorMessage)
      //             ? errorMessage[0]
      //             : errorMessage,
      //         };
      //       }
      //       return { success: s3Response.data || [], error: null };
      //     } catch (error: any) {
      //       return {
      //         success: [],
      //         error: error || "Error desconocido al subir archivos",
      //       };
      //     }
      //   };

      //   for (const { files, paramName } of statesToUpload) {
      //     if (files && files.length > 0) {
      //       const { success, error } = await processAndUploadFiles(files);
      //       if (error) {
      //         errors.push(error);
      //       } else {
      //         responses[paramName] = success;
      //       }
      //     }
      //   }

      //   if (errors.length > 0) {
      //     dispatch(setErrorsMedicalReq(errors[0]));
      //     setShowErrorMessageMedicalReq(true);

      //     return;
      //   }
      // }

      // const response: any = await createMedicalReqFamiliar({
      //   userId: idUserEpsState,
      //   medicalReqEps: {
      //     patient_id_type: idTypePatientOfFamiliarState,
      //     patient_id_number: idNumberPatientState,
      //     requirement_type: reqTypeState,
      //     user_message: userMessageMedicalReqState,
      //     ...responses,
      //   },
      // });

      // if (response.error) {
      //   const errorMessage = response.error?.data?.message;

      //   dispatch(
      //     setErrorsMedicalReq(
      //       Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
      //     )
      //   );

      //   setShowErrorMessageMedicalReq(true);
      // } else {
      //   setModalIsOpenConfirm(false);
      //   setModalIsOpenSuccess(true);

      //   dispatch(setDefaultValuesUserPatient());
      //   dispatch(setFilesUserMessageMedicalReq([]));
      // }
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
