import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import adminReducer from "./features/admin/adminSlice";
import selectedAdminReducer from "./features/admin/selectedAdminSlice";
import patientReducer from "./features/patient/patientSlice";
import epsReducer from "./features/eps/epsSlice";
import epsCompanyReducer from "./features/eps_company/epsCompanySlice";
import companyAreaReducer from "./features/company_area/companyAreaSlice";
import familiarReducer from "./features/familiar/familiarSlice";
import adminLoginReducer from "./features/login/adminLoginSlice";
import patientUserLoginReducer from "./features/login/patientUserLoginSlice";
import epsUserLoginReducer from "./features/login/epsUserLoginSlice";
import familiarLoginReducer from "./features/login/familiarLoginSlice";
import medicalReqReducer from "./features/medical_req/medicalReqSlice";
import reasonForRejectionReducer from "./features/medical_req/reason_for_rejection/reasonForRejectionSlice";
import typeOfMedicalRequestReducer from "./features/medical_req/type_of_medical_request/typeOfMedicalRequestSlice";
import auditLogReducer from "./features/audit_log/auditLogSlice";
import modalReducer from "./features/common/modal/modalSlice";

import { adminsApi } from "./apis/admins/adminsApi";
import { adminRolesApi } from "./apis/admin_roles/adminRolesApi";
import { usersApi } from "./apis/users/usersApi";
import { userRolesApi } from "./apis/user_roles/userRolesApi";
import { patientClassStatusApi } from "./apis/patient_class_status/patientClassStatusApi";
import { relativesApi } from "./apis/relatives/relativesApi";
import { relationshipTypesApi } from "./apis/relatives/relationship_types/relationshipTypesApi";
import { registerAdminApi } from "./apis/register/registerAdminApi";
import { registerUsersApi } from "./apis/register/registerUsersApi";
import { registerRelativesApi } from "./apis/register/registerRelativesApi";
import { loginAdminApi } from "./apis/auth/loginAdminApi";
import { loginUsersApi } from "./apis/auth/loginUsersApi";
import { loginRelativesApi } from "./apis/auth/loginRelativesApi";
import { medicalReqApi } from "./apis/medical_req/medicalReqApi";
import { epsCompanyApi } from "./apis/eps_company/epsCompanyApi";
import { companyAreaApi } from "./apis/company_area/companyAreaApi";
import { positionLevelApi } from "./apis/position_level/positionLevelApi";
import { uploadViewFilesApi } from "./apis/upload_view_files/uploadViewFilesApi";
import { typesMedicalReqApi } from "./apis/medical_req/types_medical_req/typesMedicalReqApi";
import { statusMedicalReqApi } from "./apis/medical_req/status_medical_req/statusMedicalReqApi";
import { reasonForRejectionMedicalReqApi } from "./apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";
import { idTypesApi } from "./apis/id_types/idTypesApi";
import { gendersApi } from "./apis/genders/gendersApi";
import { authMethodApi } from "./apis/auth_method/authMethodApi";
import { resetPasswordAdminsApi } from "./apis/reset_password/resetPasswordAdminsApi";
import { resetPasswordUsersApi } from "./apis/reset_password/resetPasswordUsersApi";
import { auditLogsApi } from "./apis/audit_logs/auditLogsApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "admin",
    "patient",
    "eps",
    "familiar",
    "adminLogin",
    "patientUserLogin",
    "epsUserLogin",
    "familiarLogin",
    "modal",
  ],
  blacklist: [],
};

const rootReducer = combineReducers({
  adminLogin: adminLoginReducer,
  patientUserLogin: patientUserLoginReducer,
  epsUserLogin: epsUserLoginReducer,
  familiarLogin: familiarLoginReducer,
  medicalReq: medicalReqReducer,
  reasonForRejection: reasonForRejectionReducer,
  typeOfMedicalRequest: typeOfMedicalRequestReducer,
  auditLog: auditLogReducer,
  admin: adminReducer,
  selectedAdmin: selectedAdminReducer,
  patient: patientReducer,
  eps: epsReducer,
  epsCompany: epsCompanyReducer,
  companyArea: companyAreaReducer,
  familiar: familiarReducer,
  modal: modalReducer,
  [adminsApi.reducerPath]: adminsApi.reducer,
  [adminRolesApi.reducerPath]: adminRolesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [userRolesApi.reducerPath]: userRolesApi.reducer,
  [patientClassStatusApi.reducerPath]: patientClassStatusApi.reducer,
  [relativesApi.reducerPath]: relativesApi.reducer,
  [relationshipTypesApi.reducerPath]: relationshipTypesApi.reducer,
  [registerAdminApi.reducerPath]: registerAdminApi.reducer,
  [registerUsersApi.reducerPath]: registerUsersApi.reducer,
  [registerRelativesApi.reducerPath]: registerRelativesApi.reducer,
  [loginAdminApi.reducerPath]: loginAdminApi.reducer,
  [loginUsersApi.reducerPath]: loginUsersApi.reducer,
  [loginRelativesApi.reducerPath]: loginRelativesApi.reducer,
  [medicalReqApi.reducerPath]: medicalReqApi.reducer,
  [epsCompanyApi.reducerPath]: epsCompanyApi.reducer,
  [companyAreaApi.reducerPath]: companyAreaApi.reducer,
  [positionLevelApi.reducerPath]: positionLevelApi.reducer,
  [uploadViewFilesApi.reducerPath]: uploadViewFilesApi.reducer,
  [typesMedicalReqApi.reducerPath]: typesMedicalReqApi.reducer,
  [statusMedicalReqApi.reducerPath]: statusMedicalReqApi.reducer,
  [reasonForRejectionMedicalReqApi.reducerPath]:
    reasonForRejectionMedicalReqApi.reducer,
  [idTypesApi.reducerPath]: idTypesApi.reducer,
  [gendersApi.reducerPath]: gendersApi.reducer,
  [authMethodApi.reducerPath]: authMethodApi.reducer,
  [resetPasswordAdminsApi.reducerPath]: resetPasswordAdminsApi.reducer,
  [resetPasswordUsersApi.reducerPath]: resetPasswordUsersApi.reducer,
  [auditLogsApi.reducerPath]: auditLogsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([
      adminsApi.middleware,
      adminRolesApi.middleware,
      usersApi.middleware,
      userRolesApi.middleware,
      patientClassStatusApi.middleware,
      relativesApi.middleware,
      relationshipTypesApi.middleware,
      registerAdminApi.middleware,
      registerUsersApi.middleware,
      registerRelativesApi.middleware,
      loginAdminApi.middleware,
      loginUsersApi.middleware,
      loginRelativesApi.middleware,
      medicalReqApi.middleware,
      epsCompanyApi.middleware,
      companyAreaApi.middleware,
      positionLevelApi.middleware,
      uploadViewFilesApi.middleware,
      typesMedicalReqApi.middleware,
      statusMedicalReqApi.middleware,
      reasonForRejectionMedicalReqApi.middleware,
      idTypesApi.middleware,
      gendersApi.middleware,
      authMethodApi.middleware,
      resetPasswordAdminsApi.middleware,
      resetPasswordUsersApi.middleware,
      auditLogsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
