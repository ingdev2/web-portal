"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditEpsForm from "./edit_eps/EditEpsForm";
import { tableColumnsAllEps } from "./table_columns_all_eps/TableColumnsAllEps";
import ModalEpsDetails from "./modal_eps_details/ModalEpsDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { TbUserEdit } from "react-icons/tb";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";
import {
  setIdUserEps,
  setNameUserEps,
  setLastNameUserEps,
  setIdTypeUserEps,
  setIdNumberUserEps,
  setGenderUserEps,
  setCellphoneUserEps,
  setEmailUserEps,
  setEpsCompanyUserEps,
  setCompanyAreaUserEps,
  setErrorsUserEps,
  setDefaultValuesUserEps,
} from "@/redux/features/eps/epsSlice";

import {
  useGetAllEpsQuery,
  useBanUserMutation,
} from "@/redux/apis/users/usersApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAllEpsCompanyQuery } from "@/redux/apis/eps_company/epsCompanyApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const AllEpsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditEpsVisibleLocalState, setIsEditEpsVisibleLocalState] =
    useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<User | null>(null);

  const [isSubmittingBanEps, setIsSubmittingBanEps] = useState(false);
  const [isSubmittingRegisterPageEps, setIsSubmittingRegisterPageEps] =
    useState(false);

  const [successMessageEps, setSuccessMessageEps] = useState("");
  const [showSuccessMessageEps, setShowSuccessMessageEps] = useState(false);
  const [showErrorMessageEps, setShowErrorMessageEps] = useState(false);

  const epsErrorsState = useAppSelector((state) => state.eps.errors);

  const [
    banUserEps,
    {
      data: banUserEpsData,
      isLoading: banUserEpsLoading,
      isSuccess: banUserEpsFetching,
      isError: banUserEpsError,
    },
  ] = useBanUserMutation({
    fixedCacheKey: "banUserEpsData",
  });

  const {
    data: allEpsData,
    isLoading: allEpsLoading,
    isFetching: allEpsFetching,
    error: allEpsError,
    refetch: refecthAllEps,
  } = useGetAllEpsQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allEpsCompaniesData,
    isLoading: allEpsCompaniesLoading,
    isFetching: allEpsCompaniesFetching,
    error: allEpsCompaniesError,
  } = useGetAllEpsCompanyQuery(null);

  const {
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: allGendersData,
    isLoading: allGendersLoading,
    isFetching: allGendersFetching,
    error: allGendersError,
  } = useGetAllGendersQuery(null);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const epsCompanyGetName = transformIdToNameMap(allEpsCompaniesData);
  const companyAreaGetName = transformIdToNameMap(allCompanyAreasData);
  const genderGetName = transformIdToNameMap(allGendersData);

  const transformedData = Array.isArray(allEpsData)
    ? allEpsData.map((req: any) => ({
        ...req,
        user_id_type: idTypeGetName?.[req.user_id_type] || req.user_id_type,
        eps_company: epsCompanyGetName?.[req.eps_company] || req.eps_company,
        company_area:
          companyAreaGetName?.[req.company_area] || req.company_area,
        user_gender: genderGetName?.[req.user_gender] || req.user_gender,
      }))
    : [];

  const handleClickSeeMore = (record: User) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllEps();

    dispatch(setIdUserEps(record?.id));
    dispatch(setNameUserEps(record?.name));
    dispatch(setLastNameUserEps(record?.last_name));
    dispatch(setIdTypeUserEps(record?.user_id_type));
    dispatch(setIdNumberUserEps(record?.id_number));
    dispatch(setGenderUserEps(record?.user_gender));
    dispatch(setCellphoneUserEps(record?.cellphone));
    dispatch(setEmailUserEps(record?.email));
    dispatch(setEpsCompanyUserEps(record?.eps_company));
    dispatch(setCompanyAreaUserEps(record?.company_area));
  };

  const handleOnChangeSwitch = async (record: User) => {
    try {
      setIsSubmittingBanEps(true);

      const response: any = await banUserEps({
        id: record.id,
      });

      var banEpsSuccess = response.data;

      var banEpsError = response.error;

      if (banEpsSuccess?.statusCode === 202 && !banEpsError) {
        const successMessage = banEpsSuccess?.message;

        setSuccessMessageEps(successMessage);
        setShowSuccessMessageEps(true);
      } else {
        const errorMessage = banEpsError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserEps(errorMessage[0]));

          setShowErrorMessageEps(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUserEps(errorMessage));

          setShowErrorMessageEps(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllEps();

      setIsSubmittingBanEps(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllEps();
  };

  const handleButtonClick = () => {
    setSuccessMessageEps("");
    setShowSuccessMessageEps(false);

    dispatch(setErrorsUserEps([]));
    setShowErrorMessageEps(false);
  };

  return (
    <>
      {showErrorMessageEps && (
        <CustomMessage
          typeMessage="error"
          message={epsErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageEps && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageEps?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-request-details-eps"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllEps();

            setIsModalVisibleLocalState(false);
            setIsEditEpsVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setDefaultValuesUserEps());
          }}
          contentCustomModal={
            <>
              {!isEditEpsVisibleLocalState ? (
                <>
                  <ModalEpsDetails
                    titleDescription="Detalle completo de usuario Eps"
                    labelAdminName="Nombre(s)"
                    selectedAdminName={selectedRowDataLocalState?.name}
                    labelAdminLastName="Apellido(s)"
                    selectedAdminLastName={selectedRowDataLocalState?.last_name}
                    labelAdminIdType="Tipo de identificación"
                    selectedAdminIdType={getTagComponentIdTypes(
                      selectedRowDataLocalState?.user_id_type.toString()
                    )}
                    labelAdminIdNumber="Número de identificación"
                    selectedAdminIdNumber={selectedRowDataLocalState?.id_number}
                    labelAdminGender="Género"
                    selectedAdminGender={selectedRowDataLocalState?.user_gender.toString()}
                    labelAdminLevelPosition="Empresa donde labora"
                    selectedAdminLevelPosition={selectedRowDataLocalState?.eps_company.toString()}
                    labelAdminCompanyArea="Área de la empresa"
                    selectedAdminCompanyArea={selectedRowDataLocalState?.company_area.toString()}
                    labelAdminCellphone="Número de celular corporativo"
                    selectedAdminCellphone={
                      selectedRowDataLocalState?.cellphone || NOT_REGISTER
                    }
                    labelAdminEmail="Email corporativo"
                    selectedAdminEmail={selectedRowDataLocalState?.email}
                  />

                  <Button
                    className="edit-eps-button"
                    size="large"
                    style={{
                      backgroundColor: "#015E90",
                      color: "#F7F7F7",
                      borderRadius: "31px",
                      paddingInline: "31px",
                      marginBlock: "13px",
                    }}
                    onClick={() => {
                      setIsEditEpsVisibleLocalState(true);
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
                      &nbsp; Editar eps
                    </div>
                  </Button>
                </>
              ) : (
                <EditEpsForm />
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
              isSubmittingCreateButton={isSubmittingRegisterPageEps}
              setIsSubmittingCreateButton={setIsSubmittingRegisterPageEps}
            />

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllEps({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBanEps,
                idTypesData: idTypesData,
                epsCompanyData: allEpsCompaniesData,
                companyAreaMedicalReqData: allCompanyAreasData,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllEpsContent;
