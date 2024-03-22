"use client";

import PatientUsersLogin from "@/components/auth/PatientUsersLogin";

const UsersLoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PatientUsersLogin />
    </div>
  );
};

export default UsersLoginPage;
