import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const typeOfRequestIdKey: keyof MedicalReqType = "id";
const typeOfRequestNameKey: keyof MedicalReqType = "name";
const typeOfRequestIsActiveKey: keyof MedicalReqType = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: MedicalReqType) => void;
  handleOnChangeSwitch: (record: MedicalReqType) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
}

export const tableColumnsAllTypesOfRequests = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
}: TableColumnProps) => [
  {
    title: "ID",
    key: typeOfRequestIdKey,
    dataIndex: typeOfRequestIdKey,
    width: 45,
    sorter: (a: MedicalReqType, b: MedicalReqType) => {
      return a[typeOfRequestIdKey] - b[typeOfRequestIdKey];
    },
    ellipsis: true,
  },
  {
    title: "NOMBRE",
    key: typeOfRequestNameKey,
    dataIndex: typeOfRequestNameKey,
    width: 371,
    sorter: (a: MedicalReqType, b: MedicalReqType) => {
      return a[typeOfRequestNameKey].localeCompare(b[typeOfRequestNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "ADMINISTRAR",
    key: typeOfRequestIdKey,
    dataIndex: typeOfRequestIdKey,
    width: 88,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: MedicalReqType) => (
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
            isActiveCustomSwitch={record[typeOfRequestIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
