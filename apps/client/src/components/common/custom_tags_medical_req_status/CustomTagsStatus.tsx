"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { RequirementStatusEnum } from "shared/utils/enums/requirement_status.enum";

export const getTagComponentStatus = (statusName: string | undefined) => {
  switch (statusName) {
    case RequirementStatusEnum.CREATED:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#DDDDDDB2",
            label: RequirementStatusEnum.CREATED,
          }}
        />
      );
    case RequirementStatusEnum.VISUALIZED:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#9960B0B2",
            label: RequirementStatusEnum.VISUALIZED,
          }}
        />
      );
    case RequirementStatusEnum.UNDER_REVIEW:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#F4D03FB2",
            label: RequirementStatusEnum.UNDER_REVIEW,
          }}
        />
      );
    case RequirementStatusEnum.DELIVERED:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#137A2BB2",
            label: RequirementStatusEnum.DELIVERED,
          }}
        />
      );
    case RequirementStatusEnum.REJECTED:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#8C1111B2",
            label: RequirementStatusEnum.REJECTED,
          }}
        />
      );
    case RequirementStatusEnum.EXPIRED:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#BA3400B2",
            label: RequirementStatusEnum.EXPIRED,
          }}
        />
      );
    default:
      return null;
  }
};
