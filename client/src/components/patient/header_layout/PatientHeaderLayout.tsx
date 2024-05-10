"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Col, Row } from "antd";
import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

import { setDefaultValuesUserPatient } from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

const PatienHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );

  const nameUserPatientState = useAppSelector((state) => state.patient.name);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/patient/update_personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = async () => {
    try {
      dispatch(setDefaultValuesUserPatient());

      const response = await signOut();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getFirstName = (fullName: string) => {
    if (!fullName) return "";

    const words = fullName.split(" ");
    return words[0];
  };

  return (
    <Row
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Col
        xs={12}
        sm={6}
        md={6}
        lg={6}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <a
          className="custom-layout-logo-header"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignContent: "center",
            width: "80%",
            height: "80%",
            backgroundColor: "#f2f2f2",
            borderEndStartRadius: 7,
            borderEndEndRadius: 7,
            overflow: "hidden",
          }}
          onClick={() => {
            router.replace("/patient/homepage", { scroll: true });
          }}
        >
          <img
            src="/logos/LOGO-HORIZONTAL-TRANS-130-X-130-PX.png"
            alt="Logo de Proced"
            style={{
              maxWidth: "72%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </a>
      </Col>
      <Col
        xs={12}
        sm={18}
        md={18}
        lg={18}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
        <div
          className="custom-layout-avatar-dropdown"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
          {userPatientFetching && userPatientLoading ? (
            <CustomSpin />
          ) : (
            <CustomDropdown
              titleCustomDropdown={getFirstName(nameUserPatientState)}
              iconCustomItem1={<PiUserListBold />}
              iconCustomItem2={<FaSignOutAlt />}
              titleCustomItem1="Actualizar Datos"
              titleCustomItem2="Cerrar Sesión"
              handleClickCustomItem1={handleClickUpdatePersonalData}
              handleClickCustomItem2={handleClickSignOut}
              iconCustomDropdown={<UserOutlined />}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default PatienHeaderLayout;
