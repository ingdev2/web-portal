"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { RequirementTypeEnum } from "@/utils/enums/requirement_type.enum";

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
    case RequirementTypeEnum.CERTIFICATE_OF_MEDICAL_DISABILITY:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#943126B2",
            label: RequirementTypeEnum.CERTIFICATE_OF_MEDICAL_DISABILITY,
          }}
        />
      );
    case RequirementTypeEnum.MIPRES_EXTERNAL_CONSULTATION:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#633671B2",
            label: RequirementTypeEnum.MIPRES_EXTERNAL_CONSULTATION,
          }}
        />
      );
    default:
      return null;
  }
};
