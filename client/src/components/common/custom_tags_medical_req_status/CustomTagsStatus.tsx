"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { RequirementStatusEnum } from "../../../../../api/src/medical_req/enums/requirement_status.enum";

export const getTagComponentStatus = (statusName: string | undefined) => {
  switch (statusName) {
    case RequirementStatusEnum.UNDER_REVIEW:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#F4D03FB2",
            label: "EN REVISIÓN",
          }}
        />
      );
    case RequirementStatusEnum.DELIVERED:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#137A2BB2",
            label: "ENTREGADA",
          }}
        />
      );
    case RequirementStatusEnum.REJECTED:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#8C1111B2",
            label: "RECHAZADA",
          }}
        />
      );
    case RequirementStatusEnum.EXPIRED:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#BA3400B2",
            label: "EXPIRADA",
          }}
        />
      );
    default:
      return null;
  }
};
