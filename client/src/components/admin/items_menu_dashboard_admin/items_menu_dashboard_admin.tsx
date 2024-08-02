import React from "react";

import { MenuProps, Badge } from "antd";
import { LuFileText } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";

import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  badgeCount?: number
): MenuItem {
  return {
    key,
    children,
    label,
    icon: badgeCount ? (
      <Badge
        count={badgeCount}
        offset={[-37, 7]}
        style={{
          justifyContent: "center",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          paddingTop: "3.1px",
        }}
      >
        {icon}
      </Badge>
    ) : (
      icon
    ),
  } as MenuItem;
}

export const useMenuItems = () => {
  const { data: allMedicalReqStatusCreatedData } =
    useGetAllMedicalReqUsersQuery(RequirementStatusEnum.CREATED);

  const items: MenuItem[] = [
    getItem(
      ItemNames.ITEM_REQUESTS,
      ItemKeys.ITEM_REQUESTS_KEY,
      <LuFileText />,
      [
        getItem(
          ItemNames.SUB_ALL_REQUESTS,
          ItemKeys.SUB_ALL_REQUESTS_REQ_KEY,
          <RiFileList3Line />,
          undefined,
          allMedicalReqStatusCreatedData?.length
        ),
        getItem(
          ItemNames.SUB_PATIENTS_REQ,
          ItemKeys.SUB_PATIENTS_REQ_KEY,
          <RiFileList3Line />,
          undefined,
          allMedicalReqStatusCreatedData?.length
        ),
        getItem(
          ItemNames.SUB_EPS_REQ,
          ItemKeys.SUB_EPS_REQ_KEY,
          <RiFileList3Line />
        ),
        getItem(
          ItemNames.SUB_RELATIVES_REQ,
          ItemKeys.SUB_RELATIVES_REQ_KEY,
          <RiFileList3Line />
        ),
      ]
    ),

    getItem(
      ItemNames.ITEM_USERS,
      ItemKeys.ITEM_USERS_KEY,
      <MenuFoldOutlined />,
      [
        getItem(
          ItemNames.SUB_ADMIN_USERS,
          ItemKeys.SUB_ADMIN_USERS_KEY,
          <MenuUnfoldOutlined />
        ),
        getItem(
          ItemNames.SUB_PATIENT_USERS,
          ItemKeys.SUB_PATIENT_USERS_KEY,
          <MenuUnfoldOutlined />
        ),
        getItem(
          ItemNames.SUB_RELATIVES_USERS,
          ItemKeys.SUB_RELATIVES_USERS_KEY,
          <MenuUnfoldOutlined />
        ),
      ]
    ),
  ];

  return items;
};
