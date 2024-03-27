interface UserLogin {
  id_type: number;
  id_number: number;
  password: string;
  verification_code?: number;
  token?: string;
  idTypeOptions?: [];
  errors?: [];
}
