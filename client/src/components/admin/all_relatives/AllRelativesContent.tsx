"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import { tableColumnsAllRelatives } from "./table_columns_all_patients/TableColumnsAllRelatives";
import ModalFamiliarDetails from "./modal_patient_details/ModalFamiliarDetails";
import TotalRelatives from "./total_patients/TotalRelatives";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdUserFamiliar,
  setNameUserFamiliar,
  setLastNameUserFamiliar,
  setIdTypeUserFamiliar,
  setIdNumberUserFamiliar,
  setGenderUserFamiliar,
  setCellphoneUserFamiliar,
  setEmailUserFamiliar,
  setWhatsappUserFamiliar,
  setRelWithPatientFamiliar,
  setPatientIdNumberFamiliar,
  setErrorsUserFamiliar,
  setDefaultValuesUserFamiliar,
} from "@/redux/features/familiar/familiarSlice";

import {
  useGetAllRelativesQuery,
  useBanFamiliarMutation,
} from "@/redux/apis/relatives/relativesApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const AllRelativesContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<Familiar | null>(null);

  const [isSubmittingBanPatient, setIsSubmittingBanPatient] = useState(false);

  const [successMessagePatient, setSuccessMessagePatient] = useState("");
  const [showSuccessMessagePatient, setShowSuccessMessagePatient] =
    useState(false);
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const familiarErrorsState = useAppSelector((state) => state.familiar.errors);

  const [
    banUserFamiliar,
    {
      data: banUserFamiliarData,
      isLoading: banUserFamiliarLoading,
      isSuccess: banUserFamiliarFetching,
      isError: banUserFamiliarError,
    },
  ] = useBanFamiliarMutation({
    fixedCacheKey: "banUserFamiliarData",
  });

  const {
    data: allRelativesData,
    isLoading: allRelativesLoading,
    isFetching: allRelativesFetching,
    error: allRelativesError,
    refetch: refecthAllRelatives,
  } = useGetAllRelativesQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allGendersData,
    isLoading: allGendersLoading,
    isFetching: allGendersFetching,
    error: allGendersError,
  } = useGetAllGendersQuery(null);

  const {
    data: allRelationshipData,
    isLoading: allRelationshipLoading,
    isFetching: allRelationshipFetching,
    error: allRelationshipError,
  } = useGetAllRelationshipTypesQuery(null);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const genderGetName = transformIdToNameMap(allGendersData);
  const relationshipGetName = transformIdToNameMap(allRelationshipData);

  const transformedData = Array.isArray(allRelativesData)
    ? allRelativesData.map((req: any) => ({
        ...req,
        user_id_type: idTypeGetName?.[req.user_id_type] || req.user_id_type,
        user_gender: genderGetName?.[req.user_gender] || req.user_gender,
        rel_with_patient:
          relationshipGetName?.[req.rel_with_patient] || req.rel_with_patient,
      }))
    : [];

  const handleClickSeeMore = (record: Familiar) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllRelatives();

    dispatch(setIdUserFamiliar(record?.id));
    dispatch(setNameUserFamiliar(record?.name));
    dispatch(setLastNameUserFamiliar(record?.last_name));
    dispatch(setIdTypeUserFamiliar(record?.user_id_type));
    dispatch(setIdNumberUserFamiliar(record?.id_number));
    dispatch(setGenderUserFamiliar(record?.user_gender));
    dispatch(setRelWithPatientFamiliar(record?.rel_with_patient));
    dispatch(setPatientIdNumberFamiliar(record?.patient_id_number));
    dispatch(setCellphoneUserFamiliar(record?.cellphone));
    dispatch(setWhatsappUserFamiliar(record?.whatsapp));
    dispatch(setEmailUserFamiliar(record?.email));
  };

  const handleOnChangeSwitch = async (record: Familiar) => {
    try {
      setIsSubmittingBanPatient(true);

      const response: any = await banUserFamiliar({
        id: record.id,
      });

      var banFamiliarSuccess = response.data;

      var banFamiliarError = response.error;

      if (banFamiliarSuccess?.statusCode === 202 && !banFamiliarError) {
        const successMessage = banFamiliarSuccess?.message;

        setSuccessMessagePatient(successMessage);
        setShowSuccessMessagePatient(true);
      } else {
        const errorMessage = banFamiliarError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserFamiliar(errorMessage[0]));

          setShowErrorMessagePatient(true);
        }

        if (typeof errorMessage === "string") {
          dispatch(setErrorsUserFamiliar(errorMessage));

          setShowErrorMessagePatient(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllRelatives();

      setIsSubmittingBanPatient(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllRelatives();
  };

  const handleButtonClick = () => {
    setSuccessMessagePatient("");
    setShowSuccessMessagePatient(false);

    dispatch(setErrorsUserFamiliar([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <>
      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={familiarErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessagePatient && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessagePatient?.toString() ||
            `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-request-details-familiar"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllRelatives();

            setIsModalVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setDefaultValuesUserFamiliar());
          }}
          contentCustomModal={
            <ModalFamiliarDetails
              titleDescription="Detalle completo de familiar"
              labelFamiliarName="Nombre(s)"
              selectedFamiliarName={selectedRowDataLocalState?.name}
              labelFamiliarLastName="Apellido(s)"
              selectedFamiliarLastName={selectedRowDataLocalState?.last_name}
              labelFamiliarIdType="Tipo de identificación"
              selectedFamiliarIdType={getTagComponentIdTypes(
                selectedRowDataLocalState?.user_id_type.toString()
              )}
              labelFamiliarIdNumber="Número de identificación"
              selectedFamiliarIdNumber={selectedRowDataLocalState?.id_number}
              labelFamiliarGender="Género"
              selectedFamiliarGender={selectedRowDataLocalState?.user_gender.toString()}
              labelFamiliarRelWithPatient="Parentesco con paciente"
              selectedFamiliarRelWithPatient={selectedRowDataLocalState?.rel_with_patient.toString()}
              labelFamiliarIdNumberPatient="Número de ID paciente"
              selectedFamiliarIdNumberPatient={
                selectedRowDataLocalState?.patient_id_number
              }
              labelFamiliarWhatsApp="WhatsApp"
              selectedFamiliarWhatsApp={
                selectedRowDataLocalState?.whatsapp || NOT_REGISTER
              }
              labelFamiliarCellphone="Número de celular"
              selectedFamiliarCellphone={
                selectedRowDataLocalState?.cellphone || NOT_REGISTER
              }
              labelFamiliarEmail="Email"
              selectedFamiliarEmail={selectedRowDataLocalState?.email}
            />
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
            <TotalRelatives />

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllRelatives({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBanPatient,
                idTypesData: idTypesData,
                relationshipData: allRelationshipData,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllRelativesContent;
