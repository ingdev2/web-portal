import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const epsIdKey: keyof User = "id";
const epsNameKey: keyof User = "name";
const epsLastNameKey: keyof User = "last_name";
const idTypeEpsKey: keyof User = "user_id_type";
const numberIdTypeKey: keyof User = "id_number";
const emailKey: keyof User = "email";
const epsCompanyKey: keyof User = "eps_company";
const companyAreaKey: keyof User = "company_area";
const epsIsActiveKey: keyof User = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: User) => void;
  handleOnChangeSwitch: (record: User) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
  idTypesData: IdType[] | undefined;
  epsCompanyData: EpsCompany[] | undefined;
  companyAreaMedicalReqData: CompanyArea[] | undefined;
}

export const tableColumnsAllEps = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
  idTypesData,
  epsCompanyData,
  companyAreaMedicalReqData,
}: TableColumnProps) => [
  {
    title: "NOMBRE",
    key: epsNameKey,
    dataIndex: epsNameKey,
    width: 207,
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "TIPO DE ID",
    key: idTypeEpsKey,
    dataIndex: idTypeEpsKey,
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
    key: numberIdTypeKey,
    dataIndex: numberIdTypeKey,
    width: 103,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "EMPRESA DONDE LABORA",
    key: epsCompanyKey,
    dataIndex: epsCompanyKey,
    width: 231,
    ellipsis: true,
    filters:
      epsCompanyData?.map((epsCompany) => ({
        value: epsCompany.name,
        text: epsCompany.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eps_company) === String(value);
    },
    render: (epsCompany: string) => epsCompany,
  },
  {
    title: "ÁREA DE LA EMPRESA",
    key: companyAreaKey,
    dataIndex: companyAreaKey,
    width: 231,
    ellipsis: true,
    filters:
      companyAreaMedicalReqData?.map((area) => ({
        value: area.name,
        text: area.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.company_area) === String(value);
    },
    render: (area: string) => area,
  },
  {
    title: "EMAIL CORPORATIVO",
    key: emailKey,
    dataIndex: emailKey,
    width: 301,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: epsIdKey,
    dataIndex: epsIdKey,
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
            isActiveCustomSwitch={record[epsIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
