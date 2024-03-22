"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "antd";

const ButtonAuth = () => {
  const { data: session, status } = useSession();

  console.log({ session, status });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Ingresaste como: {session.user?.name} <br />
        <Button
          type="primary"
          onClick={() => signOut()}
          className="button-signout"
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
      <Button type="primary" onClick={() => signIn()} className="button-signin">
        Iniciar sesión
      </Button>
    </>
  );
};

export default ButtonAuth;
