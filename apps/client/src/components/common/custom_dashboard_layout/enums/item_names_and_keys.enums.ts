export enum ItemNames {
  ITEM_REQUESTS = "Solicitudes",
  SUB_STATISTICS_REQ = "Estadísticas",
  SUB_ALL_REQUESTS = "Gestionar",
  SUB_ALL_LEGAL_REQUESTS = "Gestionar",

  ITEM_USERS = "Usuarios",
  SUB_ADMIN_USERS = "Administradores",
  SUB_EPS_AUDITORS = "Usuarios EPS",
  SUB_PATIENT_USERS = "Pacientes",
  SUB_RELATIVES_USERS = "Familiares",

  ITEM_PARAMETRIZATION = "Parametrización",
  SUB_EPS_COMPANIES_PARAMS = "Empresas EPS",
  SUB_REASONS_FOR_REJECTION_PARAMS = "Motivos de rechazo",
  SUB_REQ_TYPES_PARAMS = "Tipos de solicitud",
  SUB_COMPANY_AREAS_PARAMS = "Áreas de empresa",

  ITEM_AUDIT = "Auditoria",
  SUB_AUDIT_LOGS = "Total de registros",

  ITEM_MY_PROFILE = "Mi perfil",
  SUB_UPDATE_PERSONAL_DATA = "Mis datos",
}

export enum ItemKeys {
  ITEM_REQUESTS_KEY = "",
  SUB_STATISTICS_REQ_KEY = "/",
  SUB_ALL_REQUESTS_REQ_KEY = "requests",
  SUB_ALL_LEGAL_REQUESTS_REQ_KEY = "legal_requests",

  ITEM_USERS_KEY = "all_user",
  SUB_ADMIN_USERS_KEY = "all_admins",
  SUB_EPS_AUDITORS_KEY = "all_eps_users",
  SUB_PATIENT_USERS_KEY = "all_patients",
  SUB_RELATIVES_USERS_KEY = "all_relatives",

  ITEM_PARAMETRIZATION_KEY = "parametrization",
  SUB_EPS_COMPANIES_PARAMS_KEY = "all_eps_companies",
  SUB_REASONS_FOR_REJECTION_PARAMS_KEY = "all_reasons_for_rejection",
  SUB_REQ_TYPES_PARAMS_KEY = "all_types_of_requests",
  SUB_COMPANY_AREAS_PARAMS_KEY = "all_company_areas",

  ITEM_AUDIT_KEY = "audit",
  SUB_AUDIT_LOGS_KEY = "audit_logs",

  ITEM_MY_PROFILE_KEY = "my_profile",
  SUB_UPDATE_PERSONAL_DATA_KEY = "personal_data",
}
