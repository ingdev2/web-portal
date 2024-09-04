import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const epsCompanyIdKey: keyof EpsCompany = "id";
const epsCompanyNameKey: keyof EpsCompany = "name";
const epsCompanyNitKey: keyof EpsCompany = "nit";
const epsCompanyMainEmailKey: keyof EpsCompany = "main_email";
const epsCompanyIsActiveKey: keyof EpsCompany = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: EpsCompany) => void;
  handleOnChangeSwitch: (record: EpsCompany) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
}

export const tableColumnsAllEpsCompanies = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
}: TableColumnProps) => [
  {
    title: "ID",
    key: epsCompanyIdKey,
    dataIndex: epsCompanyIdKey,
    width: 54,
    sorter: (a: EpsCompany, b: EpsCompany) => {
      return a[epsCompanyIdKey] - b[epsCompanyIdKey];
    },
    ellipsis: true,
  },
  {
    title: "NOMBRE DE EMPRESA",
    key: epsCompanyNameKey,
    dataIndex: epsCompanyNameKey,
    width: 231,
    sorter: (a: EpsCompany, b: EpsCompany) => {
      return a[epsCompanyNameKey].localeCompare(b[epsCompanyNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "NIT",
    key: epsCompanyNitKey,
    dataIndex: epsCompanyNitKey,
    width: 137,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "EMAIL PRINCIPAL",
    key: epsCompanyMainEmailKey,
    dataIndex: epsCompanyMainEmailKey,
    width: 301,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: epsCompanyIdKey,
    dataIndex: epsCompanyIdKey,
    width: 103,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: EpsCompany) => (
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
            isActiveCustomSwitch={record[epsCompanyIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
