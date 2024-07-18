"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import { Button, Card, Col, Form, Input, Select } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import FamiliarModalVerificationCode from "./FamiliarModalVerificationCode";
import CustomSpin from "../../common/custom_spin/CustomSpin";
import CustomMessage from "../../common/custom_messages/CustomMessage";
import { titleStyleCss } from "@/theme/text_styles";

import {
  setIdTypeLoginFamiliar,
  setIdNumberLoginFamiliar,
  setEmailLoginFamiliar,
  setPatientIdNumberLoginFamiliar,
  setRelationWithPatientLoginFamiliar,
  setVerificationCodeLoginFamiliar,
  setErrorsLoginFamiliar,
  setIdTypeOptionsLoginFamiliar,
  setRelationshipTypesOptionsLoginFamiliar,
  resetLoginFamiliarState,
  setIdLoginFamiliar,
} from "@/redux/features/login/familiarLoginSlice";
import { setDefaultValuesUserFamiliar } from "@/redux/features/familiar/familiarSlice";
import { setFamiliarModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import { useLoginRelativesMutation } from "@/redux/apis/auth/loginRelativesApi";
import { useGetFamiliarByIdNumberQuery } from "@/redux/apis/relatives/relativesApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";

const FamiliarUserLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idTypeOptionsFamiliar = useAppSelector(
    (state) => state.familiarLogin.idTypeOptions
  );
  const relationshipTypesOptionsFamiliar = useAppSelector(
    (state) => state.familiarLogin.relationshipTypesOptions
  );
  const idTypeFamiliarState = useAppSelector(
    (state) => state.familiarLogin.id_type_familiar
  );
  const idNumberEpsState = useAppSelector(
    (state) => state.familiarLogin.id_number_familiar
  );
  const errorsFamiliarState = useAppSelector(
    (state) => state.familiarLogin.errors
  );

  const modalIsOpenFamiliar = useAppSelector(
    (state) => state.modal.familiarModalIsOpen
  );

  const [idTypeFamiliarLocalState, setIdTypeFamiliarLocalState] = useState(0);
  const [
    relationshipWithPatientLocalState,
    setRelationshipWithPatientLocalState,
  ] = useState(0);
  const [idNumberFamiliarLocalState, setIdNumberFamiliarLocalState] =
    useState("");
  const [emailFamiliarLocalState, setEmailFamiliarLocalState] = useState("");
  const [idNumberPatientLocalState, setIdNumberPatientLocalState] =
    useState("");

  const [isSubmittingFamiliar, setIsSubmittingFamiliar] = useState(false);
  const [showErrorMessageFamiliar, setShowErrorMessageFamiliar] =
    useState(false);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    isSuccess: userFamiliarSuccess,
    isError: userFamiliarError,
  } = useGetFamiliarByIdNumberQuery(
    parseInt(idNumberFamiliarLocalState?.toString(), 10),
    { skip: !idNumberFamiliarLocalState }
  );

  const {
    data: idTypesFamiliarData,
    isLoading: idTypesFamiliarLoading,
    isFetching: idTypesFamiliarFetching,
    error: idTypesFamiliarError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: relationshipTypesData,
    isLoading: relationshipTypesLoading,
    isFetching: relationshipTypesFetching,
    error: relationshipTypesError,
  } = useGetAllRelationshipTypesQuery(null);

  const [
    loginFamiliarUser,
    {
      data: isLoginFamiliarData,
      isLoading: isLoginFamiliarLoading,
      isSuccess: isLoginFamiliarSuccess,
      isError: isLoginFamiliarError,
    },
  ] = useLoginRelativesMutation({ fixedCacheKey: "loginFamiliarData" });

  useEffect(() => {
    if (
      !idTypesFamiliarLoading &&
      !idTypesFamiliarFetching &&
      idTypesFamiliarData
    ) {
      dispatch(setIdTypeOptionsLoginFamiliar(idTypesFamiliarData));
    }
    if (idTypesFamiliarError) {
      dispatch(
        setErrorsLoginFamiliar(
          "¡No se pudo obtener los tipos de identificación!"
        )
      );
      setShowErrorMessageFamiliar(true);
      dispatch(setIdTypeOptionsLoginFamiliar(idTypesFamiliarData));
    }
    if (
      !relationshipTypesLoading &&
      !relationshipTypesFetching &&
      relationshipTypesData
    ) {
      dispatch(setRelationshipTypesOptionsLoginFamiliar(relationshipTypesData));
    }
    if (relationshipTypesError) {
      dispatch(
        setErrorsLoginFamiliar("¡No se pudo obtener los tipos de parentesco!")
      );
      setShowErrorMessageFamiliar(true);
      dispatch(setRelationshipTypesOptionsLoginFamiliar(relationshipTypesData));
    }
    if (
      (status === "authenticated" &&
        session?.user.role === UserRolType.PATIENT) ||
      session?.user.role === UserRolType.EPS ||
      session?.user.role === UserRolType.AUTHORIZED_FAMILIAR
    ) {
      signOut();
    }
  }, [
    idTypesFamiliarData,
    idTypesFamiliarError,
    relationshipTypesData,
    relationshipTypesError,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingFamiliar(true);
      dispatch(resetLoginFamiliarState());
      dispatch(setDefaultValuesUserFamiliar());

      const idNumberFamiliarLocalStateInt = idNumberFamiliarLocalState
        ? parseInt(idNumberFamiliarLocalState?.toString(), 10)
        : 0;
      const idNumberPatientLocalStateInt = idNumberPatientLocalState
        ? parseInt(idNumberPatientLocalState?.toString(), 10)
        : 0;

      const response: any = await loginFamiliarUser({
        id_type_familiar: idTypeFamiliarLocalState,
        id_number_familiar: idNumberFamiliarLocalStateInt,
        email_familiar: emailFamiliarLocalState,
        patient_id_number: idNumberPatientLocalStateInt,
        rel_with_patient: relationshipWithPatientLocalState,
      });

      var isLoginUserFamiliarError = response.error;

      var isLoginUserFamiliarSuccess = response.data;

      if (isLoginUserFamiliarError) {
        const errorMessage = isLoginUserFamiliarError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginFamiliar(errorMessage[0]));
          setShowErrorMessageFamiliar(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginFamiliar(errorMessage));
          setShowErrorMessageFamiliar(true);
        }
      }

      if (isLoginUserFamiliarSuccess) {
        if (userFamiliarData && !userFamiliarError) {
          dispatch(setIdLoginFamiliar(userFamiliarData.id));
        }
        dispatch(setIdTypeLoginFamiliar(idTypeFamiliarLocalState));
        dispatch(setIdNumberLoginFamiliar(idNumberFamiliarLocalStateInt));
        dispatch(setEmailLoginFamiliar(emailFamiliarLocalState));
        dispatch(setErrorsLoginFamiliar([]));
        setShowErrorMessageFamiliar(false);
        dispatch(setFamiliarModalIsOpen(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingFamiliar(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginFamiliar([]));
    setShowErrorMessageFamiliar(false);
  };

  return (
    <Col
      xs={24}
      lg={24}
      style={{
        width: "100vw",
        padding: "0 2px",
        maxWidth: "450px",
        minWidth: "231px",
      }}
    >
      {modalIsOpenFamiliar && <FamiliarModalVerificationCode />}

      {showErrorMessageFamiliar && (
        <CustomMessage
          typeMessage="error"
          message={errorsFamiliarState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Card
        key={"card-familiar-user-login-form"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "31px",
          marginInline: "22px",
        }}
      >
        <Form
          id="familiar-user-login-form"
          name="familiar-user-login-form"
          className="familiar-user-login-form"
          onFinish={handleSubmit}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-login-familiar"
            style={{
              ...titleStyleCss,
              textAlign: "center",
            }}
          >
            Ingreso de usuario <br />
            Familiares
          </h2>

          {idTypesFamiliarLoading || idTypesFamiliarFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="familiar-user-id-type"
              label="Tipo de identificación de familiar"
              style={{ marginBottom: 7 }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa tu tipo de identificación!",
                },
              ]}
            >
              <Select
                value={idTypeFamiliarLocalState}
                placeholder="Tipo de identificación"
                onChange={(e) => setIdTypeFamiliarLocalState(e)}
              >
                {idTypeOptionsFamiliar?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="familiar-user-id-number"
            label="Número de identificación de familiar"
            style={{ marginBottom: 7 }}
            normalize={(value) => {
              if (!value) return "";

              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu número de identificación!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de identificación sin puntos, ni comas!",
              },
              {
                min: 7,
                message: "¡Por favor ingresa mínimo 7 números!",
              },
              {
                max: 11,
                message: "¡Por favor ingresa máximo 11 números!",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              type="tel"
              value={idNumberFamiliarLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberFamiliarLocalState(e.target.value)}
              autoComplete="off"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="familiar-user-email"
            label="Correo electrónico de familiar"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el correo electrónico del familiar!",
              },
              {
                type: "email",
                message: "¡Por favor ingresa un correo electrónico valido!",
              },
              {
                min: 10,
                message: "¡Por favor ingresa mínimo 10 caracteres!",
              },
              {
                max: 45,
                message: "¡Por favor ingresa máximo 45 caracteres!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={emailFamiliarLocalState}
              placeholder="Correo electrónico"
              onChange={(e) => {
                setEmailFamiliarLocalState(e.target.value.toLowerCase());
              }}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="patient-id-number"
            label="Número de identificación de paciente"
            style={{ marginBottom: 7 }}
            normalize={(value) => {
              if (!value) return "";

              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu número de identificación!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de identificación sin puntos, ni comas!",
              },
              {
                min: 7,
                message: "¡Por favor ingresa mínimo 7 números!",
              },
              {
                max: 11,
                message: "¡Por favor ingresa máximo 11 números!",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              type="tel"
              value={idNumberPatientLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberPatientLocalState(e.target.value)}
              autoComplete="off"
              min={0}
            />
          </Form.Item>

          {relationshipTypesLoading || relationshipTypesFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="familiar-relationship-with-patient"
              label="Parentesco con paciente"
              style={{ marginBottom: 22 }}
              rules={[
                {
                  required: true,
                  message:
                    "¡Por favor seleccione el tipo de parentesco que tiene con el paciente!",
                },
              ]}
            >
              <Select
                value={relationshipWithPatientLocalState}
                placeholder="Parentesco con paciente"
                onChange={(e) => setRelationshipWithPatientLocalState(e)}
              >
                {relationshipTypesOptionsFamiliar?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item style={{ textAlign: "center" }}>
            {isSubmittingFamiliar && isLoginFamiliarLoading ? (
              <CustomSpin />
            ) : (
              <Button
                size="large"
                style={{
                  paddingInline: 62,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                }}
                htmlType="submit"
                className="familiar-login-form-button"
                onClick={handleButtonClick}
              >
                Ingresar
              </Button>
            )}
          </Form.Item>
          {/* <Form.ErrorList
          errors={errors?.map((error) => (
            <div
              key={error}
              style={{
                marginTop: 0,
                marginBottom: 13,
                textAlign: "center",
                color: "#960202",
              }}
            >
              {error}
            </div>
          ))}
        /> */}
        </Form>
      </Card>
    </Col>
  );
};

export default FamiliarUserLoginForm;
