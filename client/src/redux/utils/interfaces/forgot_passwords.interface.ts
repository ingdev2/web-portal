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
  corporate_email: string;
}
