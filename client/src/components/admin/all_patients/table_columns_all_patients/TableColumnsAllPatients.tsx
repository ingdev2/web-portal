import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const patientIdKey: keyof User = "id";
const patientNameKey: keyof User = "name";
const patientLastNameKey: keyof User = "last_name";
const idTypePatientKey: keyof User = "user_id_type";
const idNumberPatientKey: keyof User = "id_number";
const patientEmailKey: keyof User = "email";
const patientAffiliationEpsKey: keyof User = "affiliation_eps";
const patientIsActiveKey: keyof User = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: User) => void;
  handleOnChangeSwitch: (record: User) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
  idTypesData: IdType[] | undefined;
}

export const tableColumnsAllPatients = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
  idTypesData,
}: TableColumnProps) => [
  {
    title: "NOMBRE COMPLETO",
    key: patientNameKey,
    dataIndex: patientNameKey,
    width: 270,
    sorter: (a: User, b: User) => {
      return a[patientNameKey].localeCompare(b[patientNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "TIPO DE ID",
    key: idTypePatientKey,
    dataIndex: idTypePatientKey,
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
    key: idNumberPatientKey,
    dataIndex: idNumberPatientKey,
    width: 103,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "EMAIL",
    key: patientEmailKey,
    dataIndex: patientEmailKey,
    width: 321,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "EPS DE AFILIACIÓN",
    key: patientAffiliationEpsKey,
    dataIndex: patientAffiliationEpsKey,
    width: 207,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: patientIdKey,
    dataIndex: patientIdKey,
    width: 103,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: User) => (
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
            isActiveCustomSwitch={record[patientIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
