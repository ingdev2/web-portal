"use client";

import React from "react";

import EpsDataCard from "./patient_data_card/EpsDataCard";
import HomepageOptionsEps from "./homepage_options/HomepageOptionsEps";

const EpsHomepageContent: React.FC = () => {
  return (
    <>
      <EpsDataCard />

      <HomepageOptionsEps />
    </>
  );
};

export default EpsHomepageContent;
