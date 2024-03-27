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
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          className="title-modal"
          style={{
            fontWeight: 500,
            lineHeight: 1.3,
            marginTop: 4,
            marginBottom: 7,
          }}
        >
          Portal Web para pacientes, familiares y entidades aliadas
        </h3>

        <Button
          type="primary"
          onClick={() => signIn()}
          className="button-signin"
          size="large"
          style={{
            fontWeight: "bold",
            paddingInline: 31,
            borderRadius: 31,
            backgroundColor: "#015E90",
            color: "#f2f2f2",
            marginBottom: 13,
          }}
        >
          Ingresar al portal
        </Button>
      </div>
    </>
  );
};

export default ButtonAuth;
