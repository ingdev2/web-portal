interface Admin {
  id: number;
  name: string;
  last_name: string;
  admin_gender: number;
  admin_gender_abbrev: string;
  admin_id_type: number;
  admin_id_type_abbrev: string;
  id_number: number;
  corporate_email: string;
  password: string;
  is_active: boolean;
  company_area: number;
  company_area_abbrev: string;
  position_level: number;
  position_level_abbrev: string;
  authentication_method: number;
  admin_role: number;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  errors: [];
}
