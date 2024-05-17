"use client";

import React from "react";

import PatientDataCard from "./patient_data_card/PatientDataCard";
import HomepageOptions from "./homepage_options/HomepageOptions";

const PatientHomepageContent: React.FC = () => {
  return (
    <>
      <PatientDataCard />

      <HomepageOptions />
    </>
  );
};

export default PatientHomepageContent;
