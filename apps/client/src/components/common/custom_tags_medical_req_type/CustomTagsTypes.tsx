"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { RequirementTypeEnum } from "shared/utils/enums/requirement_type.enum";

export const getTagComponentType = (typeName: string | undefined) => {
  switch (typeName) {
    case RequirementTypeEnum.CLINIC_HISTORY:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: RequirementTypeEnum.CLINIC_HISTORY,
          }}
        />
      );

    case RequirementTypeEnum.MEDICAL_ORDER:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#34495EB2",
            label: RequirementTypeEnum.MEDICAL_ORDER,
          }}
        />
      );
    case RequirementTypeEnum.MEDICAL_DISABILITY:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#BA3400B2",
            label: RequirementTypeEnum.MEDICAL_DISABILITY,
          }}
        />
      );
    default:
      return null;
  }
};
