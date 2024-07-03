"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import EpsCreateRequestFormData from "./EpsCreateRequestFormData";
import ValidatePatientExistEps from "../validate_patient_exist/ValidatePatientExistForm";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import { MdPublishedWithChanges } from "react-icons/md";

import {
  setTypesMedicalReq,
  setReqTypeMedicalReq,
  setUserMessageMedicalReq,
  setFilesUserMessageMedicalReq,
  removeFileUserMessageMessageMedicalReq,
  setErrorsMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";
import {
  setDefaultValuesUserPatient,
  setNameUserPatient,
} from "@/redux/features/patient/patientSlice";
import { setIdUserEps } from "@/redux/features/eps/epsSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";
import { setComponentChange } from "@/redux/features/common/modal/modalSlice";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useCreateMedicalReqEpsMutation } from "@/redux/apis/medical_req/medicalReqApi";
import {
  useGetUserByIdNumberEpsQuery,
  useGetUserByIdNumberPatientQuery,
} from "@/redux/apis/users/usersApi";
import { useUploadFileMutation } from "@/redux/apis/upload_view_files/uploadViewFilesApi";

const EpsCreateRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const componentChangeState = useAppSelector(
    (state) => state.modal.componentChange
  );
  const idTypePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypeAbbrevPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );

  const nameUserEpsState = useAppSelector((state) => state.eps.name);
  const idNumberUserEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const idUserEpsState = useAppSelector((state) => state.eps.id);
  const typesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.typesMedicalReq
  );
  const reqTypeState = useAppSelector(
    (state) => state.medicalReq.requirement_type
  );
  const patientIdTypeMedicalReqState = useAppSelector(
    (state) => state.medicalReq.patient_id_type
  );
  const patientIdNumberMedicalReqState = useAppSelector(
    (state) => state.medicalReq.patient_id_number
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
    data: patientData,
    isLoading: patientDataLoading,
    isFetching: patientDataFetching,
    error: patientDataError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  const {
    data: reqTypesData,
    isLoading: reqTypesLoading,
    isFetching: reqTypesFetching,
    error: reqTypesError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: userEpsData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberUserEpsState);

  const [
    createMedicalReqEps,
    {
      data: createMedicalReqEpsData,
      isLoading: createMedicalReqEpsLoading,
      isSuccess: createMedicalReqEpsSuccess,
      isError: createMedicalReqEpsError,
    },
  ] = useCreateMedicalReqEpsMutation({
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
    console.log(namePatientState);

    if (!reqTypesLoading && !reqTypesFetching && reqTypesData) {
      dispatch(setTypesMedicalReq(reqTypesData));
    }
    if (!userEpsLoading && !userEpsFetching && userEpsData && !idUserEpsState) {
      dispatch(setIdUserEps(userEpsData.id));
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
    if (componentChangeState && !idTypePatientState && !idNumberPatientState) {
      dispatch(setComponentChange(false));
    }
    if (patientData && idNumberPatientState) {
      dispatch(setNameUserPatient(patientData?.name));
    }
  }, [
    reqTypesData,
    reqTypesLoading,
    reqTypesFetching,
    reqTypesError,
    userEpsData,
    userEpsLoading,
    userEpsFetching,
    idUserEpsState,
    userMessageFilesMedicalReqState,
    componentChangeState,
    idTypePatientState,
    idNumberPatientState,
    patientData,
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

      const response: any = await createMedicalReqEps({
        userId: idUserEpsState,
        medicalReqEps: {
          patient_id_type: patientIdTypeMedicalReqState,
          patient_id_number: patientIdNumberMedicalReqState,
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

        dispatch(setDefaultValuesUserPatient());
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

      await router.replace("/eps/homepage/request_list", {
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
            router.push("/eps/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      {idTypePatientState && idNumberPatientState && componentChangeState ? (
        <Card
          key={"card-create-medical-req-form-eps"}
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
              key={"custom-confirm-modal-create-medical-req-eps"}
              openCustomModalState={modalIsOpenConfirm}
              iconCustomModal={<FcInfo size={77} />}
              titleCustomModal="¿Deseas crear una nueva solicitud?"
              subtitleCustomModal={
                <p>
                  Se realizará un nuevo requerimiento de tipo&nbsp;
                  <b>{reqTypeNameLocalState},</b> del paciente&nbsp;
                  <b>{nameUserEpsState}</b>
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
              key={"custom-success-modal-create-medical-req-eps"}
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

          <EpsCreateRequestFormData
            patientNameDataForm={namePatientState}
            patientIdTypeDataForm={idTypeAbbrevPatientState}
            patientIdNumberDataForm={idNumberPatientState}
            handleCreateRequestDataForm={handleCreateRequest}
            iconButtonValidatorOtherPatientDataForm={
              <MdPublishedWithChanges size={17} />
            }
            onClickButtonValidatorOtherPatientDataForm={() => {
              dispatch(setComponentChange(false));
              dispatch(setDefaultValuesUserPatient());
            }}
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
      ) : (
        <ValidatePatientExistEps />
      )}
    </Col>
  );
};

export default EpsCreateRequestForm;
