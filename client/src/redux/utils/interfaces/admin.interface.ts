interface Admin {
  id?: string;
  name: string;
  last_name?: string;
  user_gender: number;
  user_id_type: number;
  id_number: number;
  corporate_email: string;
  password: string;
  is_active?: boolean;
  company_area: number;
  admin_role?: number;
  position_level?: number;
  createdAt?: string;
  updateAt?: string;
  deletedAt?: string;
}