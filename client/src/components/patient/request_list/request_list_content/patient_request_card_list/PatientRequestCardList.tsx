"use-client";

import React, { ReactNode, useEffect } from "react";

import { Avatar, Button, Card, List, Space } from "antd";
import CustomTags from "../../../../common/custom_tags/CustomTags";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import { useGetMedicalReqTypeByIdQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";

import { RequirementStatusEnum } from "../../../../../../../api/src/medical_req/enums/requirement_status.enum";

const PatientRequestCardList: React.FC<{
  requestCardListData: MedicalReq[];
  titleCardList: string;
  descriptionCardList: string;
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
  descriptionCardList,
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
    data: userMedicalReqStatusData,
    isLoading: userMedicalReqStatusLoading,
    isFetching: userMedicalReqStatusFetching,
    error: userMedicalReqStatusError,
  } = useGetAllMedicalReqStatusQuery(null);

  const statusMap: { [key: number]: string } = {};
  userMedicalReqStatusData?.forEach((status: any) => {
    statusMap[status.id] = status.name;
  });

  const getTagComponentStatus = (statusName: string | undefined) => {
    switch (statusName) {
      case RequirementStatusEnum.UNDER_REVIEW:
        return (
          <CustomTags
            tag={{
              textColor: "#000000",
              color: "#F4D03F",
              label: "EN REVISIÓN",
            }}
          />
        );
      case RequirementStatusEnum.DELIVERED:
        return (
          <CustomTags
            tag={{
              textColor: "#F7F7F7",
              color: "#137A2B",
              label: "ENTREGADA",
            }}
          />
        );
      case RequirementStatusEnum.REJECTED:
        return (
          <CustomTags
            tag={{
              textColor: "#F7F7F7",
              color: "#8C1111",
              label: "RECHAZADA",
            }}
          />
        );
      case RequirementStatusEnum.EXPIRED:
        return (
          <CustomTags
            tag={{
              textColor: "#F7F7F7",
              color: "#BA3400",
              label: "EXPIRADA",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <List
      className="list-of-medical-reqs-cards"
      itemLayout="vertical"
      size="large"
      dataSource={requestCardListData}
      renderItem={(item) => (
        <Card
          key={"card-list-of-request"}
          style={{
            width: "100%",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            marginBottom: "13px",
          }}
        >
          <List.Item
            key={item.id}
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "flex-end",
              padding: "0px",
              margin: "0px",
            }}
            actions={[
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
              </Space>,
            ]}
            extra={null}
          >
            <List.Item.Meta
              style={{
                padding: "0px 7px",
                margin: "0px 0px",
              }}
              // avatar={<Avatar src={item.avatar} />}
              key={item.id}
              title={`${titleCardList} ${item.filing_number}`}
              description={`${descriptionCardList} ${item.date_of_admission}`}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row wrap",
                paddingTop: "7px",
                justifyContent: "center",
              }}
            >
              {getTagComponentStatus(statusMap[item.requirement_status])}
            </div>
          </List.Item>
        </Card>
      )}
      footer={null}
      pagination={{
        align: "center",
        pageSize: 4,
      }}
    />
  );
};

export default PatientRequestCardList;
