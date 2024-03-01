"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "antd";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  console.log({ session, status });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Ingresaste como: {session.user?.email} <br />
        <Button
          type="primary"
          onClick={() => signOut()}
          className="btn btn-danger"
        >
          Cerrar sesión
        </Button>
      </>
    );
  }
  return (
    <>
      No estas registrado
      <br />
      <Button
        type="primary"
        onClick={() => signIn()}
        className="btn btn-primary"
      >
        Iniciar sesión
      </Button>
    </>
  );
}
