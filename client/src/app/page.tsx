"use client";

import React, { useEffect, useState } from "react";
import ButtonAuth from "@/components/auth/ButtonAuth";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByIdNumberQuery,
} from "@/redux/apis/users/usersApi";
import { useAppSelector } from "@/redux/hooks";

const HomePage = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const id_number = useAppSelector((state) => state.userLogin.id_number);

  const {
    data: allUsersData,
    error: allUsersError,
    isLoading: allUsersIsLoading,
    isFetching: allUsersIsFetching,
  } = useGetAllUsersQuery(null);

  const {
    data: userByIdNumber,
    error: userByIdNumberError,
    isLoading: userByIdNumberIsLoading,
    isFetching: userByIdNumberIsFetching,
  } = useGetUserByIdNumberQuery({ idNumber: id_number });

  useEffect(() => {
    if (allUsersError) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error en la petición!");
    }
  }, [allUsersError]);

  return (
    <div
      className="HomePage"
      style={{
        height: "100vh",
      }}
    >
      <h2>Página de Inicio</h2>
      <ButtonAuth></ButtonAuth>

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {allUsersIsLoading || allUsersIsFetching ? (
        <CustomSpin />
      ) : (
        allUsersData?.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.id_number}</p>
            <p>{user.email}</p>
            <p>{user.cellphone}</p>
            <p>{user.user_role}</p>
            <p>{user.birthdate}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
