"use client";

import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";

import { Button, Form, Input, Radio, Select, Space, Typography } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { titleStyleCss } from "@/theme/text_styles";

import {
  validateRequiredDate,
  validateRequiredFiles,
} from "@/helpers/validate_required_values/validate_required_files";
import CustomDoubleDatePicker from "@/components/common/custom_double_date_picker/CustomDoubleDatePicker";

const EpsCreateRequestFormData: React.FC<{
  patientNameDataForm: string;
  patientIdTypeDataForm: string;
  iconButtonValidatorOtherPatientDataForm: ReactNode;
  onClickButtonValidatorOtherPatientDataForm: () => void;
  patientIdNumberDataForm: number;
  handleCreateRequestDataForm: () => void;
  reqTypeSelectorLoadingDataForm: boolean;
  familiarReqTypeValueDataForm: number;
  handleOnChangeSelectReqTypeDataForm: (value: number) => void;
  familiarReqTypeListDataForm: string[];
  userMessageMedicalReqDataForm: string;
  handleOnChangeUserMessageMedicalReqDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  tooltipUploadCopyRightPetitionDataform: string;
  haveRightPetitionPatientDataForm: boolean;
  onChangeHaveRightPetitionFamiliarDataForm: (value: any) => void;
  copyRightPetitionSetterDataform: React.SetStateAction<any>;
  copyRightPetitionRemoverDataform: React.SetStateAction<any>;
  tooltipUploadReferenceDocumentsDataform: string;
  haveReferenceDocumentDataForm: boolean;
  onChangeHaveReferenceDocumentFamiliarDataForm: (value: any) => void;
  tooltipRegistrationDatesDataform: string;
  onChangeDateCustomDoubleDatePicker:
    | ((dates: any, dateStrings: [string, string]) => void)
    | undefined;
  fileStatusSetterDataform: React.SetStateAction<any>;
  fileStatusRemoverDataform: React.SetStateAction<any>;
  tooltipObservationsDataform: string;
}> = ({
  patientNameDataForm,
  patientIdTypeDataForm,
  patientIdNumberDataForm,
  iconButtonValidatorOtherPatientDataForm,
  onClickButtonValidatorOtherPatientDataForm,
  handleCreateRequestDataForm,
  reqTypeSelectorLoadingDataForm,
  familiarReqTypeValueDataForm,
  handleOnChangeSelectReqTypeDataForm,
  familiarReqTypeListDataForm,
  userMessageMedicalReqDataForm,
  handleOnChangeUserMessageMedicalReqDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  tooltipUploadCopyRightPetitionDataform,
  haveRightPetitionPatientDataForm,
  onChangeHaveRightPetitionFamiliarDataForm,
  copyRightPetitionSetterDataform,
  copyRightPetitionRemoverDataform,
  tooltipUploadReferenceDocumentsDataform,
  haveReferenceDocumentDataForm,
  onChangeHaveReferenceDocumentFamiliarDataForm,
  tooltipRegistrationDatesDataform,
  onChangeDateCustomDoubleDatePicker,
  fileStatusSetterDataform,
  fileStatusRemoverDataform,
  tooltipObservationsDataform,
}) => {
  const rightPetitionFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_right_petition
  );

  const referenceDocumentFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_user_message_documents
  );

  const registrationDatesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.registration_dates
  );

  return (
    <Form
      id="create-medical-req-form-eps"
      name="create-medical-req-form-eps"
      className="create-medical-req-form-eps"
      onFinish={handleCreateRequestDataForm}
      initialValues={{
        "radio-select-have-right-petition-eps":
          haveRightPetitionPatientDataForm,
        "radio-select-have-doc-user-message-eps": haveReferenceDocumentDataForm,
        remember: false,
      }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-create-medical-req-form-eps"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "13px",
        }}
      >
        Crear nueva solicitud de requerimiento médico
      </h2>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Nombre de paciente:
        </Typography.Title>
        <Input
          id="name-patient-auto-input-eps"
          value={patientNameDataForm}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Tipo de documento:
        </Typography.Title>
        <Input
          id="id-type-patient-auto-input-eps"
          value={patientIdTypeDataForm}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Número de documento:
        </Typography.Title>
        <Input
          id="patient-id-number-hosvital-eps"
          value={patientIdNumberDataForm}
          disabled
        />
      </div>

      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          paddingBlock: "13px",
        }}
      >
        <Button
          style={{
            paddingInline: 13,
            color: "#015E90",
            borderColor: "#015E90",
            fontWeight: "bold",
            borderRadius: 7,
            borderWidth: 2,
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="text"
          size="middle"
          className="back-to-validate-patient"
          icon={iconButtonValidatorOtherPatientDataForm}
          onClick={onClickButtonValidatorOtherPatientDataForm}
        >
          Cambiar paciente
        </Button>
      </div>

      <Form.Item
        name="medical-req-types-eps"
        label="Tipo de requerimiento médico"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el tipo de requerimiento a solicitar!",
          },
        ]}
      >
        {reqTypeSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={familiarReqTypeValueDataForm}
            placeholder="Tipo de requerimiento"
            onChange={handleOnChangeSelectReqTypeDataForm}
          >
            {familiarReqTypeListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        id="radio-select-have-right-petition-eps"
        name="radio-select-have-right-petition-eps"
        className="radio-select-have-right-petition-eps"
        label="¿Desea adjuntar un derecho de petición a la solicitud?"
        tooltip={tooltipUploadCopyRightPetitionDataform}
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona si tiene derecho de petición!",
          },
        ]}
      >
        <Radio.Group
          value={haveRightPetitionPatientDataForm}
          onChange={onChangeHaveRightPetitionFamiliarDataForm}
          style={{ textAlign: "start" }}
        >
          <Space size={"small"} direction="horizontal">
            <Radio value={true}>SÍ</Radio>

            <Radio value={false}>NO</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {haveRightPetitionPatientDataForm && (
        <Form.Item
          id="upload-right-petition-to-request-eps"
          name="upload-right-petition-to-request-eps"
          className="upload-right-petition-to-request-eps"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              validator: validateRequiredFiles(
                rightPetitionFilesMedicalReqState,
                "¡Por favor adjuntar derecho de petición!"
              ),
            },
          ]}
        >
          <CustomUpload
            titleCustomUpload="Cargar Documento(s)"
            fileStatusSetterCustomUpload={copyRightPetitionSetterDataform}
            removeFileStatusSetterCustomUpload={
              copyRightPetitionRemoverDataform
            }
            maximumNumberOfFiles={Number(
              process.env.NEXT_PUBLIC_MAXIMUM_NUMBER_OF_FILES_USERS
            )}
            maximumSizeFilesInMegaBytes={Number(
              process.env.NEXT_PUBLIC_MAXIMUM_FILE_SIZE_IN_MEGABYTES_USERS
            )}
          />
        </Form.Item>
      )}

      <Form.Item
        id="radio-select-have-doc-user-message-eps"
        name="radio-select-have-doc-user-message-eps"
        className="radio-select-have-doc-user-message-eps"
        label="¿Desea adjuntar un documento complementario de referencia a la solicitud?"
        tooltip={tooltipUploadReferenceDocumentsDataform}
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona si tiene derecho de petición!",
          },
        ]}
      >
        <Radio.Group
          value={haveReferenceDocumentDataForm}
          onChange={onChangeHaveReferenceDocumentFamiliarDataForm}
          style={{ textAlign: "start" }}
        >
          <Space size={"small"} direction="horizontal">
            <Radio value={true}>SÍ</Radio>

            <Radio value={false}>NO</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {haveReferenceDocumentDataForm && (
        <Form.Item
          name="upload-files-reference-documents-eps"
          label="Documento(s) de referencia (opcional)"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              validator: validateRequiredFiles(
                referenceDocumentFilesMedicalReqState,
                "¡Por favor adjuntar documento de referencia!"
              ),
            },
          ]}
        >
          <CustomUpload
            titleCustomUpload="Cargar Documento(s)"
            fileStatusSetterCustomUpload={fileStatusSetterDataform}
            removeFileStatusSetterCustomUpload={fileStatusRemoverDataform}
            maximumNumberOfFiles={Number(
              process.env.NEXT_PUBLIC_MAXIMUM_NUMBER_OF_FILES_USERS
            )}
            maximumSizeFilesInMegaBytes={Number(
              process.env.NEXT_PUBLIC_MAXIMUM_FILE_SIZE_IN_MEGABYTES_USERS
            )}
          />
        </Form.Item>
      )}

      <Form.Item
        name="range-date-picker-create-medical-req-patient"
        label="Rango de fechas de registros a solicitar"
        tooltip={tooltipRegistrationDatesDataform}
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            validator: validateRequiredDate(
              registrationDatesMedicalReqState,
              "¡Por favor seleccionar un rango de fecha!"
            ),
          },
        ]}
      >
        <CustomDoubleDatePicker
          onChangeDateCustomDoubleDatePicker={
            onChangeDateCustomDoubleDatePicker
          }
        />
      </Form.Item>

      <Form.Item
        name="especifications-eps"
        label="Observaciones y/o detalles"
        tooltip={tooltipObservationsDataform}
        style={{ marginBottom: "31px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor, especifique detalles a tener en cuenta de su solicitud!",
          },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 2, maxRows: 10 }}
          maxLength={301}
          value={userMessageMedicalReqDataForm}
          placeholder="Especifique detalles a tener en cuenta de su solicitud. Ej. Fecha aprox. de procedimiento"
          onChange={handleOnChangeUserMessageMedicalReqDataForm}
        />
      </Form.Item>

      <Form.Item style={{ textAlign: "center", marginBottom: "7px" }}>
        {buttonSubmitFormLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Button
            size="large"
            style={{
              paddingInline: 62,
              borderRadius: 31,
              backgroundColor: "#015E90",
              color: "#f2f2f2",
            }}
            htmlType="submit"
            className="create-medical-req-form-button-eps"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear solicitud
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EpsCreateRequestFormData;
