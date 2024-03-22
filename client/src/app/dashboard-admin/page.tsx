"use client";

import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const DashboardAdminPage = () => {
  const id_type = useAppSelector((state) => state.userLogin.id_type);
  const id_number = useAppSelector((state) => state.userLogin.id_number);
  const password = useAppSelector((state) => state.userLogin.password);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <ol>
        <li>{id_type}</li>
        <li>{id_number}</li>
        <li>{password}</li>
      </ol>
    </div>
  );
};

export default DashboardAdminPage;
