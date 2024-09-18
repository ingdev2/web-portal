import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const adminIdKey: keyof Admin = "id";
const adminNameKey: keyof Admin = "name";
const adminLastNameKey: keyof Admin = "last_name";
const adminIdTypeKey: keyof Admin = "admin_id_type";
const adminIdNumberKey: keyof Admin = "id_number";
const adminEmailKey: keyof Admin = "corporate_email";
const companyAreaKey: keyof Admin = "company_area";
const positionLevelKey: keyof Admin = "position_level";
const adminIsActiveKey: keyof Admin = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: Admin) => void;
  handleOnChangeSwitch: (record: Admin) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
  idTypesData: IdType[] | undefined;
  companyAreaMedicalReqData: CompanyArea[] | undefined;
  positionLevelData: PositionLevel[] | undefined;
}

export const tableColumnsAllAdmins = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
  idTypesData,
  companyAreaMedicalReqData,
  positionLevelData,
}: TableColumnProps) => [
  {
    title: "NOMBRE",
    key: adminNameKey,
    dataIndex: adminNameKey,
    width: 207,
    sorter: (a: Admin, b: Admin) => {
      return a[adminNameKey].localeCompare(b[adminNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "TIPO DE ID",
    key: adminIdTypeKey,
    dataIndex: adminIdTypeKey,
    width: 183,
    filters:
      idTypesData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.admin_id_type) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "NÚMERO DE ID",
    key: adminIdNumberKey,
    dataIndex: adminIdNumberKey,
    width: 103,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "NIVEL DE CARGO",
    key: positionLevelKey,
    dataIndex: positionLevelKey,
    width: 231,
    ellipsis: true,
    filters:
      positionLevelData?.map((position) => ({
        value: position.name,
        text: position.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.position_level) === String(value);
    },
    render: (position: string) => position,
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
    key: adminEmailKey,
    dataIndex: adminEmailKey,
    width: 405,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: adminIdKey,
    dataIndex: adminIdKey,
    width: 103,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: Admin) => (
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
            isActiveCustomSwitch={record[adminIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
