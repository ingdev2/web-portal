"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import PatientCreateRequestFormData from "./PatientCreateRequestFormData";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import {
  setTypesMedicalReq,
  setReqTypeMedicalReq,
  setUserMessageMedicalReq,
  setFilesUserMessageMedicalReq,
  removeFileUserMessageMessageMedicalReq,
  setErrorsMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";
import { setIdUserPatient } from "@/redux/features/patient/patientSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useCreateMedicalReqPatientMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useUploadFileMutation } from "@/redux/apis/upload_view_files/uploadViewFilesApi";

const PatientCreateRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const nameUserPatientState = useAppSelector((state) => state.patient.name);
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idUserPatientState = useAppSelector((state) => state.patient.id);
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

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);
  const [reqTypeNameLocalState, setReqTypeNameLocalState] = useState("");

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
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const [
    createMedicalReqPatient,
    {
      data: createMedicalReqPatientData,
      isLoading: createMedicalReqPatientLoading,
      isSuccess: createMedicalReqPatientSuccess,
      isError: createMedicalReqPatientError,
    },
  ] = useCreateMedicalReqPatientMutation({
    fixedCacheKey: "createMedicalReqPatientData",
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
    if (!reqTypesLoading && !reqTypesFetching && reqTypesData) {
      dispatch(setTypesMedicalReq(reqTypesData));
    }
    if (
      !userPatientLoading &&
      !userPatientFetching &&
      userPatientData &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
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
  }, [
    reqTypesData,
    reqTypesLoading,
    reqTypesFetching,
    reqTypesError,
    userPatientData,
    userPatientLoading,
    userPatientFetching,
    idUserPatientState,
    userMessageFilesMedicalReqState,
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

      const responses: Record<string, string[]> = {};
      let errors: string[] = [];

      if (
        userMessageFilesMedicalReqState &&
        userMessageFilesMedicalReqState.length > 0
      ) {
        const statesToUpload = [
          {
            files: userMessageFilesMedicalReqState,
            paramName: "user_message_documents",
          },
        ];

        const processAndUploadFiles = async (
          files: Array<Express.Multer.File>
        ): Promise<{ success: string[]; error: string | null }> => {
          const formData = new FormData();

          files.forEach((file) => {
            formData.append(
              "files",
              new Blob([file.buffer], { type: file.mimetype }),
              file.originalname
            );
          });

          try {
            var s3Response: any = await uploadFileToS3(formData);

            if (s3Response.error) {
              const errorMessage = s3Response.error?.data?.message;

              return {
                success: [],
                error: Array.isArray(errorMessage)
                  ? errorMessage[0]
                  : errorMessage,
              };
            }
            return { success: s3Response.data || [], error: null };
          } catch (error: any) {
            return {
              success: [],
              error: error || "Error desconocido al subir archivos",
            };
          }
        };

        for (const { files, paramName } of statesToUpload) {
          if (files && files.length > 0) {
            const { success, error } = await processAndUploadFiles(files);
            if (error) {
              errors.push(error);
            } else {
              responses[paramName] = success;
            }
          }
        }

        if (errors.length > 0) {
          dispatch(setErrorsMedicalReq(errors[0]));
          setShowErrorMessageMedicalReq(true);

          return;
        }
      }

      const response: any = await createMedicalReqPatient({
        userId: idUserPatientState,
        medicalReqPatient: {
          requirement_type: reqTypeState,
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

        dispatch(setFilesUserMessageMedicalReq([]));
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

      await router.replace("/patient/homepage/request_list", {
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
          paddingInline: "13px",
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
        key={"card-create-medical-req-form-patient"}
        style={{
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          padding: "0px",
          marginInline: "13px",
        }}
      >
        {modalIsOpenConfirm && (
          <CustomModalTwoOptions
            key={"custom-confirm-modal-create-medical-req-patient"}
            openCustomModalState={modalIsOpenConfirm}
            iconCustomModal={<FcInfo size={77} />}
            titleCustomModal="¿Deseas crear una nueva solicitud?"
            subtitleCustomModal={
              <p>
                Se realizará un nuevo requerimiento de tipo&nbsp;
                <b>{reqTypeNameLocalState},</b> del paciente&nbsp;
                <b>{nameUserPatientState}</b>
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
            key={"custom-success-modal-create-medical-req-patient"}
            widthCustomModalNoContent={"54%"}
            openCustomModalState={modalIsOpenSuccess}
            closableCustomModal={false}
            maskClosableCustomModal={false}
            contentCustomModal={
              <CustomResultOneButton
                key={"medical-req-created-custom-result"}
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

        {showErrorMessageMedicalReq && (
          <CustomMessage
            typeMessage="error"
            message={
              medicalReqErrorsState?.toString() || "¡Error en la petición!"
            }
          />
        )}

        <PatientCreateRequestFormData
          handleCreateRequestDataForm={handleCreateRequest}
          reqTypeSelectorLoadingDataForm={
            reqTypesLoading && reqTypesFetching && !reqTypesData
          }
          familiarReqTypeValueDataForm={reqTypeState}
          handleOnChangeSelectReqTypeDataForm={handleOnChangeSelectIdType}
          familiarReqTypeListDataForm={typesMedicalReqState}
          userMessageMedicalReqDataForm={userMessageMedicalReqState}
          fileStatusSetterDataform={setFilesUserMessageMedicalReq}
          fileStatusRemoverDataform={removeFileUserMessageMessageMedicalReq}
          handleOnChangeUserMessageMedicalReqDataForm={(e) =>
            dispatch(setUserMessageMedicalReq(e.target.value))
          }
          buttonSubmitFormLoadingDataForm={
            isSubmittingConfirmModal && !modalIsOpenConfirm
          }
          handleButtonSubmitFormDataForm={handleButtonClick}
        />
      </Card>
    </Col>
  );
};

export default PatientCreateRequestForm;
