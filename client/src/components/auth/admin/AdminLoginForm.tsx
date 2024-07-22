"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { AdminRolType } from "../../../../../api/src/utils/enums/admin_roles.enum";

import { titleStyleCss } from "@/theme/text_styles";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Select,
} from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import AdminModalVerificationCode from "./AdminModalVerificationCode";
import CustomModalNoContent from "../../common/custom_modal_no_content/CustomModalNoContent";
import CustomSpin from "../../common/custom_spin/CustomSpin";
import CustomMessage from "../../common/custom_messages/CustomMessage";

import {
  setIdTypeOptionsLoginAdmin,
  setIdTypeLoginAdmin,
  setIdNumberLoginAdmin,
  setPasswordLoginAdmin,
  setErrorsLoginAdmin,
  resetLoginAdminState,
} from "@/redux/features/login/adminLoginSlice";
import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import { setDefaultValuesAdmin } from "@/redux/features/admin/adminSlice";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useLoginAdminsMutation } from "@/redux/apis/auth/loginAdminApi";
import AdminForgotPasswordForm from "./admin_forgot_password_form/AdminForgotPasswordForm";

const AdminLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idTypeOptionsAdmin = useAppSelector(
    (state) => state.adminLogin.idTypeOptions
  );
  const idTypeAdminState = useAppSelector((state) => state.adminLogin.id_type);
  const idNumberAdminState = useAppSelector(
    (state) => state.adminLogin.id_number
  );
  const passwordAdminState = useAppSelector(
    (state) => state.adminLogin.password
  );
  const idAdminState = useAppSelector((state) => state.admin.id);
  const errorsAdminState = useAppSelector((state) => state.adminLogin.errors);

  const modalIsOpenAdmin = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const [idTypeAdminLocalState, setIdTypeAdminLocalState] = useState(0);
  const [idNumberAdminLocalState, setIdNumberAdminLocalState] = useState("");
  const [passwordAdminLocalState, setPasswordAdminLocalState] = useState("");

  const [modalForgotMyPasswordIsOpen, setModalForgotMyPasswordIsOpen] =
    useState(false);
  const [isSubmittingRegisterPageAdmin, setIsSubmittingRegisterPageAdmin] =
    useState(false);

  const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const {
    data: idTypesAdminData,
    isLoading: idTypesAdminLoading,
    isFetching: idTypesAdminFetching,
    error: idTypesAdminError,
  } = useGetAllIdTypesQuery(null);

  const [
    loginAdmins,
    {
      data: isLoginAdminData,
      isLoading: isLoginAdminLoading,
      isSuccess: isLoginAdminSuccess,
      isError: isLoginAdminError,
    },
  ] = useLoginAdminsMutation({ fixedCacheKey: "loginAdminData" });

  useEffect(() => {
    if (!idTypesAdminLoading && !idTypesAdminFetching && idTypesAdminData) {
      dispatch(setIdTypeOptionsLoginAdmin(idTypesAdminData));
    }
    if (idTypesAdminError) {
      dispatch(
        setErrorsLoginAdmin("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageAdmin(true);
      dispatch(setIdTypeOptionsLoginAdmin(idTypesAdminData));
    }
    if (
      (status === "authenticated" &&
        session?.user.role === AdminRolType.SUPER_ADMIN) ||
      session?.user.role === AdminRolType.ADMIN
    ) {
      signOut();
    }
  }, [
    idTypesAdminData,
    idTypesAdminLoading,
    idTypesAdminFetching,
    idTypesAdminError,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingAdmin(true);
      dispatch(resetLoginAdminState());
      dispatch(setDefaultValuesAdmin());

      const idNumberAdminLocalStateInt = idNumberAdminLocalState
        ? parseInt(idNumberAdminLocalState?.toString(), 10)
        : 0;

      const response: any = await loginAdmins({
        id_type: idTypeAdminLocalState,
        id_number: idNumberAdminLocalStateInt,
        password: passwordAdminLocalState,
      });

      var isLoginAdminError = response.error;

      var isLoginAdminSuccess = response.data;

      if (isLoginAdminError) {
        const errorMessage = isLoginAdminError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginAdmin(errorMessage[0]));
          setShowErrorMessageAdmin(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginAdmin(errorMessage));
          setShowErrorMessageAdmin(true);
        }
      }

      if (isLoginAdminSuccess && !isLoginAdminError) {
        dispatch(setIdTypeLoginAdmin(idTypeAdminLocalState));
        dispatch(setIdNumberLoginAdmin(idNumberAdminLocalStateInt));
        dispatch(setPasswordLoginAdmin(passwordAdminLocalState));

        dispatch(setErrorsLoginAdmin([]));
        setShowErrorMessageAdmin(false);

        dispatch(setAdminModalIsOpen(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingAdmin(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginAdmin([]));
    setShowErrorMessageAdmin(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "720px",
        minWidth: "231px",
        padding: "0px",
        margin: "0px",
      }}
    >
      {modalIsOpenAdmin && <AdminModalVerificationCode />}

      {showErrorMessageAdmin && (
        <CustomMessage
          typeMessage="error"
          message={errorsAdminState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Card
        key={"card-admin-login-form"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DFEBF2",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
          padding: "0px",
          marginBottom: "31px",
          marginInline: "22px",
        }}
      >
        <h2
          className="title-login-admin"
          style={{
            ...titleStyleCss,
            textAlign: "center",
            paddingBottom: "7px",
          }}
        >
          Ingreso de Administradores
        </h2>

        <Row justify={"center"} align={"middle"}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={12}
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: "13px",
              margin: "0px",
            }}
          >
            <img
              src="/logos/LOGO-BONNADONA.png"
              alt="Logo de Bonnadona"
              style={{
                width: "173px",
                paddingBlock: "22px",
              }}
            />

            <Divider
              orientation="center"
              style={{
                marginBlock: 7,
                borderWidth: 2,
              }}
            />

            <img
              src="/logos/LOGO-HORIZONTAL-TRANS-130-X-130-PX.png"
              alt="Logo de Bonnadona"
              style={{
                width: "207px",
                paddingBlock: "31px",
              }}
            />
          </Col>

          <Col
            xs={24}
            sm={12}
            md={12}
            lg={12}
            style={{
              width: "100%",
              paddingInline: "13px",
              paddingTop: "13px",
              margin: "0px",
            }}
          >
            <Form
              id="admin-login-form"
              name="admin-login-form"
              className="admin-login-form"
              onFinish={handleSubmit}
              initialValues={{ remember: false }}
              autoComplete="false"
              layout="vertical"
            >
              {idTypesAdminLoading || idTypesAdminFetching ? (
                <CustomSpin />
              ) : (
                <Form.Item
                  name="admin-id-type"
                  label="Tipo de identificación"
                  style={{ marginBottom: 7 }}
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor ingresa tu tipo de identificación!",
                    },
                  ]}
                >
                  <Select
                    value={idTypeAdminLocalState}
                    placeholder="Tipo de identificación"
                    onChange={(e) => setIdTypeAdminLocalState(e)}
                  >
                    {idTypeOptionsAdmin?.map((option: any) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                name="admin-id-number"
                label="Número de identificación"
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
                  value={idNumberAdminLocalState}
                  placeholder="Número de identificación"
                  onChange={(e) => setIdNumberAdminLocalState(e.target.value)}
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                name="admin-user-password"
                label="Contraseña"
                style={{ marginBottom: 13 }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor ingresa tu contraseña!",
                  },
                  {
                    min: 8,
                    message: "¡La contraseña debe tener mínimo 8 caracteres!",
                  },
                  {
                    max: 31,
                    message: "¡La contraseña debe tener máximo 31 caracteres!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  value={passwordAdminLocalState}
                  placeholder="Contraseña"
                  onChange={(e) => setPasswordAdminLocalState(e.target.value)}
                />
              </Form.Item>

              {modalForgotMyPasswordIsOpen && (
                <CustomModalNoContent
                  key={"custom-modal-forgot-my-password-admin"}
                  widthCustomModalNoContent={"31%"}
                  openCustomModalState={modalForgotMyPasswordIsOpen}
                  closableCustomModal={true}
                  maskClosableCustomModal={true}
                  handleCancelCustomModal={() =>
                    setModalForgotMyPasswordIsOpen(false)
                  }
                  contentCustomModal={
                    <AdminForgotPasswordForm
                      setOpenModalForgotPassword={
                        setModalForgotMyPasswordIsOpen
                      }
                    />
                  }
                />
              )}

              <Form.Item style={{ textAlign: "center" }}>
                <a
                  className="login-form-forgot-admin-password"
                  // href=""
                  style={{
                    ...titleStyleCss,
                    display: "flow",
                    color: "#960202",
                    textDecorationLine: "underline",
                    fontWeight: 500,
                    marginTop: 7,
                    marginBottom: 22,
                  }}
                  onClick={() => setModalForgotMyPasswordIsOpen(true)}
                >
                  Olvidé mi contraseña
                </a>

                {isSubmittingAdmin && isLoginAdminLoading ? (
                  <CustomSpin />
                ) : (
                  <Button
                    size="large"
                    style={{
                      paddingInline: 62,
                      borderRadius: 31,
                      backgroundColor: "#015E90",
                      color: "#f2f2f2",
                      marginBottom: 7,
                    }}
                    htmlType="submit"
                    className="admin-login-form-button"
                    onClick={handleButtonClick}
                  >
                    Ingresar
                  </Button>
                )}

                <Divider
                  style={{
                    fontSize: 13,
                    fontWeight: "normal",
                    marginBlock: 7,
                    borderWidth: 1.3,
                  }}
                >
                  ¿No tienes cuenta?
                </Divider>

                {isSubmittingRegisterPageAdmin ? (
                  <CustomSpin />
                ) : (
                  <Button
                    style={{
                      paddingInline: 22,
                      color: "#015E90",
                      borderColor: "#015E90",
                      fontWeight: "bold",
                      borderRadius: 7,
                      borderWidth: 1.3,
                      marginTop: 2,
                    }}
                    htmlType="button"
                    className="admin-register-button"
                    onClick={async () => {
                      try {
                        setIsSubmittingRegisterPageAdmin(true);

                        await router.push("/admin/register", {
                          scroll: true,
                        });
                      } catch (error) {
                        console.error(error);
                      } finally {
                        setIsSubmittingRegisterPageAdmin(false);
                      }
                    }}
                  >
                    Registrarse
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
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default AdminLoginForm;
