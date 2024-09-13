import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MedicalReq = {
  id: "",
  filing_number: "",
  requirement_type: 0,
  registration_dates: "",
  right_petition: false,
  copy_right_petition: [],
  files_copy_right_petition: [],
  medicalReqUserType: 0,
  familiar_id: "",
  aplicantId: "",
  patient_class_status: 0,
  patient_class_status_abbrev: "",
  relationship_with_patient: 0,
  patient_name: "",
  patient_id_type: 0,
  patient_id_number: 0,
  aplicant_name: "",
  aplicant_last_name: "",
  aplicant_gender: 0,
  aplicant_id_type: 0,
  aplicant_id_number: 0,
  aplicant_email: "",
  aplicant_cellphone: 0,
  aplicant_eps_company: 0,
  aplicant_company_area: 0,
  copy_applicant_identification_document: [],
  files_copy_applicant_identification_document: [],
  copy_patient_citizenship_card: [],
  files_copy_patient_citizenship_card: [],
  copy_patient_civil_registration: [],
  files_copy_patient_civil_registration: [],
  copy_parents_citizenship_card: [],
  files_copy_parents_citizenship_card: [],
  copy_marriage_certificate: [],
  files_copy_marriage_certificate: [],
  copy_cohabitation_certificate: [],
  files_copy_cohabitation_certificate: [],
  date_of_admission: "",
  answer_date: "",
  download_expiration_date: "",
  is_deleted: false,
  currently_in_area: 0,
  area_redirection_message: "",
  requirement_status: 0,
  user_message: "",
  have_user_message_documents: false,
  user_message_documents: [],
  files_user_message_documents: [],
  response_comments: "",
  motive_for_rejection: [],
  documents_delivered: [],
  files_documents_delivered: [],
  response_time: "",
  delegate_id: "",
  typesMedicalReq: [],
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  errors: [],
};

