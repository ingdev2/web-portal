interface Admin {
  id: string;
  name: string;
  last_name: string;
  user_gender: number;
  user_gender_abbrev: string;
  user_id_type: number;
  id_type_abbrev: string;
  id_number: number;
  corporate_email: string;
  password: string;
  is_active: boolean;
  company_area: number;
  company_area_abbrev: string;
  position_level: number;
  position_level_abbrev: string;
  admin_role: number;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  errors: [];
}
