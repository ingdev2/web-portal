"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { IdType } from "../../../../../api/src/utils/enums/id_type.enum";

export const getTagComponentIdTypes = (statusName: string | undefined) => {
  switch (statusName) {
    case IdType.IDENTITY_CARD:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#F4D03FB2",
            label: "TARJETA DE IDENTIDAD",
          }}
        />
      );
    case IdType.CITIZENSHIP_CARD:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#137A2BB2",
            label: "CÉDULA DE CIUDADANÍA",
          }}
        />
      );
    case IdType.CIVIL_REGISTRATION:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#8C1111B2",
            label: "REGISTRO CIVIL",
          }}
        />
      );
    case IdType.ADULT_WITHOUT_IDENTIFICATION:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#BA3400B2",
            label: "MAYOR DE EDAD SIN IDENTIFICACIÓN",
          }}
        />
      );
    case IdType.MINOR_WITHOUT_IDENTIFICATION:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#9960B0B2",
            label: "MENOR DE EDAD SIN IDENTIFICACIÓN",
          }}
        />
      );
    case IdType.FOREIGNER_ID:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#DDDDDDB2",
            label: "CÉDULA DE EXTRANJERÍA",
          }}
        />
      );
    case IdType.PASSPORT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#34495EB2",
            label: "PASAPORTE",
          }}
        />
      );
    case IdType.SPECIAL_RESIDENCE_PERMIT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#8E44ADB2",
            label: "PERMISO ESPECIAL DE PERMANENCIA",
          }}
        />
      );
    case IdType.TEMPORARY_PROTECTION_PERMIT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: "PERMISO POR PROTECCIÓN TEMPORAL",
          }}
        />
      );
    default:
      return null;
  }
};
