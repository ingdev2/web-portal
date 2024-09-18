import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const familiarIdKey: keyof Familiar = "id";
const familiarNameKey: keyof Familiar = "name";
const familiarLastNameKey: keyof Familiar = "last_name";
const idTypeFamiliarKey: keyof Familiar = "user_id_type";
const idNumberFamiliarKey: keyof Familiar = "id_number";
const familiarEmailKey: keyof Familiar = "email";
const relationshipWithPatientKey: keyof Familiar = "rel_with_patient";
const idNumberOfPatientKey: keyof Familiar = "patient_id_number";
const familiarIsActiveKey: keyof Familiar = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: Familiar) => void;
  handleOnChangeSwitch: (record: Familiar) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
  idTypesData: IdType[] | undefined;
  relationshipData: RelationshipType[] | undefined;
}

export const tableColumnsAllRelatives = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
  idTypesData,
  relationshipData,
}: TableColumnProps) => [
  {
    title: "NOMBRE(S)",
    key: familiarNameKey,
    dataIndex: familiarNameKey,
    width: 207,
    sorter: (a: Familiar, b: Familiar) => {
      return a[familiarNameKey].localeCompare(b[familiarNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "APELLIDO(S)",
    key: familiarLastNameKey,
    dataIndex: familiarLastNameKey,
    width: 207,
    sorter: (a: Familiar, b: Familiar) => {
      return a[familiarLastNameKey].localeCompare(b[familiarLastNameKey]);
    },
    ellipsis: true,
    searchable: true,
  },
  {
    title: "TIPO DE ID",
    key: idTypeFamiliarKey,
    dataIndex: idTypeFamiliarKey,
    width: 183,
    filters:
      idTypesData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.user_id_type) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "NÚMERO DE ID",
    key: idNumberFamiliarKey,
    dataIndex: idNumberFamiliarKey,
    width: 103,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "EMAIL",
    key: familiarEmailKey,
    dataIndex: familiarEmailKey,
    width: 405,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "PARENTESCO CON PACIENTE",
    key: relationshipWithPatientKey,
    dataIndex: relationshipWithPatientKey,
    width: 137,
    filters:
      relationshipData?.map((relationship) => ({
        value: relationship.name,
        text: relationship.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.rel_with_patient) === String(value);
    },
    ellipsis: true,
    render: (relationship: string) => relationship,
  },
  {
    title: "NÚMERO DE ID PACIENTE",
    key: idNumberOfPatientKey,
    dataIndex: idNumberOfPatientKey,
    width: 103,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: familiarIdKey,
    dataIndex: familiarIdKey,
    width: 103,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: Familiar) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Space direction="horizontal" size={"small"}>
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

          <CustomSwitch
            checkedChildrenCustomSwitch={<FaRegCheckCircle />}
            unCheckedChildrenCustomSwitch={<FaBan />}
            onChangeCustomSwitch={() => {
              handleOnChangeSwitch(record);
            }}
            onClickCustomSwitch={onClickSwitch}
            isActiveCustomSwitch={record[familiarIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
