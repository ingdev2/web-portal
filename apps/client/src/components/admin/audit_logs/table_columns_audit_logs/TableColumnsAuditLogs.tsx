import { Button } from "antd";
import { FaRegEye } from "react-icons/fa";

import { AdminRolType } from "@/utils/enums/admin_roles.enum";
import { UserRolType } from "@/utils/enums/user_roles.enum";

import { ActionTypesEnum } from "@/utils/enums/audit_logs_enums/action_types.enum";
import { ModuleNameEnum } from "@/utils/enums/audit_logs_enums/module_names.enum";
import { QueryTypesEnum } from "@/utils/enums/audit_logs_enums/query_types.enum";

const enumDataFilters = (enumData: Object) =>
  Object.values(enumData).map((value) => ({
    text: value,
    value,
  }));

const combineEnumFilters = (enums: Object[]) =>
  enums.flatMap((enumData) =>
    Object.values(enumData).map((value) => ({
      text: value,
      value,
    }))
  );

const auditLogIdKey: keyof AuditLogs = "id";
const userNameAuditLogKey: keyof AuditLogs = "user_name";
const userIdNumberAuditLogKey: keyof AuditLogs = "user_id_number";
const userEmailAuditLogKey: keyof AuditLogs = "user_email";
const userRoleAuditLogKey: keyof AuditLogs = "user_role";
const actionTypeAuditLogKey: keyof AuditLogs = "action_type";
const moduleNameAuditLogKey: keyof AuditLogs = "module_name";
const queryTypeAuditLogKey: keyof AuditLogs = "query_type";
const moduleRecordIdAuditLogKey: keyof AuditLogs = "module_record_id";
const dateOfAuditLogKey: keyof AuditLogs = "createdAt";
const timeOfAuditLogKey: keyof AuditLogs = "timeAt";

interface TableColumnProps {
  handleClickSeeMore: (record: AuditLogs) => void;
}

export const tableColumnsAuditLogs = ({
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "NOMBRE DE USUARIO",
    key: userNameAuditLogKey,
    dataIndex: userNameAuditLogKey,
    width: 222,
    sorter: (a: AuditLogs, b: AuditLogs) => {
      return a[userNameAuditLogKey].localeCompare(b[userNameAuditLogKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "ROLE DE USUARIO",
    key: userRoleAuditLogKey,
    dataIndex: userRoleAuditLogKey,
    width: 130,
    filters: combineEnumFilters([AdminRolType, UserRolType]),
    onFilter: (value: any, record: any) => {
      return String(record.user_role) === String(value);
    },
    ellipsis: true,
    render: (role: string) => role,
    fixed: "left" as "left",
  },
  {
    title: "ACCIÓN REALIZADA",
    key: actionTypeAuditLogKey,
    dataIndex: actionTypeAuditLogKey,
    width: 321,
    filters: enumDataFilters(ActionTypesEnum),
    onFilter: (value: any, record: any) => {
      return String(record.action_type) === String(value);
    },
    ellipsis: true,
    render: (actionType: string) => actionType,
  },
  {
    title: "FECHA DE ACCIÓN",
    key: dateOfAuditLogKey,
    dataIndex: dateOfAuditLogKey,
    width: 103,
    sorter: (a: AuditLogs, b: AuditLogs) => {
      return a[dateOfAuditLogKey].localeCompare(b[dateOfAuditLogKey]);
    },
    ellipsis: true,
    searchable: true,
    render: (date: string) => date,
  },
  {
    title: "HORA DE ACCIÓN",
    key: timeOfAuditLogKey,
    dataIndex: timeOfAuditLogKey,
    width: 103,
    ellipsis: true,
    render: (time: string) => time,
  },
  {
    title: "NOMBRE DE MÓDULO",
    key: moduleNameAuditLogKey,
    dataIndex: moduleNameAuditLogKey,
    width: 207,
    filters: enumDataFilters(ModuleNameEnum),
    onFilter: (value: any, record: any) => {
      return String(record.module_name) === String(value);
    },
    ellipsis: true,
    render: (moduleName: string) => moduleName,
  },
  {
    title: "TIPO DE QUERY",
    key: queryTypeAuditLogKey,
    dataIndex: queryTypeAuditLogKey,
    width: 88,
    filters: enumDataFilters(QueryTypesEnum),
    onFilter: (value: any, record: any) => {
      return String(record.query_type) === String(value);
    },
    ellipsis: true,
    render: (queryType: string) => queryType,
  },
  {
    title: "ID DE REGISTRO AFECTADO",
    key: moduleRecordIdAuditLogKey,
    dataIndex: moduleRecordIdAuditLogKey,
    width: 301,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "NÚMERO DE IDENTIFICACIÓN",
    key: userIdNumberAuditLogKey,
    dataIndex: userIdNumberAuditLogKey,
    width: 130,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "CORREO ELECTRÓNICO",
    key: userEmailAuditLogKey,
    dataIndex: userEmailAuditLogKey,
    width: 321,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "VER MÁS",
    key: auditLogIdKey,
    dataIndex: auditLogIdKey,
    width: 77,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: AuditLogs) => (
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
