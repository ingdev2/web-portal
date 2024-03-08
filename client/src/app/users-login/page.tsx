"use client";

import PatientUsersLogin from "@/components/auth/PatientUsersLogin";

const UsersLoginPage = () => {
  const handleLoginSubmit = async (userData: {
    idType: string;
    idNumber: number;
    password: string;
  }) => {
    console.log(userData.idType, userData.idNumber);
  };

  return (
    <div>
      <PatientUsersLogin onSubmit={handleLoginSubmit} />
    </div>
  );
};
export default UsersLoginPage;
