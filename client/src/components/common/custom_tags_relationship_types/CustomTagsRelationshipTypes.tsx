"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { RelationshipWithPatient } from "../../../../../api/src/medical_req/enums/relationship_with_patient.enum";

export const getTagComponentRelationshipType = (
  typeName: string | undefined
) => {
  switch (typeName) {
    case RelationshipWithPatient.PARENT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "PADRE/MADRE",
          }}
        />
      );
    case RelationshipWithPatient.BROTHER:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "HERMANO(A)",
          }}
        />
      );
    case RelationshipWithPatient.SON:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "HIJO(A)",
          }}
        />
      );
    case RelationshipWithPatient.FAMILIAR:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "FAMILIAR",
          }}
        />
      );
    case RelationshipWithPatient.SPOUSE:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "ESPOSO(A)",
          }}
        />
      );
    default:
      return null;
  }
};
