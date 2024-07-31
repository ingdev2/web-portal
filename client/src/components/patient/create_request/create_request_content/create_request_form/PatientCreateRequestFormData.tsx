"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import { Button, Form, Radio, Select, Space } from "antd";
import CustomDoubleDatePicker from "@/components/common/custom_double_date_picker/CustomDoubleDatePicker";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { titleStyleCss } from "@/theme/text_styles";

import {
  validateRequiredDate,
  validateRequiredFiles,
} from "@/helpers/validate_required_values/validate_required_files";

const PatientCreateRequestFormData: React.FC<{
  handleCreateRequestDataForm: () => void;
  reqTypeSelectorLoadingDataForm: boolean;
  familiarReqTypeValueDataForm: number;
  handleOnChangeSelectReqTypeDataForm: (value: number) => void;
  familiarReqTypeListDataForm: string[];
  tooltipUploadCopyRightPetitionDataform: string;
  haveRightPetitionPatientDataForm: boolean;
  onChangeHaveRightPetitionFamiliarDataForm: (value: any) => void;
  copyRightPetitionSetterDataform: React.SetStateAction<any>;
  copyRightPetitionRemoverDataform: React.SetStateAction<any>;
  userMessageMedicalReqDataForm: string;
  handleOnChangeUserMessageMedicalReqDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  haveReferenceDocumentDataForm: boolean;
  onChangeHaveReferenceDocumentFamiliarDataForm: (value: any) => void;
  tooltipUploadReferenceDocumentsDataform: string;
  tooltipRegistrationDatesDataform: string;
  onChangeDateCustomDoubleDatePicker:
    | ((dates: any, dateStrings: [string, string]) => void)
    | undefined;
  tooltipUploadCitizenshipCardPatientDataform: string;
  copyPatientCitizenshipCardSetterDataform: React.SetStateAction<any>;
  copyPatientCitizenshipCardRemoverDataform: React.SetStateAction<any>;
  fileStatusSetterDataform: React.SetStateAction<any>;
  fileStatusRemoverDataform: React.SetStateAction<any>;
  tooltipObservationsDataform: string;
}> = ({
  handleCreateRequestDataForm,
  reqTypeSelectorLoadingDataForm,
  familiarReqTypeValueDataForm,
  handleOnChangeSelectReqTypeDataForm,
  familiarReqTypeListDataForm,
  tooltipUploadCopyRightPetitionDataform,
  haveRightPetitionPatientDataForm,
  onChangeHaveRightPetitionFamiliarDataForm,
  copyRightPetitionSetterDataform,
  copyRightPetitionRemoverDataform,
  userMessageMedicalReqDataForm,
  handleOnChangeUserMessageMedicalReqDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  haveReferenceDocumentDataForm,
  onChangeHaveReferenceDocumentFamiliarDataForm,
  tooltipUploadReferenceDocumentsDataform,
  tooltipRegistrationDatesDataform,
  onChangeDateCustomDoubleDatePicker,
  tooltipUploadCitizenshipCardPatientDataform,
  copyPatientCitizenshipCardSetterDataform,
  copyPatientCitizenshipCardRemoverDataform,
  fileStatusSetterDataform,
  fileStatusRemoverDataform,
  tooltipObservationsDataform,
}) => {
  const rightPetitionFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_right_petition
  );

  const registrationDatesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.registration_dates
  );

  const copyPatientCitizenshipCardFilesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.files_copy_patient_citizenship_card
  );

  return (
    <Form
      id="create-medical-req-form-patient"
      name="create-medical-req-form-patient"
      className="create-medical-req-form-patient"
      onFinish={handleCreateRequestDataForm}
      initialValues={{
        "radio-select-have-right-petition-patient":
          haveRightPetitionPatientDataForm,
        "radio-select-have-doc-user-message-patient":
          haveReferenceDocumentDataForm,
        remember: false,
      }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-create-medical-req-form-patient"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear nueva solicitud de requerimiento médico
      </h2>

      <Form.Item
        name="medical-req-types-patient"
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
        id="radio-select-have-right-petition-patient"
        name="radio-select-have-right-petition-patient"
        className="radio-select-have-right-petition-patient"
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
          id="upload-right-petition-to-request-patient"
          name="upload-right-petition-to-request-patient"
          className="upload-right-petition-to-request-patient"
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
          />
        </Form.Item>
      )}

      <Form.Item
        id="radio-select-have-doc-user-message-patient"
        name="radio-select-have-doc-user-message-patient"
        className="radio-select-have-doc-user-message-patient"
        label="¿Desea adjuntar un documento complementario de referencia a la solicitud?"
        tooltip={tooltipUploadReferenceDocumentsDataform}
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona si tiene documento de referencia que anexar!",
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
          id="upload-files-reference-documents-patient"
          name="upload-files-reference-documents-patient"
          className="upload-files-reference-documents-patient"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: false,
              message: "¡Por favor adjuntar documento de referencia!",
            },
          ]}
        >
          <CustomUpload
            titleCustomUpload="Cargar Documento(s)"
            fileStatusSetterCustomUpload={fileStatusSetterDataform}
            removeFileStatusSetterCustomUpload={fileStatusRemoverDataform}
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
        id="upload-patient-citizenship-card-patient"
        name="upload-patient-citizenship-card-patient"
        className="upload-patient-citizenship-card-patient"
        label="Adjuntar su documento de identidad"
        tooltip={tooltipUploadCitizenshipCardPatientDataform}
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            validator: validateRequiredFiles(
              copyPatientCitizenshipCardFilesMedicalReqState,
              "¡Por favor adjuntar su documento de identidad!"
            ),
          },
        ]}
      >
        <CustomUpload
          titleCustomUpload="Cargar Documento(s)"
          fileStatusSetterCustomUpload={
            copyPatientCitizenshipCardSetterDataform
          }
          removeFileStatusSetterCustomUpload={
            copyPatientCitizenshipCardRemoverDataform
          }
        />
      </Form.Item>

      <Form.Item
        name="especifications-patient"
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
          placeholder="Especifique detalles adicionales a tener en cuenta en su solicitud."
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
            className="create-medical-req-form-button-patient"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear solicitud
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default PatientCreateRequestFormData;
