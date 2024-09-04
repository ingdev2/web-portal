"use client";

import React, { ReactNode } from "react";

import { Card, List } from "antd";
import CustomCardDescription from "@/components/common/custom_content_card/CustomCardDescription";
import { getTagComponentType } from "@/components/common/custom_tags_medical_req_type/CustomTagsTypes";
import { getTagComponentStatus } from "@/components/common/custom_tags_medical_req_status/CustomTagsStatus";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";

import { formatFilingNumber } from "@/helpers/format_filing_number/format_filing_number";
import { typesMap } from "@/helpers/medical_req_type_map/types_map";
import { statusMap } from "@/helpers/medical_req_status_map/status_map";

const FamiliarListOfRequestsCards: React.FC<{
  dataSourceList: MedicalReq[];
  optionsButtonSectionListOfRequest: (item: MedicalReq) => ReactNode;
}> = ({ dataSourceList, optionsButtonSectionListOfRequest }) => {
  const {
    data: userMedicalReqTypeData,
    isLoading: userMedicalReqTypeLoading,
    isFetching: userMedicalReqTypeFetching,
    error: userMedicalReqTypeError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: userMedicalReqStatusData,
    isLoading: userMedicalReqStatusLoading,
    isFetching: userMedicalReqStatusFetching,
    error: userMedicalReqStatusError,
  } = useGetAllMedicalReqStatusQuery(null);

  const typeMapList = typesMap(userMedicalReqTypeData || []);
  const statusMapList = statusMap(userMedicalReqStatusData || []);

  return (
    <List
      className="list-of-medical-reqs-cards-familiar"
      itemLayout="vertical"
      size="large"
      dataSource={dataSourceList}
      style={{ margin: "0px", padding: "0px" }}
      renderItem={(item) => (
        <Card
          key={"card-list-of-request-familiar"}
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
              title={`N° Radicado: ${formatFilingNumber(item.filing_number)}`}
              description={
                <CustomCardDescription
                  descriptionCard1={"Tipo de solicitud:"}
                  tagComponentCard1={getTagComponentType(
                    typeMapList[item.requirement_type]
                  )}
                  descriptionCard2={"Estado de solicitud:"}
                  tagComponentCard2={getTagComponentStatus(
                    statusMapList[item.requirement_status]
                  )}
                  descriptionCard3={"Fecha de solicitud:"}
                  itemCard1={<b>{item.date_of_admission}</b>}
                  descriptionCard4={"Fecha de respuesta:"}
                  itemCard2={
                    <b>
                      {item.answer_date || (
                        <b style={{ color: "#960202" }}>
                          En proceso de revisión
                        </b>
                      )}
                    </b>
                  }
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

export default FamiliarListOfRequestsCards;
