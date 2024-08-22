const adminNameKey: keyof Admin = "name";
const adminLastNameKey: keyof Admin = "last_name";
const idTypeAdminKey: keyof Admin = "admin_id_type";
const numberIdTypeKey: keyof Admin = "id_number";

interface TableColumnProps {
  idTypesData: IdType[] | undefined;
}

export const tableColumnsAllAdmins = ({ idTypesData }: TableColumnProps) => [
  {
    title: "NOMBRE DE ADMINISTRADOR",
    key: adminNameKey,
    dataIndex: adminNameKey,
    width: 173,
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "NÚMERO DE ID ADMIN",
    key: idTypeAdminKey,
    dataIndex: idTypeAdminKey,
    width: 173,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "TIPO DE ID ADMIN",
    key: numberIdTypeKey,
    dataIndex: numberIdTypeKey,
    width: 270,
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
];