export const medicalReqSlice = createSlice({
  name: "medicalReq",
  initialState,
  reducers: {
    setIdMedicalReq: (state, action) => {
      state.id = action.payload;
    },
    setFilingNumberMedicalReq: (state, action) => {
      state.filing_number = action.payload;
    },
    setReqTypeMedicalReq: (state, action) => {
      state.requirement_type = action.payload;
    },
    setRegistrationDatesMedicalReq: (state, action) => {
      state.registration_dates = action.payload;
    },
    setRightPetitionMedicalReq: (state, action) => {
      state.right_petition = action.payload;
    },
    setCopyRightPetitionMedicalReq: (state, action) => {
      state.copy_right_petition = action.payload;
    },
    setFileCopyRightPetitionMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_right_petition = action.payload;
    },
    removeFileCopyRightPetitionMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_right_petition = state.files_copy_right_petition.filter(
        (file) => file.originalname !== action.payload
      );
    },
    setMedicalReqUserTypeMedicalReq: (state, action) => {
      state.medicalReqUserType = action.payload;
    },
    setFamiliarIdMedicalReq: (state, action) => {
      state.familiar_id = action.payload;
    },
    setAplicantIdMedicalReq: (state, action) => {
      state.aplicantId = action.payload;
    },
    setPatientClassStatusMedicalReq: (state, action) => {
      state.patient_class_status = action.payload;
    },
    setPatientClassStatusAbbrevMedicalReq: (state, action) => {
      state.patient_class_status_abbrev = action.payload;
    },
    setRelationShipWithPatientMedicalReq: (state, action) => {
      state.relationship_with_patient = action.payload;
    },
    setPatientNameMedicalReq: (state, action) => {
      state.patient_name = action.payload;
    },
    setPatientIdTypeMedicalReq: (state, action) => {
      state.patient_id_type = action.payload;
    },
    setPatientIdNumberMedicalReq: (state, action) => {
      state.patient_id_number = action.payload;
    },
    setAplicantNameMedicalReq: (state, action) => {
      state.aplicant_name = action.payload;
    },
    setAplicantLastNameMedicalReq: (state, action) => {
      state.aplicant_last_name = action.payload;
    },
    setAplicantGenderMedicalReq: (state, action) => {
      state.aplicant_gender = action.payload;
    },
    setAplicantIdTypeMedicalReq: (state, action) => {
      state.aplicant_id_type = action.payload;
    },
    setAplicantIdNumberMedicalReq: (state, action) => {
      state.aplicant_id_number = action.payload;
    },
    setAplicantEmailMedicalReq: (state, action) => {
      state.aplicant_email = action.payload;
    },
    setAplicantCellphoneMedicalReq: (state, action) => {
      state.aplicant_cellphone = action.payload;
    },
    setAplicantEpsCompanyMedicalReq: (state, action) => {
      state.aplicant_eps_company = action.payload;
    },
    setAplicantCompanyAreaMedicalReq: (state, action) => {
      state.aplicant_company_area = action.payload;
    },
    setCopyApplicantIdentificationDocumentMedicalReq: (state, action) => {
      state.copy_applicant_identification_document = action.payload;
    },
    setFileCopyApplicantIdentificationDocumentMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_applicant_identification_document = action.payload;
    },
    removeFileCopyApplicantIdentificationDocumentMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_applicant_identification_document =
        state.files_copy_applicant_identification_document.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setCopyPatientCitizenshipCardMedicalReq: (state, action) => {
      state.copy_patient_citizenship_card = action.payload;
    },
    setFileCopyPatientCitizenshipCardMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_patient_citizenship_card = action.payload;
    },
    removeFileCopyPatientCitizenshipCardMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_patient_citizenship_card =
        state.files_copy_patient_citizenship_card.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setCopyPatientCivilRegistrationMedicalReq: (state, action) => {
      state.copy_patient_civil_registration = action.payload;
    },
    setFileCopyPatientCivilRegistrationMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_patient_civil_registration = action.payload;
    },
    removeFileCopyPatientCivilRegistrationMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_patient_civil_registration =
        state.files_copy_patient_civil_registration.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setCopyParentsCitizenshipCardMedicalReq: (state, action) => {
      state.copy_parents_citizenship_card = action.payload;
    },
    setFileCopyParentsCitizenshipCardMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_parents_citizenship_card = action.payload;
    },
    removeFileCopyParentsCitizenshipCardMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_parents_citizenship_card =
        state.files_copy_parents_citizenship_card.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setCopyMarriageCertificateMedicalReq: (state, action) => {
      state.copy_marriage_certificate = action.payload;
    },
    setFileCopyMarriageCertificateMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_marriage_certificate = action.payload;
    },
    removeFileCopyMarriageCertificateMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_marriage_certificate =
        state.files_copy_marriage_certificate.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setCopyCohabitationCertificateMedicalReq: (state, action) => {
      state.copy_cohabitation_certificate = action.payload;
    },
    setFileCopyCohabitationCertificateMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_copy_cohabitation_certificate = action.payload;
    },
    removeFileCopyCohabitationCertificateMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_copy_cohabitation_certificate =
        state.files_copy_cohabitation_certificate.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setDateOfAdmissionMedicalReq: (state, action) => {
      state.date_of_admission = action.payload;
    },
    setAnswerDateMedicalReq: (state, action) => {
      state.answer_date = action.payload;
    },
    setDownloadExpirationDateMedicalReq: (state, action) => {
      state.download_expiration_date = action.payload;
    },
    setIsDeletedMedicalReq: (state, action) => {
      state.is_deleted = action.payload;
    },
    setCurrentlyInAreaMedicalReq: (state, action) => {
      state.currently_in_area = action.payload;
    },
    setAreaRedirectionMessageMedicalReq: (state, action) => {
      state.area_redirection_message = action.payload;
    },
    setRequirementStatusMedicalReq: (state, action) => {
      state.requirement_status = action.payload;
    },
    setUserMessageMedicalReq: (state, action) => {
      state.user_message = action.payload;
    },
    setHaveUserMessageMedicalReq: (state, action) => {
      state.have_user_message_documents = action.payload;
    },
    setDocsUserMessageMedicalReq: (state, action) => {
      state.user_message_documents = action.payload;
    },
    setFileUserMessageMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_user_message_documents = action.payload;
    },
    removeFileUserMessageMessageMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_user_message_documents =
        state.files_user_message_documents.filter(
          (file) => file.originalname !== action.payload
        );
    },
    setResponseCommentsMedicalReq: (state, action) => {
      state.response_comments = action.payload;
    },
    setMotiveForRejectionMedicalReq: (state, action) => {
      state.motive_for_rejection = action.payload;
    },
    setDocumentsDeliveredMedicalReq: (state, action) => {
      state.documents_delivered = action.payload;
    },
    setFileDocumentsDeliveredMedicalReq: (
      state,
      action: PayloadAction<Array<Express.Multer.File>>
    ) => {
      state.files_documents_delivered = action.payload;
    },
    removeFileDocumentsDeliveredMedicalReq: (
      state,
      action: PayloadAction<string>
    ) => {
      state.files_documents_delivered = state.files_documents_delivered.filter(
        (file) => file.originalname !== action.payload
      );
    },
    setResponseTimeMedicalReq: (state, action) => {
      state.response_time = action.payload;
    },
    setDelegateIdMedicalReq: (state, action) => {
      state.delegate_id = action.payload;
    },
    setErrorsMedicalReq: (state, action) => {
      state.errors = action.payload;
    },
    setTypesMedicalReq: (state, action) => {
      state.typesMedicalReq = action.payload;
    },
    setCreatedAtMedicalReq: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdatedAtMedicalReq: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeletedAtMedicalReq: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesMedicalReq: (state) => {
      state.id = "";
      state.filing_number = "";
      state.requirement_type = 0;
      state.right_petition = false;
      state.copy_right_petition = [];
      state.files_copy_right_petition = [];
      state.medicalReqUserType = 0;
      state.familiar_id = "";
      state.aplicantId = "";
      state.patient_class_status = 0;
      state.patient_class_status_abbrev = "";
      state.relationship_with_patient = 0;
      state.patient_name = "";
      state.patient_id_type = 0;
      state.patient_id_number = 0;
      state.aplicant_name = "";
      state.aplicant_last_name = "";
      state.aplicant_gender = 0;
      state.aplicant_id_type = 0;
      state.aplicant_id_number = 0;
      state.aplicant_email = "";
      state.aplicant_cellphone = 0;
      state.aplicant_eps_company = 0;
      state.aplicant_company_area = 0;
      state.copy_applicant_identification_document = [];
      state.files_copy_applicant_identification_document = [];
      state.copy_patient_citizenship_card = [];
      state.files_copy_patient_citizenship_card = [];
      state.copy_patient_civil_registration = [];
      state.files_copy_patient_civil_registration = [];
      state.copy_parents_citizenship_card = [];
      state.files_copy_parents_citizenship_card = [];
      state.copy_marriage_certificate = [];
      state.files_copy_marriage_certificate = [];
      state.copy_cohabitation_certificate = [];
      state.files_copy_cohabitation_certificate = [];
      state.date_of_admission = "";
      state.answer_date = "";
      state.download_expiration_date = "";
      state.is_deleted = false;
      state.currently_in_area = 0;
      state.requirement_status = 0;
      state.user_message = "";
      state.user_message_documents = [];
      state.files_user_message_documents = [];
      state.response_comments = "";
      state.motive_for_rejection = [];
      state.documents_delivered = [];
      state.files_documents_delivered = [];
      state.delegate_id = "";
      state.errors = [];
    },
  },
});

