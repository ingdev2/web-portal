"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import { tableColumnsAuditLogs } from "./table_columns_audit_logs/TableColumnsAuditLogs";
import ModalAuditLogDetails from "./modal_audit_log_details/ModalAuditLogDetails";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdAuditLog,
  setResetAuditLog,
} from "@/redux/features/audit_log/auditLogSlice";

import { useGetAllAuditLogsQuery } from "@/redux/apis/audit_logs/auditLogsApi";
import {
  formatDate,
  formatTime,
} from "@/helpers/format_date_and_hour/format_date_and_hour";

const AuditLogsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<AuditLogs | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const auditLogsErrorsState = useAppSelector((state) => state.auditLog.errors);

  const {
    data: allAuditLogsData,
    isLoading: allAuditLogsLoading,
    isFetching: allAuditLogsFetching,
    error: allAuditLogsError,
    refetch: refecthAllAuditLogs,
  } = useGetAllAuditLogsQuery(null);

  const transformedData = Array.isArray(allAuditLogsData)
    ? allAuditLogsData.map((req: any) => ({
        ...req,
        createdAt: formatDate(req.createdAt),
        timeAt: formatTime(req.createdAt),
      }))
    : [];

  const handleClickSeeMore = (record: AuditLogs) => {
    dispatch(setTableRowId(""));

    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllAuditLogs();

    dispatch(setIdAuditLog(record?.id));
  };

  const handleButtonUpdate = () => {
    refecthAllAuditLogs();
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={auditLogsErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessage?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-audit-log-details"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            dispatch(setTableRowId(""));

            refecthAllAuditLogs();

            setIsModalVisibleLocalState(false);

            setSelectedRowDataLocalState(null);

            dispatch(setResetAuditLog());
          }}
          contentCustomModal={
            <>
              <>
                <ModalAuditLogDetails
                  titleDescription="Detalle completo de acción"
                  labelAuditLogId="Id registro de acción"
                  selectedAuditLogId={selectedRowDataLocalState?.id}
                  labelUserNameAuditLog="Nombre de usuario"
                  selectedUserNameAuditLog={
                    selectedRowDataLocalState?.user_name
                  }
                  labelUserIdNumberAuditLog="Número de identificación"
                  selectedUserIdNumberAuditLog={
                    selectedRowDataLocalState?.user_id_number
                  }
                  labelUserEmailAuditLog="Email de usuario"
                  selectedUserEmailAuditLog={
                    selectedRowDataLocalState?.user_email
                  }
                  labelUserRoleAuditLog="Role de usuario"
                  selectedUserRoleAuditLog={
                    selectedRowDataLocalState?.user_role
                  }
                  labelActionTypeAuditLog="Tipo de acción"
                  selectedActionTypeAuditLog={
                    selectedRowDataLocalState?.action_type
                  }
                  labelQueryTypeAuditLog="Tipo de query ejecutado"
                  selectedQueryTypeAuditLog={
                    selectedRowDataLocalState?.query_type
                  }
                  labelModuleNameAuditLog="Nombre de modulo modificado"
                  selectedModuleNameAuditLog={
                    selectedRowDataLocalState?.module_name
                  }
                  labelModuleRecordIdAuditLog="Id de registro modificado"
                  selectedModuleRecordIdAuditLog={
                    selectedRowDataLocalState?.module_record_id
                  }
                  labelIpAddressAuditLog="IP de dispositivo"
                  selectedIpAddressAuditLog={
                    selectedRowDataLocalState?.ip_address
                  }
                  labelIsMobileAuditLog="¿Es un dispositivo móvil (celular)?"
                  selectedIsMobileAuditLog={
                    selectedRowDataLocalState?.is_mobile
                  }
                  labelBrowserVersionAuditLog="Tipo y versión de navegador"
                  selectedBrowserVersionAuditLog={
                    selectedRowDataLocalState?.browser_version
                  }
                  labelOperatingSystemAuditLog="Sistema operativo"
                  selectedOperatingSystemAuditLog={
                    selectedRowDataLocalState?.operating_system
                  }
                  labelDateOfAuditLog="Fecha de acción"
                  selectedDateOfAuditLog={formatDate(
                    selectedRowDataLocalState?.createdAt
                  )}
                  labelHourOfAuditLog="Hora de acción"
                  selectedHourOfAuditLog={selectedRowDataLocalState?.timeAt}
                />
              </>
            </>
          }
        />
      )}

      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAuditLogs({
                handleClickSeeMore: handleClickSeeMore,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AuditLogsContent;
