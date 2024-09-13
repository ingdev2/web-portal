"use client";

import React, { ReactNode } from "react";

import { Switch } from "antd";

const CustomSwitch: React.FC<{
  onChangeCustomSwitch: (value: any) => void;
  onClickCustomSwitch: () => void;
  checkedChildrenCustomSwitch: ReactNode;
  unCheckedChildrenCustomSwitch: ReactNode;
  isActiveCustomSwitch: boolean;
  isLoadingCustomSwitch: boolean;
}> = ({
  onChangeCustomSwitch,
  onClickCustomSwitch,
  checkedChildrenCustomSwitch,
  unCheckedChildrenCustomSwitch,
  isActiveCustomSwitch,
  isLoadingCustomSwitch,
}) => {
  return (
    <>
      <Switch
        size="default"
        checkedChildren={checkedChildrenCustomSwitch}
        unCheckedChildren={unCheckedChildrenCustomSwitch}
        onChange={onChangeCustomSwitch}
        onClick={onClickCustomSwitch}
        checked={isActiveCustomSwitch}
        loading={isLoadingCustomSwitch}
        defaultChecked
      />
    </>
  );
};

export default CustomSwitch;
