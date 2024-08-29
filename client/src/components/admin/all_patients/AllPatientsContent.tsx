"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditPatientsForm from "./edit_patient/EditPatientsForm";
import { tableColumnsAllPatients } from "./table_columns_all_patients/TableColumnsAllPatients";
import ModalPatientDetails from "./modal_patient_details/ModalPatientDetails";
import TotalPatients from "./total_patients/TotalPatients";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import RelativesDetails from "./modal_patient_details/RelativesDetails";
import { TbUserEdit } from "react-icons/tb";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";
import {
  setIdUserPatient,
  setNameUserPatient,
  setLastNameUserPatient,
  setIdTypeUserPatient,
  setIdNumberUserPatient,
  setGenderUserPatient,
  setCellphoneUserPatient,
  setEmailUserPatient,
  setWhatsappUserPatient,
  setBirthdateUserPatient,
  setAffiliationEpsUserPatient,
  setResidenceAddressUserPatient,
  setRelativesUserPatient,
  setErrorsUserPatient,
  setDefaultValuesUserPatient,
} from "@/redux/features/patient/patientSlice";

import {
  useGetAllPatientsQuery,
  useBanUserMutation,
} from "@/redux/apis/users/usersApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const AllPatientsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditPatientVisibleLocalState, setIsEditPatientVisibleLocalState] =
    useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<User | null>(null);

  const [isSubmittingBanPatient, setIsSubmittingBanPatient] = useState(false);

  const [successMessagePatient, setSuccessMessagePatient] = useState("");
  const [showSuccessMessagePatient, setShowSuccessMessagePatient] =
    useState(false);
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const patientErrorsState = useAppSelector((state) => state.patient.errors);

  const [
    banUserPatient,
    {
      data: banUserPatientData,
      isLoading: banUserPatientLoading,
      isSuccess: banUserPatientFetching,
      isError: banUserPatientError,
    },
  ] = useBanUserMutation({
    fixedCacheKey: "banUserPatientData",
  });

  const {
    data: allPatientData,
    isLoading: allPatientLoading,
    isFetching: allPatientFetching,
    error: allPatientError,
    refetch: refecthAllPatient,
  } = useGetAllPatientsQuery(null);

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

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const genderGetName = transformIdToNameMap(allGendersData);

  const transformedData = Array.isArray(allPatientData)
    ? allPatientData.map((req: any) => ({
        ...req,
        user_id_type: idTypeGetName?.[req.user_id_type] || req.user_id_type,
        user_gender: genderGetName?.[req.user_gender] || req.user_gender,
      }))
    : [];

  const handleClickSeeMore = (record: User) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllPatient();

    dispatch(setIdUserPatient(record?.id));
    dispatch(setNameUserPatient(record?.name));
    dispatch(setLastNameUserPatient(record?.last_name));
    dispatch(setIdTypeUserPatient(record?.user_id_type));
    dispatch(setIdNumberUserPatient(record?.id_number));
    dispatch(setGenderUserPatient(record?.user_gender));
    dispatch(setBirthdateUserPatient(record?.birthdate));
    dispatch(setCellphoneUserPatient(record?.cellphone));
    dispatch(setWhatsappUserPatient(record?.whatsapp));
    dispatch(setEmailUserPatient(record?.email));
    dispatch(setAffiliationEpsUserPatient(record?.affiliation_eps));
    dispatch(setResidenceAddressUserPatient(record?.residence_address));
    dispatch(setRelativesUserPatient(record?.familiar));
  };

  const handleOnChangeSwitch = async (record: User) => {
    try {
      setIsSubmittingBanPatient(true);

      const response: any = await banUserPatient({
        id: record.id,
      });

      var banPatientSuccess = response.data;

      var banPatientError = response.error;

      if (banPatientSuccess?.statusCode === 202 && !banPatientError) {
        const successMessage = banPatientSuccess?.message;

        setSuccessMessagePatient(successMessage);
        setShowSuccessMessagePatient(true);
      } else {
        const errorMessage = banPatientError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserPatient(errorMessage[0]));

          setShowErrorMessagePatient(true);
        }

        if (typeof errorMessage === "string") {
          dispatch(setErrorsUserPatient(errorMessage));

          setShowErrorMessagePatient(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllPatient();

      setIsSubmittingBanPatient(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllPatient();
  };

  const handleButtonClick = () => {
    setSuccessMessagePatient("");
    setShowSuccessMessagePatient(false);

    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <>
      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={patientErrorsState?.toString() || "¡Error en la petición!"}
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
          key={"custom-modal-request-details-patient"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllPatient();

            setIsModalVisibleLocalState(false);
            setIsEditPatientVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setDefaultValuesUserPatient());
          }}
          contentCustomModal={
            <>
              {!isEditPatientVisibleLocalState ? (
                <>
                  <ModalPatientDetails
                    titleDescription="Detalle completo de paciente Bonnadona"
                    labelPatientName="Nombre completo"
                    selectedPatientName={selectedRowDataLocalState?.name}
                    labelPatientIdType="Tipo de identificación"
                    selectedPatientIdType={getTagComponentIdTypes(
                      selectedRowDataLocalState?.user_id_type.toString()
                    )}
                    labelPatientIdNumber="Número de identificación"
                    selectedPatientIdNumber={
                      selectedRowDataLocalState?.id_number
                    }
                    labelPatientGender="Género"
                    selectedPatientGender={selectedRowDataLocalState?.user_gender.toString()}
                    labelPatientBirthdate="Fecha de nacimiento"
                    selectedPatientBirthdate={
                      selectedRowDataLocalState?.birthdate
                    }
                    labelPatientAffiliationEps="Afiliado a EPS"
                    selectedPatientAffiliationEps={
                      selectedRowDataLocalState?.affiliation_eps
                    }
                    labelPatientWhatsApp="WhatsApp"
                    selectedPatientWhatsApp={
                      selectedRowDataLocalState?.whatsapp || NOT_REGISTER
                    }
                    labelPatientCellphone="Número de celular"
                    selectedPatientCellphone={
                      selectedRowDataLocalState?.cellphone || NOT_REGISTER
                    }
                    labelPatientEmail="Email"
                    selectedPatientEmail={selectedRowDataLocalState?.email}
                    labelPatientResidenceAddress="Dirección de residencia"
                    selectedPatientResidenceAddress={
                      selectedRowDataLocalState?.residence_address
                    }
                    labelPatientRelatives="Familiares activos"
                    selectedPatientRelatives={<RelativesDetails />}
                  />

                  <Button
                    className="edit-patient-button"
                    size="large"
                    style={{
                      backgroundColor: "#015E90",
                      color: "#F7F7F7",
                      borderRadius: "31px",
                      paddingInline: "31px",
                      marginBlock: "13px",
                    }}
                    onClick={() => {
                      setIsEditPatientVisibleLocalState(true);
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
                      &nbsp; Editar paciente
                    </div>
                  </Button>
                </>
              ) : (
                <EditPatientsForm />
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
            <TotalPatients />

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllPatients({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBanPatient,
                idTypesData: idTypesData,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllPatientsContent;
