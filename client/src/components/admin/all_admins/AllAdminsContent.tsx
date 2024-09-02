"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditAdminForm from "./edit_admin/EditAdminForm";
import { tableColumnsAllAdmins } from "./table_columns_all_admins/TableColumnsAllAdmins";
import ModalAdminDetails from "./modal_admin_details/ModalAdminDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { TbUserEdit } from "react-icons/tb";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";
import {
  setIdSelectedAdmin,
  setNameSelectedAdmin,
  setLastNameSelectedAdmin,
  setIdTypeSelectedAdmin,
  setIdNumberSelectedAdmin,
  setGenderSelectedAdmin,
  setCorporateEmailSelectedAdmin,
  setCompanyAreaSelectedAdmin,
  setPositionLevelSelectedAdmin,
  setErrorsSelectedAdmin,
  setDefaultValuesSelectedAdmin,
} from "@/redux/features/admin/selectedAdminSlice";

import {
  useGetAllAdminsQuery,
  useBanAdminMutation,
} from "@/redux/apis/admins/adminsApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAllPositionLevelsQuery } from "@/redux/apis/position_level/positionLevelApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const AllAdminsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isEditAdminVisibleLocalState, setIsEditAdminVisibleLocalState] =
    useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<Admin | null>(null);

  const [isSubmittingBanAdmin, setIsSubmittingBanAdmin] = useState(false);
  const [isSubmittingRegisterPageAdmin, setIsSubmittingRegisterPageAdmin] =
    useState(false);

  const [successMessageAdmin, setSuccessMessageAdmin] = useState("");
  const [showSuccessMessageAdmin, setShowSuccessMessageAdmin] = useState(false);
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const adminErrorsState = useAppSelector((state) => state.admin.errors);

  const [
    banAdmin,
    {
      data: banAdminData,
      isLoading: banAdminLoading,
      isSuccess: banAdminFetching,
      isError: banAdminError,
    },
  ] = useBanAdminMutation({
    fixedCacheKey: "banAdminData",
  });

  const {
    data: allAdminsData,
    isLoading: allAdminsLoading,
    isFetching: allAdminsFetching,
    error: allAdminsError,
    refetch: refecthAllAdmins,
  } = useGetAllAdminsQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: allPositionsLevelData,
    isLoading: allPositionsLevelLoading,
    isFetching: allPositionsLevelFetching,
    error: allPositionsLevelError,
  } = useGetAllPositionLevelsQuery(null);

  const {
    data: allGendersData,
    isLoading: allGendersLoading,
    isFetching: allGendersFetching,
    error: allGendersError,
  } = useGetAllGendersQuery(null);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const companyAreaGetName = transformIdToNameMap(allCompanyAreasData);
  const positionLevelGetName = transformIdToNameMap(allPositionsLevelData);
  const genderGetName = transformIdToNameMap(allGendersData);

  const transformedData = Array.isArray(allAdminsData)
    ? allAdminsData.map((req: any) => ({
        ...req,
        admin_id_type: idTypeGetName?.[req.admin_id_type] || req.admin_id_type,
        company_area:
          companyAreaGetName?.[req.company_area] || req.company_area,
        position_level:
          positionLevelGetName?.[req.position_level] || req.position_level,
        admin_gender: genderGetName?.[req.admin_gender] || req.admin_gender,
      }))
    : [];

  const handleClickSeeMore = (record: Admin) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllAdmins();

    dispatch(setIdSelectedAdmin(record?.id));
    dispatch(setNameSelectedAdmin(record?.name));
    dispatch(setLastNameSelectedAdmin(record?.last_name));
    dispatch(setIdTypeSelectedAdmin(record?.admin_id_type));
    dispatch(setIdNumberSelectedAdmin(record?.id_number));
    dispatch(setGenderSelectedAdmin(record?.admin_gender));
    dispatch(setCorporateEmailSelectedAdmin(record?.corporate_email));
    dispatch(setCompanyAreaSelectedAdmin(record?.company_area));
    dispatch(setPositionLevelSelectedAdmin(record?.position_level));
  };

  const handleOnChangeSwitch = async (record: Admin) => {
    try {
      setIsSubmittingBanAdmin(true);

      const response: any = await banAdmin({
        id: record.id,
      });

      var banAdminSuccess = response.data;

      var banAdminError = response.error;

      if (banAdminSuccess?.statusCode === 202 && !banAdminError) {
        const successMessage = banAdminSuccess?.message;

        setSuccessMessageAdmin(successMessage);
        setShowSuccessMessageAdmin(true);
      } else {
        const errorMessage = banAdminError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsSelectedAdmin(errorMessage[0]));

          setShowErrorMessageAdmin(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsSelectedAdmin(errorMessage));

          setShowErrorMessageAdmin(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllAdmins();

      setIsSubmittingBanAdmin(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllAdmins();
  };

  const handleButtonClick = () => {
    setSuccessMessageAdmin("");
    setShowSuccessMessageAdmin(false);

    dispatch(setErrorsSelectedAdmin([]));
    setShowErrorMessageAdmin(false);
  };

  return (
    <>
      {showErrorMessageAdmin && (
        <CustomMessage
          typeMessage="error"
          message={adminErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageAdmin && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageAdmin?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-request-details-admin"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllAdmins();

            setIsModalVisibleLocalState(false);
            setIsEditAdminVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setDefaultValuesSelectedAdmin());
          }}
          contentCustomModal={
            <>
              {!isEditAdminVisibleLocalState ? (
                <>
                  <ModalAdminDetails
                    titleDescription="Detalle completo de Administrador"
                    labelAdminName="Nombre(s)"
                    selectedAdminName={selectedRowDataLocalState?.name}
                    labelAdminLastName="Apellido(s)"
                    selectedAdminLastName={selectedRowDataLocalState?.last_name}
                    labelAdminIdType="Tipo de identificación"
                    selectedAdminIdType={getTagComponentIdTypes(
                      selectedRowDataLocalState?.admin_id_type.toString()
                    )}
                    labelAdminIdNumber="Número de identificación"
                    selectedAdminIdNumber={selectedRowDataLocalState?.id_number}
                    labelAdminGender="Género"
                    selectedAdminGender={selectedRowDataLocalState?.admin_gender.toString()}
                    labelAdminLevelPosition="Nivel de cargo"
                    selectedAdminLevelPosition={selectedRowDataLocalState?.position_level.toString()}
                    labelAdminCompanyArea="Área de la empresa"
                    selectedAdminCompanyArea={selectedRowDataLocalState?.company_area.toString()}
                    labelAdminEmail="Email corporativo"
                    selectedAdminEmail={
                      selectedRowDataLocalState?.corporate_email
                    }
                  />

                  <Button
                    className="edit-admin-button"
                    size="large"
                    style={{
                      backgroundColor: "#015E90",
                      color: "#F7F7F7",
                      borderRadius: "31px",
                      paddingInline: "31px",
                      marginBlock: "13px",
                    }}
                    onClick={() => {
                      setIsEditAdminVisibleLocalState(true);
                    }}
                  >
                    <div
                      style={{
                        minWidth: "137px",
                        display: "flex",
                        flexFlow: "row wrap",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TbUserEdit size={17} />
                      &nbsp; Editar administrador
                    </div>
                  </Button>
                </>
              ) : (
                <EditAdminForm />
              )}
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
            <CreateButton
              isSubmittingCreateButton={isSubmittingRegisterPageAdmin}
              setIsSubmittingCreateButton={setIsSubmittingRegisterPageAdmin}
            />

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllAdmins({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBanAdmin,
                idTypesData: idTypesData,
                companyAreaMedicalReqData: allCompanyAreasData,
                positionLevelData: allPositionsLevelData,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllAdminsContent;
