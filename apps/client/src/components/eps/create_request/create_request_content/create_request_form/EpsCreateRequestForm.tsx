"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import EpsCreateRequestFormData from "./EpsCreateRequestFormData";
import ValidatePatientExistEps from "../validate_patient_exist/ValidatePatientExistForm";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { MdPublishedWithChanges } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import type { Dayjs } from "dayjs";

import {
  setTypesMedicalReq,
  setReqTypeMedicalReq,
  setUserMessageMedicalReq,
  setFileUserMessageMedicalReq,
  removeFileUserMessageMessageMedicalReq,
  setHaveUserMessageMedicalReq,
  setRegistrationDatesMedicalReq,
  setFileCopyRightPetitionMedicalReq,
  setErrorsMedicalReq,
  setRightPetitionMedicalReq,
  removeFileCopyRightPetitionMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";
import { setDefaultValuesUserPatient } from "@/redux/features/patient/patientSlice";
import { setIdUserEps } from "@/redux/features/eps/epsSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";
import { setComponentChange } from "@/redux/features/common/modal/modalSlice";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useCreateMedicalReqEpsMutation } from "@/redux/apis/medical_req/medicalReqApi";
import {
  useGetUserByIdNumberEpsQuery,
  useGetUserByIdNumberPatientQuery,
} from "@/redux/apis/users/usersApi";

import { useProcessAndUploadFiles } from "@/helpers/process_and_upload_files/process_and_upload_files";

const EpsCreateRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uploadFiles } = useProcessAndUploadFiles();

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
  const haveRightPetitionState = useAppSelector(
    (state) => state.medicalReq.right_petition
  );
  const epsFilesRightPetitionState = useAppSelector(
    (state) => state.medicalReq.files_copy_right_petition
  );
  const haveUserMessageDocumentsState = useAppSelector(
    (state) => state.medicalReq.have_user_message_documents
  );
  const registrationDatesState = useAppSelector(
    (state) => state.medicalReq.registration_dates
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
    fixedCacheKey: "createMedicalReqEpsData",
  });

  useEffect(() => {
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
    if (
      componentChangeState &&
      !idTypePatientState &&
      !idNumberPatientState &&
      !namePatientState
    ) {
      dispatch(setComponentChange(false));
    }
    if (
      haveRightPetitionState === false &&
      epsFilesRightPetitionState.length > 0
    ) {
      dispatch(setFileCopyRightPetitionMedicalReq([]));
    }
    if (
      haveUserMessageDocumentsState === false &&
      userMessageFilesMedicalReqState.length > 0
    ) {
      dispatch(setFileUserMessageMedicalReq([]));
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
    haveRightPetitionState,
    epsFilesRightPetitionState,
    haveUserMessageDocumentsState,
    userMessageFilesMedicalReqState,
    componentChangeState,
    idTypePatientState,
    idNumberPatientState,
    namePatientState,
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
          state: epsFilesRightPetitionState,
          paramName: "copy_right_petition",
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

      const response: any = await createMedicalReqEps({
        userId: idUserEpsState,
        medicalReqEps: {
          patient_id_type: idTypePatientState,
          patient_id_number: idNumberPatientState,
          requirement_type: reqTypeState,
          user_message: userMessageMedicalReqState,
          right_petition: haveRightPetitionState,
          registration_dates: registrationDatesState,
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

        dispatch(setRightPetitionMedicalReq(false));
        dispatch(setFileCopyRightPetitionMedicalReq([]));
        dispatch(setHaveUserMessageMedicalReq(false));
        dispatch(setFileUserMessageMedicalReq([]));
        dispatch(setRegistrationDatesMedicalReq(""));
        dispatch(setDefaultValuesUserPatient());
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

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates && dateStrings[1]) {
      const formattedDates: string = `DESDE-> ${dateStrings[0]} HASTA-> ${dateStrings[1]}`;

      dispatch(setRegistrationDatesMedicalReq(formattedDates.toString()));
    } else {
      dispatch(setRegistrationDatesMedicalReq(""));
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
            router.push("/eps/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

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
              <b>{namePatientState}</b>
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
              titleCustomResult="¡Solicitud creada correctamente!"
              subtitleCustomResult="Su requerimiento médico ha sido recibido en nuestro sistema, intentaremos darle respuesta a su solicitud lo más pronto posible."
              handleClickCustomResult={handleGoToListOfMedicalReq}
              isSubmittingButton={isSubmittingGoToListOfMedicalReq}
              textButtonCustomResult="Ver mis solicitudes"
            />
          }
        ></CustomModalNoContent>
      )}

      {idTypePatientState && idNumberPatientState && componentChangeState ? (
        <Card
          key={"card-create-medical-req-form-eps"}
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
            haveRightPetitionPatientDataForm={
              haveRightPetitionState ? true : false
            }
            onChangeHaveRightPetitionFamiliarDataForm={(e) => {
              const newValue = e.target.value === true;

              dispatch(setRightPetitionMedicalReq(newValue));
            }}
            tooltipUploadCopyRightPetitionDataform="Aquí puedes adjuntar una copia de derecho de petición a tu solicitud. Formatos permitidos: (.PDF .JPG .PNG .JPEG)"
            copyRightPetitionSetterDataform={setFileCopyRightPetitionMedicalReq}
            copyRightPetitionRemoverDataform={
              removeFileCopyRightPetitionMedicalReq
            }
            userMessageMedicalReqDataForm={userMessageMedicalReqState}
            haveReferenceDocumentDataForm={
              haveUserMessageDocumentsState ? true : false
            }
            onChangeHaveReferenceDocumentFamiliarDataForm={(e) => {
              const newValue = e.target.value === true;

              dispatch(setHaveUserMessageMedicalReq(newValue));
            }}
            onChangeDateCustomDoubleDatePicker={onRangeChange}
            tooltipRegistrationDatesDataform="Selecciona el rango de fecha en el que deseas ver tus registros del tipo de solicitud que requieres."
            tooltipUploadReferenceDocumentsDataform="Aquí puedes adjuntar documentos de referencia adicionales, para así ser más exactos y precisos al darte respuesta a su solicitud."
            fileStatusSetterDataform={setFileUserMessageMedicalReq}
            fileStatusRemoverDataform={removeFileUserMessageMessageMedicalReq}
            handleOnChangeUserMessageMedicalReqDataForm={(e) =>
              dispatch(setUserMessageMedicalReq(e.target.value))
            }
            buttonSubmitFormLoadingDataForm={
              isSubmittingConfirmModal && !modalIsOpenConfirm
            }
            handleButtonSubmitFormDataForm={handleButtonClick}
            tooltipObservationsDataform="Especifique detalles adicionales a tener en cuenta en su solicitud para así darte una respuesta asertiva."
          />
        </Card>
      ) : (
        <ValidatePatientExistEps />
      )}
    </Col>
  );
};

export default EpsCreateRequestForm;
