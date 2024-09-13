"use client";

import React from "react";

import FamiliarDataCard from "./patient_data_card/FamiliarDataCard";
import HomepageOptionsFamiliar from "./homepage_options/HomepageOptionsFamiliar";

const FamiliarHomepageContent: React.FC = () => {
  return (
    <>
      <FamiliarDataCard />

      <HomepageOptionsFamiliar />
    </>
  );
};

export default FamiliarHomepageContent;
