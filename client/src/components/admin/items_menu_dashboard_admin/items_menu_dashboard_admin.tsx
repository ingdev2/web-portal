import React from "react";

import { MenuProps } from "antd";
import { LuFileText } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem(ItemNames.ITEM_REQUESTS, ItemKeys.ITEM_REQUESTS_KEY, <LuFileText />, [
    getItem(
      ItemNames.SUB_ALL_REQUESTS,
      ItemKeys.SUB_ALL_REQUESTS_REQ_KEY,
      <RiFileList3Line />
    ),
    getItem(
      ItemNames.SUB_PATIENTS_REQ,
      ItemKeys.SUB_PATIENTS_REQ_KEY,
      <RiFileList3Line />
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
  ]),

  getItem(ItemNames.ITEM_USERS, ItemKeys.ITEM_USERS_KEY, <MenuFoldOutlined />, [
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
  ]),
];
