interface ForgotUserPatientPassword {
  id_type: number;
  id_number: number;
  birthdate: string;
}

interface ForgotUserEpsPassword {
  id_type: number;
  id_number: number;
  eps_company: number;
}

interface ForgotAdminsPassword {
  admin_id_type: number;
  id_number: number;
  corporate_email: string;
}
