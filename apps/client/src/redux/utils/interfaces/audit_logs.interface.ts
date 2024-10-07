interface AuditLogs {
  id: string;
  user_name: string;
  user_id_number: string;
  user_email: string;
  user_role: string;
  action_type: string;
  query_type: string;
  module_name: string;
  module_record_id: string;
  ip_address: string;
  is_mobile: string;
  browser_version: string;
  operating_system: string;
  createdAt: string;
  timeAt: string;
  errors: string[];
}
