"use client";

import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";

import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { titleStyleCss } from "@/theme/text_styles";

import { PatientClassificationStatus } from "@/../../api/src/medical_req/enums/patient_classification_status.enum";
import { RelationshipWithPatient } from "@/../../api/src/medical_req/enums/relationship_with_patient.enum";

const FamiliarCreateRequestFormData: React.FC<{
  relWithPatientAbbrevFamiliarDataForm: string;
  patientNameDataForm: string;
  patientIdTypeDataForm: string;
  patientIdNumberDataForm: number;
  handleCreateRequestDataForm: () => void;
  reqTypeSelectorLoadingDataForm: boolean;
  familiarReqTypeValueDataForm: number;
  handleOnChangeSelectReqTypeDataForm: (value: number) => void;
  familiarReqTypeListDataForm: string[];
  haveRightPetitionFamiliarDataForm: boolean;
  onChangeHaveRightPetitionFamiliarDataForm: (value: any) => void;
  copyRightPetitionSetterDataform: React.SetStateAction<any>;
  copyRightPetitionRemoverDataform: React.SetStateAction<any>;
  thePatientHasDiedDataForm: boolean;
  onChangeThePatientHasDiedDataForm: (value: any) => void;
  patientCategoryDataForm: string;
  userMessageMedicalReqDataForm: string;
  handleOnChangeUserMessageMedicalReqDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  copyAplicantIdentificationDocumentSetterDataform: React.SetStateAction<any>;
  copyAplicantIdentificationDocumentRemoverDataform: React.SetStateAction<any>;
  copyPatientCitizenshipCardSetterDataform: React.SetStateAction<any>;
  copyPatientCitizenshipCardRemoverDataform: React.SetStateAction<any>;
  copyPatientCivilRegistrySetterDataform: React.SetStateAction<any>;
  copyPatientCivilRegistryRemoverDataform: React.SetStateAction<any>;
}> = ({
  relWithPatientAbbrevFamiliarDataForm,
  patientNameDataForm,
  patientIdTypeDataForm,
  patientIdNumberDataForm,
  handleCreateRequestDataForm,
  reqTypeSelectorLoadingDataForm,
  familiarReqTypeValueDataForm,
  handleOnChangeSelectReqTypeDataForm,
  familiarReqTypeListDataForm,
  haveRightPetitionFamiliarDataForm,
  onChangeHaveRightPetitionFamiliarDataForm,
  copyRightPetitionSetterDataform,
  copyRightPetitionRemoverDataform,
  thePatientHasDiedDataForm,
  onChangeThePatientHasDiedDataForm,
  patientCategoryDataForm,
  userMessageMedicalReqDataForm,
  handleOnChangeUserMessageMedicalReqDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  copyAplicantIdentificationDocumentSetterDataform,
  copyAplicantIdentificationDocumentRemoverDataform,
  copyPatientCitizenshipCardSetterDataform,
  copyPatientCitizenshipCardRemoverDataform,
  copyPatientCivilRegistrySetterDataform,
  copyPatientCivilRegistryRemoverDataform,
}) => {
  const patientCategoryNameState = useAppSelector(
    (state) => state.medicalReq.patient_class_status_abbrev
  );

  return (
    <>
      <h2
        className="title-create-medical-req-form-familiar"
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
          id="name-patient-auto-input-familiar"
          value={patientNameDataForm}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Tipo de documento:
        </Typography.Title>
        <Input
          id="id-type-patient-auto-input-familiar"
          value={patientIdTypeDataForm}
          disabled
        />
      </div>

      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ paddingInlineEnd: "7px" }}
        >
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Número de documento:
            </Typography.Title>
            <Input
              id="patient-id-number-hosvital-familiar"
              value={patientIdNumberDataForm}
              disabled
            />
          </div>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ paddingInlineStart: "7px" }}
        >
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Categoria del paciente:
            </Typography.Title>
            <Input
              id="patient-category-familiar"
              value={patientCategoryDataForm}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Form
        id="create-medical-req-form-familiar"
        name="create-medical-req-form-familiar"
        className="create-medical-req-form-familiar"
        onFinish={handleCreateRequestDataForm}
        initialValues={{
          "radio-select-have-right-petition": haveRightPetitionFamiliarDataForm,
          "radio-select-the-patient-has-died": thePatientHasDiedDataForm,
          remember: false,
        }}
        autoComplete="false"
        layout="vertical"
      >
        <Form.Item
          id="medical-req-types-familiar"
          name="medical-req-types-familiar"
          className="medical-req-types-familiar"
          label="Tipo de requerimiento médico"
          style={{ marginBlock: "13px" }}
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
          id="radio-select-have-right-petition"
          name="radio-select-have-right-petition"
          className="radio-select-have-right-petition"
          label="¿Desea adjuntar un derecho de petición a la solicitud?"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              message: "¡Por favor selecciona si tiene derecho de petición!",
            },
          ]}
        >
          <Radio.Group
            value={haveRightPetitionFamiliarDataForm}
            onChange={onChangeHaveRightPetitionFamiliarDataForm}
            style={{ textAlign: "start" }}
          >
            <Space size={"small"} direction="horizontal">
              <Radio value={true}>SÍ</Radio>

              <Radio value={false}>NO</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {haveRightPetitionFamiliarDataForm && (
          <Form.Item
            id="upload-right-petition-to-request-familiar"
            name="upload-right-petition-to-request-familiar"
            className="upload-right-petition-to-request-familiar"
            label="Adjuntar derecho de petición"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor adjuntar derecho de petición!",
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
          id="radio-select-the-patient-has-died"
          name="radio-select-the-patient-has-died"
          className="radio-select-the-patient-has-died"
          label="¿El paciente ha fallecido?"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              message: "¡Por favor selecciona si el paciente ha fallecido!",
            },
          ]}
        >
          <Radio.Group
            value={thePatientHasDiedDataForm}
            onChange={onChangeThePatientHasDiedDataForm}
            style={{ textAlign: "start" }}
          >
            <Space size={"small"} direction="horizontal">
              <Radio value={true}>SÍ</Radio>

              <Radio value={false}>NO</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {thePatientHasDiedDataForm &&
          relWithPatientAbbrevFamiliarDataForm ===
            RelationshipWithPatient.PARENT && (
            <Form.Item
              id="upload-patient-citizenship-card-parent"
              name="upload-patient-citizenship-card-parent"
              className="upload-patient-citizenship-card-parent"
              label="Adjuntar documento de identidad del paciente"
              style={{ marginBottom: "13px" }}
              rules={[
                {
                  required: true,
                  message:
                    "¡Por favor adjuntar documento de identidad del paciente!",
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
          )}

        {thePatientHasDiedDataForm &&
          relWithPatientAbbrevFamiliarDataForm ===
            RelationshipWithPatient.SON && (
            <>
              <Form.Item
                id="upload-patient-citizenship-card-son"
                name="upload-patient-citizenship-card-son"
                className="upload-patient-citizenship-card-son"
                label="Adjuntar documento de identidad del paciente"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor adjuntar documento de identidad del paciente!",
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
                id="upload-patient-civil-registry-son"
                name="upload-patient-civil-registry-son"
                className="upload-patient-civil-registry-son"
                label="Adjuntar registro civil del paciente"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor adjuntar registro civil del paciente!",
                  },
                ]}
              >
                <CustomUpload
                  titleCustomUpload="Cargar Documento(s)"
                  fileStatusSetterCustomUpload={
                    copyPatientCivilRegistrySetterDataform
                  }
                  removeFileStatusSetterCustomUpload={
                    copyPatientCivilRegistryRemoverDataform
                  }
                />
              </Form.Item>
            </>
          )}

        {thePatientHasDiedDataForm &&
          relWithPatientAbbrevFamiliarDataForm ===
            RelationshipWithPatient.BROTHER && (
            <>
              <Form.Item
                id="upload-patient-citizenship-card-brother"
                name="upload-patient-citizenship-card-brother"
                className="upload-patient-citizenship-card-brother"
                label="Adjuntar documento de identidad del paciente"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor adjuntar documento de identidad del paciente!",
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
                id="upload-patient-civil-registry-brother"
                name="upload-patient-civil-registry-brother"
                className="upload-patient-civil-registry-brother"
                label="Adjuntar registro civil del paciente"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor adjuntar registro civil del paciente!",
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
            </>
          )}

        {thePatientHasDiedDataForm &&
          relWithPatientAbbrevFamiliarDataForm ===
            RelationshipWithPatient.SPOUSE && (
            <>
              <Form.Item
                id="upload-patient-citizenship-card-spouse"
                name="upload-patient-citizenship-card-spouse"
                className="upload-patient-citizenship-card-spouse"
                label="Adjuntar documento de identidad del paciente"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor adjuntar documento de identidad del paciente!",
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
                id="upload-marriage-certificate-spouse"
                name="upload-marriage-certificate-spouse"
                className="upload-marriage-certificate-spouse"
                label="Adjuntar partida de matrimonio o certificado de unión libre"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor adjuntar partida de matrimonio o certificado de unión libre!",
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
            </>
          )}

        {thePatientHasDiedDataForm &&
          relWithPatientAbbrevFamiliarDataForm ===
            RelationshipWithPatient.FAMILIAR && (
            <>
              <Form.Item
                id="upload-patient-citizenship-card-familiar"
                name="upload-patient-citizenship-card-familiar"
                className="upload-patient-citizenship-card-familiar"
                label="Adjuntar documento de identidad del paciente"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor adjuntar documento de identidad del paciente!",
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
                id="upload-cohabitation-certificate-familiar"
                name="upload-cohabitation-certificate-familiar"
                className="upload-cohabitation-certificate-familiar"
                label="Adjuntar certificado de convivencia o extra-juicio por una notaria"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor adjuntar certificado de convivencia o extra-juicio por una notaria!",
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
            </>
          )}

        {relWithPatientAbbrevFamiliarDataForm !==
          RelationshipWithPatient.PARENT && (
          <Form.Item
            id="upload-aplicant-identification-document-familiar"
            name="upload-aplicant-identification-document-familiar"
            className="upload-aplicant-identification-document-familiar"
            label="Adjuntar documento de identidad familiar (Solicitante)"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor adjuntar tu documento de identidad!",
              },
            ]}
          >
            <CustomUpload
              titleCustomUpload="Cargar Documento(s)"
              fileStatusSetterCustomUpload={
                copyAplicantIdentificationDocumentSetterDataform
              }
              removeFileStatusSetterCustomUpload={
                copyAplicantIdentificationDocumentRemoverDataform
              }
            />
          </Form.Item>
        )}

        {patientCategoryNameState === PatientClassificationStatus.ADULT &&
          !thePatientHasDiedDataForm && (
            <Form.Item
              id="upload-patient-citizenship-card"
              name="upload-patient-citizenship-card"
              className="upload-patient-citizenship-card"
              label="Adjuntar cédula de ciudadania del paciente"
              style={{ marginBottom: "13px" }}
              rules={[
                {
                  required: true,
                  message:
                    "¡Por favor adjuntar cédula de ciudadania del paciente!",
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
          )}

        {patientCategoryNameState === PatientClassificationStatus.YOUNGER &&
          !thePatientHasDiedDataForm && (
            <>
              {relWithPatientAbbrevFamiliarDataForm !==
                RelationshipWithPatient.PARENT && (
                <Form.Item
                  id="upload-citizenship-card-father-or-mother"
                  name="upload-citizenship-card-father-or-mother"
                  className="upload-citizenship-card-father-or-mother"
                  label="Adjuntar cédula de ciudadania del padre o madre"
                  style={{ marginBottom: "13px" }}
                  rules={[
                    {
                      required: true,
                      message:
                        "¡Por favor adjuntar cédula de ciudadania del padre o madre!",
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
              )}

              <Form.Item
                id="upload-minor-civil-registry"
                name="upload-minor-civil-registry"
                className="upload-minor-civil-registry"
                label="Adjuntar registro civil del menor"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor adjuntar registro civil del menor!",
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
            </>
          )}

        <Form.Item
          id="especifications-familiar"
          name="especifications-familiar"
          className="especifications-familiar"
          label="Observaciones y/o detalles"
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
              className="create-medical-req-form-button-familiar"
              onClick={handleButtonSubmitFormDataForm}
            >
              Crear solicitud
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default FamiliarCreateRequestFormData;
