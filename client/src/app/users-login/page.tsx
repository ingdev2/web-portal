"use client";

import PatientUsersLogin from "@/components/auth/PatientUsersLogin";

export default function UsersLoginPage() {
  const handleLoginSubmit = async (userData: {
    idType: string;
    idNumber: number;
    password: string;
  }) => {
    console.log(userData.idType, userData.idNumber);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PatientUsersLogin onSubmit={handleLoginSubmit} />
    </div>
  );
}
