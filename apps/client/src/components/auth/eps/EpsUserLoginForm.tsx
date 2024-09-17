"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { UserRolType } from "shared/utils/enums/user_roles.enum";

import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Select,
} from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import EpsModalVerificationCode from "./EpsModalVerificationCode";
import EpsForgotPasswordForm from "./eps_forgot_password_form/EpsForgotPasswordForm";
import CustomModalNoContent from "../../common/custom_modal_no_content/CustomModalNoContent";
import CustomSpin from "../../common/custom_spin/CustomSpin";
import CustomMessage from "../../common/custom_messages/CustomMessage";
import { titleStyleCss } from "@/theme/text_styles";

import {
  setIdTypeOptionsLoginEps,
  setIdTypeLoginEps,
  setIdNumberLoginEps,
  setPasswordLoginEps,
  setVerificationCodeLoginEps,
  setErrorsLoginEps,
  resetLoginStateLoginEps,
} from "@/redux/features/login/epsUserLoginSlice";
import { setEpsModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useLoginEpsUsersMutation } from "@/redux/apis/auth/loginUsersApi";
import { setDefaultValuesUserEps } from "@/redux/features/eps/epsSlice";

import {
  checkboxProcessingPersonalDataValidator,
  checkboxMessagesValidator,
} from "@/helpers/checkbox_validator/checkbox_validator";
import { CheckboxProps } from "antd/lib";

const EpsUserLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idTypeOptionsEps = useAppSelector(
    (state) => state.epsUserLogin.idTypeOptions
  );
  const idTypeEpsState = useAppSelector((state) => state.epsUserLogin.id_type);
  const idNumberEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const passwordEpsState = useAppSelector(
    (state) => state.epsUserLogin.password
  );
  const idEpsState = useAppSelector((state) => state.eps.id);
  const epsCompanyUserEps = useAppSelector((state) => state.eps.eps_company);
  const errorsEpsState = useAppSelector((state) => state.epsUserLogin.errors);

  const modalIsOpenEps = useAppSelector((state) => state.modal.epsModalIsOpen);

  const [idTypeEpsLocalState, setIdTypeEpsLocalState] = useState(0);
  const [idNumberEpsLocalState, setIdNumberEpsLocalState] = useState("");
  const [passwordEpsLocalState, setPasswordEpsLocalState] = useState("");

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCheckboxMessagesChecked, setIsCheckboxMessagesChecked] =
    useState(false);
  const [modalForgotMyPasswordIsOpen, setModalForgotMyPasswordIsOpen] =
    useState(false);
  const [isSubmittingRegisterPageEps, setIsSubmittingRegisterPageEps] =
    useState(false);

  const [isSubmittingEps, setIsSubmittingEps] = useState(false);
  const [showErrorMessageEps, setShowErrorMessageEps] = useState(false);

  const {
    data: idTypesEpsData,
    isLoading: idTypesEpsLoading,
    isFetching: idTypesEpsFetching,
    error: idTypesEpsError,
  } = useGetAllIdTypesQuery(null);

  const [
    loginEpsUsers,
    {
      data: isLoginEpsData,
      isLoading: isLoginEpsLoading,
      isSuccess: isLoginEpsSuccess,
      isError: isLoginEpsError,
    },
  ] = useLoginEpsUsersMutation({ fixedCacheKey: "loginEpsData" });

  useEffect(() => {
    if (!idTypesEpsLoading && !idTypesEpsFetching && idTypesEpsData) {
      dispatch(setIdTypeOptionsLoginEps(idTypesEpsData));
    }
    if (idTypesEpsError) {
      dispatch(
        setErrorsLoginEps("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageEps(true);
      dispatch(setIdTypeOptionsLoginEps(idTypesEpsData));
    }
    if (
      (status === "authenticated" &&
        session?.user.role === UserRolType.PATIENT) ||
      session?.user.role === UserRolType.EPS ||
      session?.user.role === UserRolType.AUTHORIZED_FAMILIAR
    ) {
      signOut();
    }
  }, [idTypesEpsData, idTypesEpsLoading, idTypesEpsFetching, idTypesEpsError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingEps(true);
      dispatch(resetLoginStateLoginEps());
      dispatch(setDefaultValuesUserEps());

      const idNumberEpsLocalStateInt = idNumberEpsLocalState
        ? parseInt(idNumberEpsLocalState?.toString(), 10)
        : 0;

      const response: any = await loginEpsUsers({
        id_type: idTypeEpsLocalState,
        id_number: idNumberEpsLocalStateInt,
        password: passwordEpsLocalState,
      });

      let isLoginUserError = response.error;

      let isLoginUserSuccess = response.data;

      if (isLoginUserError) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginEps(errorMessage[0]));
          setShowErrorMessageEps(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginEps(errorMessage));
          setShowErrorMessageEps(true);
        }
      }

      if (isLoginUserSuccess && !isLoginUserError) {
        dispatch(setIdTypeLoginEps(idTypeEpsLocalState));
        dispatch(setIdNumberLoginEps(idNumberEpsLocalStateInt));
        dispatch(setPasswordLoginEps(passwordEpsLocalState));
        dispatch(setErrorsLoginEps([]));
        setShowErrorMessageEps(false);
        dispatch(setEpsModalIsOpen(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingEps(false);
    }
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleCheckboxMessageChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxMessagesChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginEps([]));
    setShowErrorMessageEps(false);
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
      {modalIsOpenEps && <EpsModalVerificationCode />}

      {showErrorMessageEps && (
        <CustomMessage
          typeMessage="error"
          message={errorsEpsState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Card
        key={"card-eps-user-login-form"}
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
          id="eps-users-login-form"
          name="eps-users-login-form"
          className="eps-users-login-form"
          onFinish={handleSubmit}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-login-eps"
            style={{
              ...titleStyleCss,
              textAlign: "center",
            }}
          >
            Ingreso de usuario <br />
            Eps
          </h2>

          {idTypesEpsLoading || idTypesEpsFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="eps-user-id-type"
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
                value={idTypeEpsLocalState}
                placeholder="Tipo de identificación"
                onChange={(e) => setIdTypeEpsLocalState(e)}
              >
                {idTypeOptionsEps?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="eps-user-id-number"
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
              value={idNumberEpsLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberEpsLocalState(e.target.value)}
              autoComplete="off"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="eps-user-password"
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
              value={passwordEpsLocalState}
              placeholder="Contraseña"
              onChange={(e) => setPasswordEpsLocalState(e.target.value)}
            />
          </Form.Item>

          {modalForgotMyPasswordIsOpen && (
            <CustomModalNoContent
              key={"custom-modal-forgot-my-password-patient"}
              widthCustomModalNoContent={"31%"}
              openCustomModalState={modalForgotMyPasswordIsOpen}
              closableCustomModal={true}
              maskClosableCustomModal={true}
              handleCancelCustomModal={() =>
                setModalForgotMyPasswordIsOpen(false)
              }
              contentCustomModal={
                <EpsForgotPasswordForm
                  setOpenModalForgotPassword={setModalForgotMyPasswordIsOpen}
                />
              }
            />
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <a
              className="eps-login-form-forgot-user"
              // href=""
              style={{
                ...titleStyleCss,
                display: "flow",
                color: "#960202",
                textDecorationLine: "underline",
                fontWeight: 500,
                marginTop: 7,
                marginBottom: 7,
              }}
              onClick={() => setModalForgotMyPasswordIsOpen(true)}
            >
              Olvidé mi contraseña
            </a>

            <Form.Item
              name="checkbox-data-autorization"
              valuePropName="checked"
              style={{ textAlign: "center", marginBottom: 13 }}
              rules={[
                {
                  validator: checkboxProcessingPersonalDataValidator,
                },
              ]}
            >
              <div style={{ marginBlock: 13 }}>
                <div style={{ marginBottom: "13px" }}>
                  <a
                    className="data-processing-autorization-link"
                    href={
                      process.env.NEXT_PUBLIC_DATA_PROCESSING_AUTORIZATION_LINK
                    }
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    Leer Política de Tratamiento de Datos Personales
                  </a>
                </div>
                <Checkbox
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                >
                  Declaro haber leído, entendido y aceptado la Política de
                  Tratamiento de Datos Personales
                </Checkbox>
              </div>
            </Form.Item>

            <Form.Item
              name="checkbox-authorization-send-messages"
              valuePropName="checked"
              style={{ textAlign: "center", marginBottom: 13 }}
              rules={[
                {
                  validator: checkboxMessagesValidator,
                },
              ]}
            >
              <div style={{ marginBottom: 13 }}>
                <Checkbox
                  checked={isCheckboxMessagesChecked}
                  onChange={handleCheckboxMessageChange}
                >
                  Acepto el uso de medios electrónicos vía email o celular para
                  recibir mensajes informativos
                </Checkbox>
              </div>
            </Form.Item>

            {isSubmittingEps && isLoginEpsLoading ? (
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
                className="eps-login-form-button"
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

export default EpsUserLoginForm;
