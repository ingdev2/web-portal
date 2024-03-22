"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ButtonAuth from "@/components/auth/ButtonAuth";

import {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} from "@/redux/apis/usersApi";
import { Button } from "antd";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const {
    data: allUsersData,
    error: allUsersError,
    isLoading: allUsersIsLoading,
    isFetching: allUsersIsFetching,
  } = useGetAllUsersQuery(null);

  if (allUsersIsLoading || allUsersIsFetching) {
    return <p>Loading...</p>;
  }

  if (allUsersError) {
    return <p>Some error</p>;
  }

  return (
    <div className="HomePage">
      <h2>Página de Inicio</h2>
      <ButtonAuth></ButtonAuth>

      {allUsersData?.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.id_number}</p>
          <p>{user.email}</p>
          <p>{user.cellphone}</p>
          <p>{user.user_role}</p>
          <p>{user.birthdate}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
