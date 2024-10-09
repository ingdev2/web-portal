"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFirstName } from "@/helpers/get_first_name/get_first_name";

import { Col, Row } from "antd";
import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

import {
  setNameUserFamiliar,
  setDefaultValuesUserFamiliar,
} from "@/redux/features/familiar/familiarSlice";
import { resetLoginFamiliarState } from "@/redux/features/login/familiarLoginSlice";
import { setDefaultValuesMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";
import { setDefaultValuesUserPatient } from "@/redux/features/patient/patientSlice";

const FamiliarHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idUserFamiliarState = useAppSelector((state) => state.familiarLogin.id);

  const nameUserFamiliarState = useAppSelector((state) => state.familiar.name);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdQuery(idUserFamiliarState, {
    skip: !idUserFamiliarState,
  });

  useEffect(() => {
    if (!nameUserFamiliarState) {
      dispatch(setNameUserFamiliar(userFamiliarData?.name));
    }
  }, [nameUserFamiliarState]);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/familiar/homepage/update_personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      dispatch(resetLoginFamiliarState());
      dispatch(setDefaultValuesUserFamiliar());
      dispatch(setDefaultValuesUserPatient());
      dispatch(setDefaultValuesMedicalReq());
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
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
          className="custom-layout-logo-header-familiar"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignContent: "center",
            width: "72%",
            height: "88%",
            backgroundColor: "#f2f2f2",
            borderEndStartRadius: 7,
            borderEndEndRadius: 7,
            overflow: "hidden",
          }}
          onClick={() => {
            router.replace("/familiar/homepage", { scroll: true });
          }}
        >
          <img
            src="/logos/LOGO-BONNADONA.png"
            alt="Logo de portal"
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
          className="custom-layout-avatar-dropdown-familiar"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
          {userFamiliarFetching && userFamiliarLoading ? (
            <CustomSpin />
          ) : (
            <CustomDropdown
              titleCustomDropdown={getFirstName(nameUserFamiliarState)}
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

export default FamiliarHeaderLayout;
