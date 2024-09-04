"use client";

import React from "react";

import PatientDataCard from "./patient_data_card/PatientDataCard";
import HomepageOptionsPatient from "./homepage_options/HomepageOptionsPatient";

const PatientHomepageContent: React.FC = () => {
  return (
    <>
      <PatientDataCard />

      <HomepageOptionsPatient />
    </>
  );
};

export default PatientHomepageContent;
