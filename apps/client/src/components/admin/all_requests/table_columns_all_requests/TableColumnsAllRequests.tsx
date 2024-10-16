import { Button } from "antd";
import { FaRegEye } from "react-icons/fa";

const aplicantTypeKey: keyof MedicalReq = "medicalReqUserType";
const aplicantNameKey: keyof MedicalReq = "aplicant_name";
const filingNumberKey: keyof MedicalReq = "filing_number";
const dateOfAdmissionKey: keyof MedicalReq = "date_of_admission";
const answerDateKey: keyof MedicalReq = "answer_date";
const requirementTypeKey: keyof MedicalReq = "requirement_type";
const requirementStatusKey: keyof MedicalReq = "requirement_status";
const currentlyInAreaKey: keyof MedicalReq = "currently_in_area";
const patientNameKey: keyof MedicalReq = "patient_name";
const patientIdTypeKey: keyof MedicalReq = "patient_id_type";
const patientIdNumberKey: keyof MedicalReq = "patient_id_number";
const responseTimeKey: keyof MedicalReq = "response_time";

interface TableColumnProps {
  handleClickSeeMore: (record: MedicalReq) => void;
  userMedicalReqTypeData: MedicalReqType[] | undefined;
  userMedicalReqStatusData: MedicalReqStatus[] | undefined;
  currentlyAreaMedicalReqData: CompanyArea[] | undefined;
  aplicantTypeData: UserRole[] | undefined;
  idTypesData: IdType[] | undefined;
}

export const tableColumnsAllRequests = ({
  handleClickSeeMore,
  userMedicalReqTypeData,
  userMedicalReqStatusData,
  currentlyAreaMedicalReqData,
  aplicantTypeData,
  idTypesData,
}: TableColumnProps) => [
  {
    title: "# RADICADO",
    key: filingNumberKey,
    dataIndex: filingNumberKey,
    width: 130,
    sorter: (a: MedicalReq, b: MedicalReq) => {
      const numA = parseInt(a.filing_number.split("-")[1], 10);
      const numB = parseInt(b.filing_number.split("-")[1], 10);

      return numA - numB;
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "NOMBRE DE SOLICITANTE",
    key: aplicantNameKey,
    dataIndex: aplicantNameKey,
    width: 270,
    sorter: (a: MedicalReq, b: MedicalReq) => {
      return a[aplicantNameKey].localeCompare(b[aplicantNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "TIPO DE SOLICITANTE",
    key: aplicantTypeKey,
    dataIndex: aplicantTypeKey,
    width: 88,
    ellipsis: true,
    filters:
      aplicantTypeData?.map((aplicantType) => ({
        value: aplicantType.name,
        text: aplicantType.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.medicalReqUserType) === String(value);
    },
  },
  {
    title: "NOMBRE DE PACIENTE",
    key: patientNameKey,
    dataIndex: patientNameKey,
    width: 270,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "NÚMERO DE ID PACIENTE",
    key: patientIdNumberKey,
    dataIndex: patientIdNumberKey,
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "TIPO DE ID PACIENTE",
    key: patientIdTypeKey,
    dataIndex: patientIdTypeKey,
    width: 207,
    filters:
      idTypesData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.patient_id_type) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "FECHA DE CREACIÓN",
    key: dateOfAdmissionKey,
    dataIndex: dateOfAdmissionKey,
    width: 100,
    sorter: (a: MedicalReq, b: MedicalReq) =>
      a.date_of_admission.localeCompare(b.date_of_admission),
    ellipsis: true,
    searchable: true,
  },
  {
    title: "FECHA DE RESPUESTA",
    key: answerDateKey,
    dataIndex: answerDateKey,
    width: 100,
    ellipsis: true,
  },
  {
    title: "TIEMPO DE RESPUESTA",
    key: responseTimeKey,
    dataIndex: responseTimeKey,
    width: 173,
    ellipsis: true,
  },
  {
    title: "TIPO DE SOLICITUD",
    key: requirementTypeKey,
    dataIndex: requirementTypeKey,
    width: 173,
    filters:
      userMedicalReqTypeData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.requirement_type) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "ESTADO DE SOLICITUD",
    key: requirementStatusKey,
    dataIndex: requirementStatusKey,
    width: 173,
    filters:
      userMedicalReqStatusData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.requirement_status) === String(value);
    },
    ellipsis: true,
    render: (status: string) => status,
  },
  {
    title: "ÁREA QUE ESTA REVISANDO",
    key: currentlyInAreaKey,
    dataIndex: currentlyInAreaKey,
    width: 231,
    filters:
      currentlyAreaMedicalReqData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.currently_in_area) === String(value);
    },
    ellipsis: true,
    render: (area: string) => area,
  },
  {
    title: "VER SOLICITUD COMPLETA",
    key: filingNumberKey,
    dataIndex: filingNumberKey,
    width: 77,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: MedicalReq) => (
      <Button
        style={{
          display: "flex",
          flexFlow: "row wrap",
          color: "#F7F7F7",
          backgroundColor: "#015E90",
          borderRadius: 22,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingInline: 13,
          paddingBlock: 13,
        }}
        size="small"
        icon={<FaRegEye />}
        onClick={() => {
          handleClickSeeMore(record);
        }}
      />
    ),
  },
];
