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
          style={{
            paddingInline: 31,
            borderRadius: 7,
            backgroundColor: "#800000",
            color: "#f2f2f2",
          }}
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
        className="button-signin"
        style={{
          paddingInline: 31,
          borderRadius: 7,
          backgroundColor: "#145A32",
          color: "#f2f2f2",
        }}
      >
        Iniciar sesión
      </Button>
    </>
  );
};

export default ButtonAuth;
