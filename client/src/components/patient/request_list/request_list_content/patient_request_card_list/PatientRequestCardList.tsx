"use-client";

import React, { ReactNode } from "react";

import { Avatar, Button, Card, List, Space } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";

import { typesMap } from "./helpers/types_map";
import { getTagComponentType } from "./helpers/CustomTagsTypes";
import { statusMap } from "./helpers/status_map";
import { getTagComponentStatus } from "./helpers/CustomTagsStatus";

const PatientRequestCardList: React.FC<{
  requestCardListData: MedicalReq[];
  titleCardList: string;
  descriptionCardList1: string;
  descriptionCardList2: string;
  descriptionCardList3?: string;
  descriptionCardList4?: string;
  iconButtonDetails?: ReactNode;
  titleButtonDetails?: string;
  backgroundColorButtonDetails?: string;
  onClickButtonDetails?: () => void;
  iconButtonDelete?: ReactNode;
  titleButtonDelete?: string;
  backgroundColorButtonDelete?: string;
  onClickButtonDelete?: () => void;
}> = ({
  requestCardListData,
  titleCardList,
  descriptionCardList1,
  descriptionCardList2,
  descriptionCardList3,
  descriptionCardList4,
  iconButtonDetails,
  titleButtonDetails,
  backgroundColorButtonDetails,
  onClickButtonDetails,
  iconButtonDelete,
  titleButtonDelete,
  backgroundColorButtonDelete,
  onClickButtonDelete,
}) => {
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
      className="list-of-medical-reqs-cards"
      itemLayout="vertical"
      size="large"
      dataSource={requestCardListData}
      style={{ margin: "0px", padding: "0px" }}
      renderItem={(item) => (
        <Card
          key={"card-list-of-request"}
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
              title={`${titleCardList} ${item.filing_number}`}
              description={
                <Space size={"small"} direction="vertical">
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "31px",
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBlock: "2px",
                      }}
                    >
                      {descriptionCardList1}

                      {getTagComponentType(typeMapList[item.requirement_type])}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "31px",
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBlock: "2px",
                      }}
                    >
                      {descriptionCardList2}

                      {getTagComponentStatus(
                        statusMapList[item.requirement_status]
                      )}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "96px",
                        display: "flex",
                        flexFlow: "column wrap",
                        paddingBlock: "4px",
                      }}
                    >
                      {descriptionCardList3} <b>{item.date_of_admission}</b>
                      {descriptionCardList4}
                      <b>{item.answer_date || <b>En proceso de revisión</b>}</b>
                    </div>
                  </div>
                </Space>
              }
            />

            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "flex-end",
                padding: 0,
                margin: 0,
              }}
            >
              <Space size={"middle"}>
                <Button
                  size="middle"
                  style={{
                    backgroundColor: backgroundColorButtonDetails,
                    color: "#F7F7F7",
                  }}
                  onClick={onClickButtonDetails}
                  icon={iconButtonDetails}
                >
                  {titleButtonDetails}
                </Button>
                <Button
                  size="middle"
                  style={{
                    backgroundColor: backgroundColorButtonDelete,
                    color: "#F7F7F7",
                  }}
                  onClick={onClickButtonDelete}
                  icon={iconButtonDelete}
                >
                  {titleButtonDelete}
                </Button>
              </Space>
            </div>
          </List.Item>
        </Card>
      )}
      // footer={null}
      pagination={{
        align: "center",
        pageSize: 4,
      }}
    />
  );
};

export default PatientRequestCardList;
