"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditPatientsFormData from "./EditPatientsFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdUserPatient,
  setCellphoneUserPatient,
  setWhatsappUserPatient,
  setEmailUserPatient,
  setResidenceAddressUserPatient,
  setErrorsUserPatient,
} from "@/redux/features/patient/patientSlice";

import {
  useGetUserByIdNumberPatientQuery,
  useUpdateUserPatientMutation,
} from "@/redux/apis/users/usersApi";

const EditPatientsForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idPatientState = useAppSelector((state) => state.patient.id);
  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypeNamePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const cellphonePatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const whatsappPatientState = useAppSelector(
    (state) => state.patient.whatsapp
  );
  const emailPatientState = useAppSelector((state) => state.patient.email);
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const residenceAddressPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );

  const patientErrorsState = useAppSelector((state) => state.patient.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [countryCode, setCountryCode] = useState(0);
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  var fullCellphoneNumber = `${countryCode}${areaCode}${phoneNumber}`;

  const [countryCodeWhatsApp, setCountryCodeWhatsApp] = useState(0);
  const [areaCodeWhatsApp, setAreaCodeWhatsApp] = useState("");
  const [phoneNumberWhatsApp, setPhoneNumberWhatsApp] = useState("");

  var fullWhatsAppNumber = `${countryCodeWhatsApp}${areaCodeWhatsApp}${phoneNumberWhatsApp}`;

  const [emailPatientLocalState, setEmailPatientLocalState] = useState("");
  const [
    residenceAddressPatientLocalState,
    setResidenceAddressPatientLocalState,
  ] = useState("");

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: patientData,
    isLoading: patientLoading,
    isFetching: patientFetching,
    error: patientError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  const [
    updatePatientData,
    {
      data: updatePatientPersonalData,
      isLoading: updatePatientLoading,
      isSuccess: updatePatientSuccess,
      isError: updatePatientError,
    },
  ] = useUpdateUserPatientMutation({
    fixedCacheKey: "updatePatientData",
  });

  useEffect(() => {
    if (patientData && !idPatientState && !patientLoading && !patientFetching) {
      dispatch(setIdUserPatient(patientData.id));
    }
  }, [patientData, idPatientState, fullCellphoneNumber, fullWhatsAppNumber]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updatePatientData({
        id: idPatientState,
        updateUser: {
          cellphone: parseInt(fullCellphoneNumber, 10) || cellphonePatientState,
          whatsapp: parseInt(fullWhatsAppNumber, 10) || whatsappPatientState,
          email: emailPatientLocalState || emailPatientState,
          residence_address:
            residenceAddressPatientLocalState || residenceAddressPatientState,
        },
      });

      var editPatientDataError = response.error;

      var editPatientDataStatus = response.data.status;

      var editPatientDataValidationData = response.data?.message;

      if (editPatientDataError || editPatientDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editPatientDataError?.data.message;
        const validationDataMessage = editPatientDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserPatient(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUserPatient(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUserPatient(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsUserPatient(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editPatientDataStatus === 202 && !editPatientDataError) {
        setHasChanges(false);

        dispatch(
          setCellphoneUserPatient(
            parseInt(fullCellphoneNumber, 10) || cellphonePatientState
          )
        );
        dispatch(
          setWhatsappUserPatient(
            parseInt(fullWhatsAppNumber, 10) || whatsappPatientState
          )
        );
        dispatch(
          setEmailUserPatient(emailPatientLocalState || emailPatientState)
        );
        dispatch(
          setResidenceAddressUserPatient(
            residenceAddressPatientLocalState || residenceAddressPatientState
          )
        );

        setSuccessMessage("¡Datos del Paciente actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
      setEmailPatientLocalState("");
    }
  };

  const handlePhoneInputChange = (value: any) => {
    setHasChanges(true);

    if (value) {
      setCountryCode(value.countryCode || 0);
      setAreaCode(value.areaCode || "");
      setPhoneNumber(value.phoneNumber || "");
    }
  };

  const combinePhoneDetails = () => {
    return `${areaCode}${phoneNumber}`;
  };

  const validatorCellphoneInput = (_: any, value: any) => {
    const combinedPhone = combinePhoneDetails();

    if (!combinedPhone) {
      return Promise.resolve();
    }

    const phonePattern = /^[0-9]+$/;

    if (
      phonePattern.test(combinedPhone) &&
      combinedPhone.length >= 7 &&
      combinedPhone.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de teléfono inválido");
  };

  const handleWhatsappInputChange = (value: any) => {
    setHasChanges(true);

    if (value) {
      setCountryCodeWhatsApp(value.countryCode || 0);
      setAreaCodeWhatsApp(value.areaCode || "");
      setPhoneNumberWhatsApp(value.phoneNumber || "");
    }
  };

  const combineWhatsappDetails = () => {
    return `${areaCodeWhatsApp}${phoneNumberWhatsApp}`;
  };

  const validatorWhatsappInput = (_: any, value: any) => {
    const combinedWhatsapp = combineWhatsappDetails();

    if (!combinedWhatsapp) {
      return Promise.resolve();
    }

    const whatsappPattern = /^[0-9]+$/;

    if (
      whatsappPattern.test(combinedWhatsapp) &&
      combinedWhatsapp.length >= 7 &&
      combinedWhatsapp.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de WhatsApp inválido");
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={patientErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditPatientsFormData
        nameAdminFormData={namePatientState || NOT_REGISTER}
        idTypeNameAdminFormData={
          idTypeNamePatientState.toString() || NOT_REGISTER
        }
        idNumberAdminFormData={idNumberPatientState || NOT_REGISTER}
        cellphonePatientFormData={cellphonePatientState.toString()}
        onChangeCellphonePatientFormData={handlePhoneInputChange}
        validatorCellphoneInputFormData={validatorCellphoneInput}
        whatsappPatientFormData={
          (whatsappPatientState && whatsappPatientState.toString()) || undefined
        }
        onChangeWhatsappPatientFormData={handleWhatsappInputChange}
        validatorWhatsappInputFormData={validatorWhatsappInput}
        emailEditAdminFormData={emailPatientState || NOT_REGISTER}
        onChangeEmailEditAdminFormData={(e) => {
          setHasChanges(true);

          setEmailPatientLocalState(e.target.value.toLowerCase());
        }}
        residenceAddressEditAdminFormData={
          residenceAddressPatientState || NOT_REGISTER
        }
        onChangeResidenceAddressEditAdminFormData={(e) => {
          setHasChanges(true);

          setResidenceAddressPatientLocalState(e.target.value.toUpperCase());
        }}
        handleConfirmEditAdminFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-patient-name": namePatientState || NOT_REGISTER,
          "edit-patient-id-types": idTypeNamePatientState || NOT_REGISTER,
          "edit-patient-id-number": idNumberPatientState || NOT_REGISTER,
          "edit-patient-cellphone": cellphonePatientState || NOT_REGISTER,
          "edit-patient-whatsapp": whatsappPatientState || NOT_REGISTER,
          "edit-patient-email": emailPatientState || NOT_REGISTER,
          "edit-patient-residence-address":
            residenceAddressPatientState || NOT_REGISTER,
        }}
        isSubmittingEditAdminFormData={isSubmittingUpdatePersonalData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditPatientsForm;
