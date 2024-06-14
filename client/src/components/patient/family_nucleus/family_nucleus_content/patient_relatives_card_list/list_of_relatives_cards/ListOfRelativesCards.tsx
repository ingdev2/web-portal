"use client";

import React, { ReactNode } from "react";

import { Card, List } from "antd";
import CustomCardDescription from "@/components/common/custom_content_card/CustomCardDescription";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { getTagComponentRelationshipType } from "@/components/common/custom_tags_relationship_types/CustomTagsRelationshipTypes";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";

import { idTypeMap } from "@/helpers/id_type_map/id_type_map";
import { relationshipsWithPatientMap } from "@/helpers/relationships_with_patient_map/relationships_with_patient_map";

const ListOfRelativesCards: React.FC<{
  dataSourceList: Familiar[];
  optionsButtonSectionListOfRequest: (item: Familiar) => ReactNode;
}> = ({ dataSourceList, optionsButtonSectionListOfRequest }) => {
  const {
    data: relationshipWithPatientTypeData,
    isLoading: relationshipWithPatientTypeLoading,
    isFetching: relationshipWithPatientTypeFetching,
    error: relationshipWithPatientTypeError,
  } = useGetAllRelationshipTypesQuery(null);

  const {
    data: idTypeData,
    isLoading: idTypeLoading,
    isFetching: idTypeFetching,
    error: idTypeError,
  } = useGetAllIdTypesQuery(null);

  const relationshipTypeMapList = relationshipsWithPatientMap(
    relationshipWithPatientTypeData || []
  );
  const idTypeMapList = idTypeMap(idTypeData || []);

  return (
    <List
      className="list-of-relatives-cards"
      itemLayout="vertical"
      size="large"
      dataSource={dataSourceList}
      style={{ margin: "0px", padding: "0px" }}
      renderItem={(item) => (
        <Card
          key={"card-list-of-relatives"}
          style={{
            display: "flex",
            flexFlow: "column wrap",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "0px 0px",
            margin: "13px 0px",
          }}
        >
          <List.Item
            key={item.id}
            style={{
              padding: "0px 0px",
              margin: "0px 0px",
            }}
            // actions={[null]}
            // extra={null}
          >
            <List.Item.Meta
              style={{
                padding: "7px 0px",
                margin: "0px 0px",
              }}
              // avatar={<Avatar src={item.avatar} />}
              key={item.id}
              title={`Nombre de familiar: ${item.name}`}
              description={
                <CustomCardDescription
                  descriptionCard1={"Tipo de parentesco:"}
                  tagComponentCard1={getTagComponentRelationshipType(
                    relationshipTypeMapList[item.rel_with_patient]
                  )}
                  descriptionCard2={"Tipo de identificación:"}
                  tagComponentCard2={getTagComponentIdTypes(
                    idTypeMapList[item.user_id_type]
                  )}
                  descriptionCard3={"Número de identificación:"}
                  itemCard1={item.id_number}
                  descriptionCard4={"Número de celular:"}
                  itemCard2={item.cellphone}
                />
              }
            />
            {optionsButtonSectionListOfRequest(item)}
          </List.Item>
        </Card>
      )}
      // footer={null}
      pagination={{
        pageSize: 4,
        align: "center",
        position: "both",
      }}
    />
  );
};

export default ListOfRelativesCards;
