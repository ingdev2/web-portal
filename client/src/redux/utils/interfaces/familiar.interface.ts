interface Familiar {
  id: string;
  name: string;
  last_name: string;
  user_gender: number;
  user_id_type: number;
  id_number: number;
  email: string;
  cellphone: number;
  whatsapp: number;
  authentication_method: number;
  is_active: boolean;
  accept_terms: boolean;
  user_role: number;
  rel_with_patient: number;
  patient_id: string;
  verification_code: number;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  copy_familiar_citizenship_card: string[];
  medical_req: Array<any>;
  errors: [];
}
