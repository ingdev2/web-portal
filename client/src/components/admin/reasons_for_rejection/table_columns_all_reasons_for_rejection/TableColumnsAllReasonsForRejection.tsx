import { Button } from "antd";
import { FaRegEye } from "react-icons/fa";

const reasonForRejectionIdKey: keyof MedicalReqReasonForRejection = "id";
const reasonForRejectionTitleNameKey: keyof MedicalReqReasonForRejection =
  "rejection_title";
const reasonForRejectionMessageKey: keyof MedicalReqReasonForRejection =
  "reason_message";

interface TableColumnProps {
  handleClickSeeMore: (record: MedicalReqReasonForRejection) => void;
}

export const tableColumnsAllReasonsForRejection = ({
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "ID",
    key: reasonForRejectionIdKey,
    dataIndex: reasonForRejectionIdKey,
    width: 54,
    sorter: (
      a: MedicalReqReasonForRejection,
      b: MedicalReqReasonForRejection
    ) => {
      return a[reasonForRejectionIdKey] - b[reasonForRejectionIdKey];
    },
    ellipsis: true,
  },
  {
    title: "TITULO DE MOTIVO",
    key: reasonForRejectionTitleNameKey,
    dataIndex: reasonForRejectionTitleNameKey,
    width: 321,
    sorter: (
      a: MedicalReqReasonForRejection,
      b: MedicalReqReasonForRejection
    ) => {
      return a[reasonForRejectionTitleNameKey].localeCompare(
        b[reasonForRejectionTitleNameKey]
      );
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "MENSAJE DE MOTIVO",
    key: reasonForRejectionMessageKey,
    dataIndex: reasonForRejectionMessageKey,
    width: 504,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: reasonForRejectionIdKey,
    dataIndex: reasonForRejectionIdKey,
    width: 77,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: MedicalReqReasonForRejection) => (
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
