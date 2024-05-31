import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { RequirementTypeEnum } from "../../../../../api/src/medical_req/enums/requirement_type.enum";

export const getTagComponentType = (typeName: string | undefined) => {
  switch (typeName) {
    case RequirementTypeEnum.CLINIC_HISTORY:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "HISTORIA CLÍNICA",
          }}
        />
      );
    case RequirementTypeEnum.MEDICAL_RESULTS:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "RESULTADOS MÉDICOS",
          }}
        />
      );
    case RequirementTypeEnum.MEDICAL_ORDER:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "ORDEN MÉDICA",
          }}
        />
      );
    case RequirementTypeEnum.MEDICAL_DISABILITY:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "INCAPACIDAD MÉDICA",
          }}
        />
      );
    default:
      return null;
  }
};
