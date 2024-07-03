"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Col, Row } from "antd";
import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

import {
  setNameUserEps,
  setDefaultValuesUserEps,
} from "@/redux/features/eps/epsSlice";
import { resetLoginStateLoginEps } from "@/redux/features/login/epsUserLoginSlice";
import { setDefaultValuesMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";

const EpsHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberUserEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );

  const nameUserEpsState = useAppSelector((state) => state.eps.name);

  const {
    data: userEpsData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberUserEpsState);

  useEffect(() => {
    if (!nameUserEpsState) {
      dispatch(setNameUserEps(userEpsData?.name));
    }
  }, [nameUserEpsState]);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/eps/homepage/update_personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      dispatch(resetLoginStateLoginEps());
      dispatch(setDefaultValuesUserEps());
      dispatch(setDefaultValuesMedicalReq());
      signOut();
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
          className="custom-layout-logo-header-eps"
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
            router.replace("/eps/homepage", { scroll: true });
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
          className="custom-layout-avatar-dropdown-eps"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
          {userEpsFetching && userEpsLoading ? (
            <CustomSpin />
          ) : (
            <CustomDropdown
              titleCustomDropdown={getFirstName(nameUserEpsState)}
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

export default EpsHeaderLayout;
