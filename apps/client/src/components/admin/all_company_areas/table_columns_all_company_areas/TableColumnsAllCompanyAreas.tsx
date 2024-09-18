import { Button } from "antd";
import { FaRegEye } from "react-icons/fa";

const companyAreaIdKey: keyof CompanyArea = "id";
const companyAreaNameKey: keyof CompanyArea = "name";

interface TableColumnProps {
  handleClickSeeMore: (record: CompanyArea) => void;
}

export const tableColumnsAllCompanyAreas = ({
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "ID",
    key: companyAreaIdKey,
    dataIndex: companyAreaIdKey,
    width: 45,
    sorter: (a: CompanyArea, b: CompanyArea) => {
      return a[companyAreaIdKey] - b[companyAreaIdKey];
    },
    ellipsis: true,
  },
  {
    title: "NOMBRE",
    key: companyAreaNameKey,
    dataIndex: companyAreaNameKey,
    width: 371,
    sorter: (a: CompanyArea, b: CompanyArea) => {
      return a[companyAreaNameKey].localeCompare(b[companyAreaNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "ADMINISTRAR",
    key: companyAreaIdKey,
    dataIndex: companyAreaIdKey,
    width: 54,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: CompanyArea) => (
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
