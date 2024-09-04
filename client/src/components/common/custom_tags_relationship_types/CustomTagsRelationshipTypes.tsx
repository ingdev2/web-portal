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
            label: RelationshipWithPatient.PARENT,
          }}
        />
      );
    case RelationshipWithPatient.BROTHER:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: RelationshipWithPatient.BROTHER,
          }}
        />
      );
    case RelationshipWithPatient.SON:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: RelationshipWithPatient.SON,
          }}
        />
      );
    case RelationshipWithPatient.FAMILIAR:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: RelationshipWithPatient.FAMILIAR,
          }}
        />
      );
    case RelationshipWithPatient.SPOUSE:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: RelationshipWithPatient.SPOUSE,
          }}
        />
      );
    default:
      return null;
  }
};
