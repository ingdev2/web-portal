"use-client";

import React, { useEffect, useState, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Avatar, Col, Row, Select, SelectProps } from "antd";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import FamiliarDetailsModal from "./familiar_details_content/FamiliarDetailsModal";
import CustomCardOptionsButtons from "@/components/common/custom_content_card/CustomCardOptionsButtons";
import CustomFilterBy from "@/components/common/custom_filter_by/CustomFilterBy";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import ListOfRelativesCards from "./list_of_relatives_cards/ListOfRelativesCards";
import { FcHighPriority } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { subtitleStyleCss } from "@/theme/text_styles";

import { setErrorsMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import { useLazyGetAllAuthorizedPatientRelativesQuery } from "@/redux/apis/users/usersApi";
import { useBanFamiliarMutation } from "@/redux/apis/relatives/relativesApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";

import { idTypeMap } from "@/helpers/id_type_map/id_type_map";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { relationshipsWithPatientMap } from "@/helpers/relationships_with_patient_map/relationships_with_patient_map";
import { getTagComponentRelationshipType } from "@/components/common/custom_tags_relationship_types/CustomTagsRelationshipTypes";
import { filterRelatives } from "./filters_relatives_card_list/filtered_relatives";
import { SortRelativesBy } from "./sortby_relatives_card_list/enums/select_sortby.enums";
import SortByRelatives from "./sortby_relatives_card_list/SortByRelatives";
import { sortRelatives } from "./sortby_relatives_card_list/sort_request_by_options";

const PatientRelativesCardList: React.FC<{
  relativesCardListData: Familiar[];
}> = ({ relativesCardListData }) => {
  const dispatch = useAppDispatch();

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const relativesErrorsState = useAppSelector((state) => state.familiar.errors);

  const [selectedFamiliarIdLocalState, setSelectedFamiliarIdLocalState] =
    useState("");
  const [selectedFamiliarNameLocalState, setSelectedFamiliarNameLocalState] =
    useState("");
  const [
    selectedFamiliarLastNameLocalState,
    setSelectedFamiliarLastNameLocalState,
  ] = useState("");
  const [
    selectedFamiliarIdTypeLocalState,
    setSelectedFamiliarIdTypeLocalState,
  ] = useState<ReactNode>(null);
  const [
    selectedFamiliarRelationshipWithPatientLocalState,
    setSelectedFamiliarRelationshipWithPatientLocalState,
  ] = useState<ReactNode>(null);
  const [
    selectedFamiliarIdNumberLocalState,
    setSelectedFamiliarIdNumberLocalState,
  ] = useState(0);
  const [selectedFamiliarEmailLocalState, setSelectedFamiliarEmailLocalState] =
    useState("");
  const [
    selectedFamiliarCellphoneLocalState,
    setSelectedFamiliarCellphoneLocalState,
  ] = useState(0);
  const [
    selectedFamiliarWhatsappLocalState,
    setSelectedFamiliarWhatsappLocalState,
  ] = useState(0);

  const [
    sortRelativesByOptionsLocalState,
    setSortRelativesByOptionsLocalState,
  ] = useState<SortRelativesBy>(SortRelativesBy.MOST_RECENT);
  const [
    filterRelationshipTypesLocalState,
    setFilterRelationshipTypesLocalState,
  ] = useState<number[]>([]);

  const [relationshipTypeLocalState, setRelationshipTypeLocalState] = useState<
    SelectProps["options"]
  >([]);

  const [modalOpenFamiliarDetails, setModalOpenFamiliarDetails] =
    useState(false);
  const [modalOpenDeleteFamiliar, setModalOpenDeleteFamiliar] = useState(false);

  const [isSubmittingDeletedFamiliar, setIsSubmittingDeletedFamiliar] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageRelatives, setShowErrorMessageMedicalReq] =
    useState(false);

  const [
    trigger,
    {
      data: userAllRelativesLazyData,
      isLoading: userAllRelativesLazyLoading,
      isFetching: userAllRelativesLazyFetching,
      error: userAllRelativesLazyError,
    },
  ] = useLazyGetAllAuthorizedPatientRelativesQuery({});

  const {
    data: idTypeData,
    isLoading: idTypeLoading,
    isFetching: idTypeFetching,
    error: idTypeError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: relationshipWithPatientTypeData,
    isLoading: relationshipWithPatientTypeLoading,
    isFetching: relationshipWithPatientTypeFetching,
    error: relationshipWithPatientTypeError,
  } = useGetAllRelationshipTypesQuery(null);

  const [deletedFamiliarPatient] = useBanFamiliarMutation({
    fixedCacheKey: "deletedFamiliarPatientData",
  });

  const idTypeMapList = idTypeMap(idTypeData || []);
  const relationshipTypeMapList = relationshipsWithPatientMap(
    relationshipWithPatientTypeData || []
  );

  useEffect(() => {
    if (
      relationshipWithPatientTypeData &&
      !relationshipWithPatientTypeLoading &&
      !relationshipWithPatientTypeFetching
    ) {
      const formattedRelationshipTypes = relationshipWithPatientTypeData.map(
        (type: any) => ({
          value: type.id,
          label: type.name,
        })
      );
      setRelationshipTypeLocalState(formattedRelationshipTypes);
    }

    if (relationshipWithPatientTypeError) {
      dispatch(
        setErrorsMedicalReq("¡No se pudo obtener los tipos de parentescos!"),
        setShowErrorMessageMedicalReq(true)
      );
    }
  }, [
    relationshipWithPatientTypeData,
    relationshipWithPatientTypeLoading,
    relationshipWithPatientTypeFetching,
    relationshipWithPatientTypeError,
  ]);

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingDeletedFamiliar(true);

      const response: any = await deletedFamiliarPatient({
        id: selectedFamiliarIdLocalState,
      });

      let isDeletedFamiliarError = response.error;

      let isDeletedFamiliarSuccess = response.data;

      if (isDeletedFamiliarError) {
        const errorMessage = isDeletedFamiliarError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsMedicalReq(errorMessage[0]));
          setShowErrorMessageMedicalReq(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsMedicalReq(errorMessage));
          setShowErrorMessageMedicalReq(true);
        }
      }

      if (isDeletedFamiliarSuccess) {
        trigger(idUserPatientState);
        setSuccessMessage(
          `Familiar ${selectedFamiliarNameLocalState} eliminado correctamente`
        );
        setShowSuccessMessage(true);
        setModalOpenDeleteFamiliar(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingDeletedFamiliar(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsMedicalReq([]));
    setShowErrorMessageMedicalReq(false);
  };

  const renderOptionsButtons = (item: Familiar) => (
    <CustomCardOptionsButtons
      backgroundColorButtonOptionDelete={"#8C1111"}
      onClickButtonOptionDelete={() => {
        setSelectedFamiliarIdLocalState(item.id);
        setSelectedFamiliarNameLocalState(item.name);
        setModalOpenDeleteFamiliar(true);
      }}
      iconButtonOptionDelete={<MdDeleteOutline size={17} />}
      titleButtonOptionDelete={"Eliminar"}
      backgroundColorButtonOptionDetails={"#015E90"}
      onClickButtonOptionDetails={() => {
        setSelectedFamiliarNameLocalState(item.name);
        setSelectedFamiliarLastNameLocalState(item.last_name);
        setSelectedFamiliarIdTypeLocalState(
          getTagComponentIdTypes(idTypeMapList[item.user_id_type])
        );
        setSelectedFamiliarRelationshipWithPatientLocalState(
          getTagComponentRelationshipType(
            relationshipTypeMapList[item.rel_with_patient]
          )
        );
        setSelectedFamiliarIdNumberLocalState(item.id_number);
        setSelectedFamiliarCellphoneLocalState(item.cellphone);
        setSelectedFamiliarEmailLocalState(item.email);
        setSelectedFamiliarWhatsappLocalState(item.whatsapp);
        setModalOpenFamiliarDetails(true);
      }}
      iconButtonOptionDetails={<FaRegEye size={17} />}
      titleButtonOptionDetails={"Ver detalles"}
    />
  );

  var filteredRequests = filterRelatives(
    relativesCardListData,
    filterRelationshipTypesLocalState
  );

  sortRelatives(filteredRequests, sortRelativesByOptionsLocalState);

  const handleOnChangeSelectSortBy = (value: SortRelativesBy) => {
    setSortRelativesByOptionsLocalState(value);
  };

  const handleRelationshipTypeSelectionChange = (
    selectedRelationshipType: number[]
  ) => {
    setFilterRelationshipTypesLocalState(selectedRelationshipType);
  };

  return (
    <>
      {showErrorMessageRelatives && (
        <CustomMessage
          typeMessage="error"
          message={relativesErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      {modalOpenFamiliarDetails && (
        <FamiliarDetailsModal
          modalOpenRequestDetailsModal={modalOpenFamiliarDetails}
          selectedFamiliarNameModal={selectedFamiliarNameLocalState}
          selectedFamiliarLastNameModal={selectedFamiliarLastNameLocalState}
          selectedFamiliarIdTypeModal={selectedFamiliarIdTypeLocalState}
          selectedFamiliarIdNumberModal={selectedFamiliarIdNumberLocalState}
          selectedFamiliarRelationshipWithPatientModal={
            selectedFamiliarRelationshipWithPatientLocalState
          }
          selectedFamiliarEmailModal={selectedFamiliarEmailLocalState}
          selectedFamiliarCellphoneModal={selectedFamiliarCellphoneLocalState}
          selectedFamiliarWhatsappModal={selectedFamiliarWhatsappLocalState}
          handleCancelFamiliarDetailsModal={() => {
            setModalOpenFamiliarDetails(false);
          }}
        />
      )}

      {modalOpenDeleteFamiliar && (
        <CustomModalTwoOptions
          openCustomModalState={modalOpenDeleteFamiliar}
          iconCustomModal={<FcHighPriority size={77} />}
          titleCustomModal="¿Deseas eliminar de la lista de autorizados a este familiar?"
          subtitleCustomModal={
            <p>
              Se va a eliminar el familiar con nombre:&nbsp;
              <b>{selectedFamiliarNameLocalState}</b>
            </p>
          }
          handleCancelCustomModal={() => {
            setModalOpenDeleteFamiliar(false);
          }}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingDeletedFamiliar}
          handleClickCustomModal={handleButtonClick}
        />
      )}

      <Row justify={"center"} align={"middle"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <SortByRelatives
            selectValueToSort={sortRelativesByOptionsLocalState}
            handleSelectSortBy={handleOnChangeSelectSortBy}
          />

          <Col
            xs={6}
            sm={4}
            md={4}
            lg={4}
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignContent: "flex-end",
              justifyContent: "center",
            }}
          >
            <h3
              className="title-filter-relatives"
              style={{
                ...subtitleStyleCss,
                color: "#0707077F",
                paddingInline: "7px",
              }}
            >
              Filtrar por:
            </h3>
          </Col>

          <Col xs={16} sm={14} md={14} lg={14}>
            <CustomFilterBy
              optionsToFilterLocalState={relationshipTypeLocalState}
              labelOptionToFilterLocalState={"Filtrar por parentesco"}
              onChange={handleRelationshipTypeSelectionChange}
              isLoading={
                relationshipWithPatientTypeLoading ||
                relationshipWithPatientTypeFetching
              }
            />
          </Col>
        </Col>
      </Row>

      <ListOfRelativesCards
        dataSourceList={filteredRequests}
        optionsButtonSectionListOfRequest={renderOptionsButtons}
      />
    </>
  );
};

export default PatientRelativesCardList;
