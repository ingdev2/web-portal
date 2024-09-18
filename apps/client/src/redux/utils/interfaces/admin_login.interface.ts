interface AdminLogin {
  id: string;
  id_type: number;
  id_type_abbrev: string;
  id_number: number;
  password: string;
  verification_code: number;
  idTypeOptions: [];
  errors: [];
}