export const {
  setIdMedicalReq,
  setFilingNumberMedicalReq,
  setRegistrationDatesMedicalReq,
  setReqTypeMedicalReq,
  setRightPetitionMedicalReq,
  setCopyRightPetitionMedicalReq,
  setFileCopyRightPetitionMedicalReq,
  removeFileCopyRightPetitionMedicalReq,
  setMedicalReqUserTypeMedicalReq,
  setFamiliarIdMedicalReq,
  setAplicantIdMedicalReq,
  setPatientClassStatusMedicalReq,
  setPatientClassStatusAbbrevMedicalReq,
  setRelationShipWithPatientMedicalReq,
  setPatientNameMedicalReq,
  setPatientIdTypeMedicalReq,
  setPatientIdNumberMedicalReq,
  setAplicantNameMedicalReq,
  setAplicantLastNameMedicalReq,
  setAplicantGenderMedicalReq,
  setAplicantIdTypeMedicalReq,
  setAplicantIdNumberMedicalReq,
  setAplicantEmailMedicalReq,
  setAplicantCellphoneMedicalReq,
  setAplicantEpsCompanyMedicalReq,
  setAplicantCompanyAreaMedicalReq,
  setCopyApplicantIdentificationDocumentMedicalReq,
  setFileCopyApplicantIdentificationDocumentMedicalReq,
  removeFileCopyApplicantIdentificationDocumentMedicalReq,
  setCopyPatientCitizenshipCardMedicalReq,
  setFileCopyPatientCitizenshipCardMedicalReq,
  removeFileCopyPatientCitizenshipCardMedicalReq,
  setCopyPatientCivilRegistrationMedicalReq,
  setFileCopyPatientCivilRegistrationMedicalReq,
  removeFileCopyPatientCivilRegistrationMedicalReq,
  setCopyParentsCitizenshipCardMedicalReq,
  setFileCopyParentsCitizenshipCardMedicalReq,
  removeFileCopyParentsCitizenshipCardMedicalReq,
  setCopyMarriageCertificateMedicalReq,
  setFileCopyMarriageCertificateMedicalReq,
  removeFileCopyMarriageCertificateMedicalReq,
  setCopyCohabitationCertificateMedicalReq,
  setFileCopyCohabitationCertificateMedicalReq,
  removeFileCopyCohabitationCertificateMedicalReq,
  setDateOfAdmissionMedicalReq,
  setAnswerDateMedicalReq,
  setDownloadExpirationDateMedicalReq,
  setIsDeletedMedicalReq,
  setCurrentlyInAreaMedicalReq,
  setAreaRedirectionMessageMedicalReq,
  setRequirementStatusMedicalReq,
  setUserMessageMedicalReq,
  setHaveUserMessageMedicalReq,
  setDocsUserMessageMedicalReq,
  setFileUserMessageMedicalReq,
  removeFileUserMessageMessageMedicalReq,
  setResponseCommentsMedicalReq,
  setMotiveForRejectionMedicalReq,
  setDocumentsDeliveredMedicalReq,
  setFileDocumentsDeliveredMedicalReq,
  removeFileDocumentsDeliveredMedicalReq,
  setResponseTimeMedicalReq,
  setDelegateIdMedicalReq,
  setTypesMedicalReq,
  setCreatedAtMedicalReq,
  setUpdatedAtMedicalReq,
  setDeletedAtMedicalReq,
  setErrorsMedicalReq,
  setDefaultValuesMedicalReq,
} = medicalReqSlice.actions;

export default medicalReqSlice.reducer;
