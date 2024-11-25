import { createSlice } from "@reduxjs/toolkit";

const initialState: AuditLogs = {
  id: "",
  user_name: "",
  user_id_number: "",
  user_email: "",
  user_role: "",
  action_type: "",
  query_type: "",
  module_name: "",
  module_record_id: "",
  ip_address: "",
  is_mobile: "",
  browser_version: "",
  operating_system: "",
  createdAt: "",
  timeAt: "",
  errors: [],
};

export const auditLogSlice = createSlice({
  name: "auditLog",
  initialState,
  reducers: {
    setIdAuditLog: (state, action) => {
      state.id = action.payload;
    },
    setUserNameAuditLog: (state, action) => {
      state.user_name = action.payload;
    },
    setUserIdNumberAuditLog: (state, action) => {
      state.user_id_number = action.payload;
    },
    setUserEmailAuditLog: (state, action) => {
      state.user_email = action.payload;
    },
    setUserRoleAuditLog: (state, action) => {
      state.user_role = action.payload;
    },
    setActionTypeAuditLog: (state, action) => {
      state.action_type = action.payload;
    },
    setQueryTypeAuditLog: (state, action) => {
      state.query_type = action.payload;
    },
    setModuleNameAuditLog: (state, action) => {
      state.module_name = action.payload;
    },
    setModuleRecordIdAuditLog: (state, action) => {
      state.module_record_id = action.payload;
    },
    setIpAddressAuditLog: (state, action) => {
      state.ip_address = action.payload;
    },
    setIsMobileAuditLog: (state, action) => {
      state.is_mobile = action.payload;
    },
    setBrowserVersionAuditLog: (state, action) => {
      state.browser_version = action.payload;
    },
    setOperatingSystemAuditLog: (state, action) => {
      state.operating_system = action.payload;
    },
    setCreatedAtAuditLog: (state, action) => {
      state.createdAt = action.payload;
    },
    setTimeAtAuditLog: (state, action) => {
      state.timeAt = action.payload;
    },
    setErrorsAuditLog: (state, action) => {
      state.errors = action.payload;
    },
    setResetAuditLog: (state) => {
      state.id = "";
      state.user_name = "";
      state.user_id_number = "";
      state.user_email = "";
      state.user_role = "";
      state.action_type = "";
      state.query_type = "";
      state.module_name = "";
      state.module_record_id = "";
      state.ip_address = "";
      state.is_mobile = "";
      state.browser_version = "";
      state.operating_system = "";
      state.createdAt = "";
      state.timeAt = "";
    },
  },
});

export const {
  setIdAuditLog,
  setUserNameAuditLog,
  setUserIdNumberAuditLog,
  setUserEmailAuditLog,
  setUserRoleAuditLog,
  setActionTypeAuditLog,
  setQueryTypeAuditLog,
  setModuleNameAuditLog,
  setModuleRecordIdAuditLog,
  setIpAddressAuditLog,
  setIsMobileAuditLog,
  setBrowserVersionAuditLog,
  setOperatingSystemAuditLog,
  setCreatedAtAuditLog,
  setTimeAtAuditLog,
  setErrorsAuditLog,
  setResetAuditLog,
} = auditLogSlice.actions;

export default auditLogSlice.reducer;
