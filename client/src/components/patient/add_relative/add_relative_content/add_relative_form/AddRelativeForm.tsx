"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Col,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { titleStyleCss } from "@/theme/text_styles";
import { IdcardOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import { setIdUserPatient } from "@/redux/features/patient/patientSlice";
import {
  setErrorsUserFamiliar,
  setIdTypesUserFamiliar,
} from "@/redux/features/familiar/familiarSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useCreateFamiliarMutation } from "@/redux/apis/register/registerRelativesApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

import { checkboxValidator } from "@/helpers/checkbox_validator/checkbox_validator";

const AddRelativeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idTypesListFamiliarState = useAppSelector(
    (state) => state.familiar.idTypesFamiliar
  );
  const idTypeFamiliarState = useAppSelector(
    (state) => state.familiar.user_id_type
  );
  const userFamiliarErrorsState = useAppSelector(
    (state) => state.familiar.errors
  );

  const [familiarNameLocalState, setFamiliarNameLocalState] = useState("");
  const [familiarLastNameLocalState, setFamiliarLastNameLocalState] =
    useState("");
  const [familiarIdTypeLocalState, setFamiliarIdTypeLocalState] = useState(0);
  const [familiarIdTypeNameLocalState, setFamiliarIdTypeNameLocalState] =
    useState("");
  const [familiarIdNumberLocalState, setFamiliarIdNumberLocalState] =
    useState(0);
  const [familiarGenderLocalState, setFamiliarGenderLocalState] = useState(0);
  const [familiarGenderListLocalState, setFamiliarGenderListLocalState]: any[] =
    useState([]);
  const [familiarEmailLocalState, setFamiliarEmailLocalState] = useState("");
  const [familiarCellphoneLocalState, setFamiliarCellphoneLocalState] =
    useState(0);
  const [familiarWhatsappLocalState, setFamiliarWhatsappLocalState] =
    useState("");
  const [
    familiarRelationshipListLocalState,
    setFamiliarRelationshipListLocalState,
  ]: any[] = useState([]);
  const [familiarRelationshipLocalState, setFamiliarRelationshipLocalState] =
    useState(0);
  const [
    familiarRelationshipNameLocalState,
    setFamiliarRelationshipNameLocalState,
  ] = useState("");
  const [familiarAuthMethodLocalState, setFamiliarAuthMethodLocalState] =
    useState(0);
  const [
    familiarAuthMethodsListLocalState,
    setFamiliarAuthMethodsListLocalState,
  ]: any[] = useState([]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewFamiliar, setIsSubmittingNewFamiliar] = useState(false);
  const [isSubmittingGoToListOfRelatives, setIsSubmittingGoToListOfRelatives] =
    useState(false);
  const [showErrorMessageUserFamiliar, setShowErrorMessageUserFamiliar] =
    useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const {
    data: relationshipTypesData,
    isLoading: relationshipTypesLoading,
    isFetching: relationshipTypesFetching,
    error: relationshipTypesError,
  } = useGetAllRelationshipTypesQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: gendersData,
    isLoading: gendersLoading,
    isFetching: gendersFetching,
    error: gendersError,
  } = useGetAllGendersQuery(null);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [
    addAuthFamiliarToPatient,
    {
      data: addAuthFamiliarToPatientData,
      isLoading: addAuthFamiliarToPatientLoading,
      isSuccess: addAuthFamiliarToPatientSuccess,
      isError: addAuthFamiliarToPatientError,
    },
  ] = useCreateFamiliarMutation({
    fixedCacheKey: "addAuthFamiliarToPatientData",
  });

  useEffect(() => {
    if (
      !userPatientLoading &&
      !userPatientFetching &&
      userPatientData &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
    }
    if (!idTypesLoading && !idTypesFetching && idTypesData) {
      dispatch(setIdTypesUserFamiliar(idTypesData));
    }
    if (idTypesError) {
      dispatch(
        setErrorsUserFamiliar(
          "¡No se pudo obtener los tipos de identificación!"
        )
      );
      setShowErrorMessageUserFamiliar(true);
      dispatch(setIdTypesUserFamiliar(idTypesData));
    }
    if (!gendersLoading && !gendersFetching && gendersData) {
      setFamiliarGenderListLocalState(gendersData);
    }
    if (gendersError) {
      dispatch(
        setErrorsUserFamiliar("¡No se pudo obtener los tipos de géneros!")
      );
      setShowErrorMessageUserFamiliar(true);
      setFamiliarGenderListLocalState(gendersData);
    }
    if (
      !relationshipTypesLoading &&
      !relationshipTypesFetching &&
      relationshipTypesData
    ) {
      setFamiliarRelationshipListLocalState(relationshipTypesData);
    }
    if (relationshipTypesError) {
      dispatch(
        setErrorsUserFamiliar("¡No se pudo obtener los tipos de parentesco!")
      );
      setShowErrorMessageUserFamiliar(true);
      setFamiliarRelationshipListLocalState(relationshipTypesData);
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setFamiliarAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserFamiliar(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessageUserFamiliar(true);
      setFamiliarAuthMethodsListLocalState(authMethodData);
    }
  }, [
    idUserPatientState,
    userPatientData,
    userPatientLoading,
    userPatientFetching,
    idTypesData,
    idTypesLoading,
    idTypesFetching,
    idTypesError,
    gendersData,
    gendersLoading,
    gendersFetching,
    gendersLoading,
    authMethodData,
    authMethodLoading,
    authMethodFetching,
    authMethodError,
    relationshipTypesData,
    relationshipTypesLoading,
    relationshipTypesFetching,
    relationshipTypesError,
  ]);

  const handleAddAuthFamiliar = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewFamiliar(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewFamiliar(true);

      console.log("nombre", familiarNameLocalState);
      console.log("apellido", familiarLastNameLocalState);
      console.log("tipo de id", familiarIdTypeLocalState);
      console.log("numero de id", familiarIdNumberLocalState);
      console.log("sexo", familiarGenderLocalState);
      console.log("email", familiarEmailLocalState);
      console.log("celular", familiarCellphoneLocalState);
      console.log("metodo", familiarAuthMethodLocalState);
      console.log("parentesco", familiarRelationshipLocalState);

      const response: any = await addAuthFamiliarToPatient({
        patientId: idUserPatientState,
        newFamiliar: {
          name: familiarNameLocalState,
          last_name: familiarLastNameLocalState,
          user_id_type: familiarIdTypeLocalState,
          id_number: familiarIdNumberLocalState,
          user_gender: familiarGenderLocalState,
          email: familiarEmailLocalState,
          cellphone: familiarCellphoneLocalState,
          authentication_method: familiarAuthMethodLocalState,
          rel_with_patient: familiarRelationshipLocalState,
        },
      });

      var addAuthFamiliarError = response.error;

      var addAuthFamiliarValidationData = response.data?.message;

      var addAuthFamiliarSuccess = response.data;

      console.log("RESPONSE", response);

      console.log("ERROR", addAuthFamiliarError);
      console.log("SUCCESS", addAuthFamiliarSuccess);
      console.log("VALIDATION", addAuthFamiliarValidationData);

      if (addAuthFamiliarError || addAuthFamiliarValidationData) {
        const errorMessage = addAuthFamiliarError?.data.message;
        const validationDataMessage = addAuthFamiliarValidationData;

        if (
          Array.isArray(errorMessage) ||
          Array.isArray(validationDataMessage)
        ) {
          dispatch(setErrorsUserFamiliar(errorMessage[0]));
          dispatch(setErrorsUserFamiliar(validationDataMessage[0]));
          setShowErrorMessageUserFamiliar(true);
        }
        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsUserFamiliar(errorMessage));
          dispatch(setErrorsUserFamiliar(validationDataMessage));
          setShowErrorMessageUserFamiliar(true);
        }
      }

      if (addAuthFamiliarSuccess) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewFamiliar(false);
    }
  };

  const handleOnChangeSelectRelationship = (value: number) => {
    setFamiliarRelationshipLocalState(value);

    const selectedType: any = familiarRelationshipListLocalState?.find(
      (type: any) => type.id === value
    );
    setFamiliarRelationshipNameLocalState(selectedType?.name);
  };

  const handleOnChangeSelectIdType = (value: number) => {
    setFamiliarIdTypeLocalState(value);

    const selectedType: any = idTypesListFamiliarState?.find(
      (type: any) => type.id === value
    );
    setFamiliarIdTypeNameLocalState(selectedType?.name);
  };

  const handleGoToListOfRelatives = async () => {
    try {
      setIsSubmittingGoToListOfRelatives(true);

      await router.replace("/patient/homepage/family_nucleus", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToListOfRelatives(false);
      setModalIsOpenSuccess(false);
    }
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserFamiliar([]));
    setShowErrorMessageUserFamiliar(false);
  };

  const handleInputInsertNameChange = (e: any) => {
    const uppercasedValue = e.target.value.toUpperCase();

    setFamiliarNameLocalState(uppercasedValue);
  };

  const handleInputInsertLastNameChange = (e: any) => {
    const uppercasedValue = e.target.value.toUpperCase();

    setFamiliarLastNameLocalState(uppercasedValue);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "center",
        paddingInline: "31px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          paddingBlock: "7px",
          paddingInline: "7px",
        }}
      >
        <Button
          style={{
            paddingInline: "7px",
            color: "#015E90",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="link"
          size="large"
          className="back-to-homepage-button"
          icon={<IoMdArrowRoundBack size={17} />}
          onClick={() => {
            router.push("/patient/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      <Card
        key={"card-add-auth-familiar-form"}
        style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {modalIsOpenConfirm && (
          <CustomModalTwoOptions
            key={"custom-confirm-modal-add-auth-familiar"}
            openCustomModalState={modalIsOpenConfirm}
            iconCustomModal={<FcInfo size={77} />}
            titleCustomModal="¿Deseas agregar un familiar autorizado?"
            subtitleCustomModal={
              <p>
                Se agregará el familiar <b>{familiarNameLocalState},</b> con
                tipo de identificación&nbsp;
                <b>{familiarIdTypeNameLocalState},</b>&nbsp;número de
                identificación&nbsp;
                <b>{familiarIdNumberLocalState},</b>&nbsp;con tipo de
                parentesco:&nbsp;<b>{familiarRelationshipNameLocalState}</b>
              </p>
            }
            handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
            handleConfirmCustomModal={handleConfirmDataModal}
            isSubmittingConfirm={isSubmittingNewFamiliar}
            handleClickCustomModal={handleButtonClick}
          ></CustomModalTwoOptions>
        )}

        {modalIsOpenSuccess && (
          <CustomModalNoContent
            key={"custom-success-modal-add-auth-familiar"}
            widthCustomModalNoContent={"54%"}
            openCustomModalState={modalIsOpenSuccess}
            closableCustomModal={false}
            maskClosableCustomModal={false}
            contentCustomModal={
              <CustomResultOneButton
                key={"auth-familiar-created-custom-result"}
                statusTypeResult={"success"}
                titleCustomResult="¡Familiar Autorizado Agregado Correctamente!"
                subtitleCustomResult="El familiar ha sido agregado a su lista de parientes autorizados para ver y solicitar documentos médicos de usted."
                handleClickCustomResult={handleGoToListOfRelatives}
                isSubmittingButton={isSubmittingGoToListOfRelatives}
                textButtonCustomResult="Ver lista de familiares"
              />
            }
          ></CustomModalNoContent>
        )}

        {showErrorMessageUserFamiliar && (
          <CustomMessage
            typeMessage="error"
            message={
              userFamiliarErrorsState?.toString() || "¡Error en la petición!"
            }
          />
        )}

        <Form
          id="add-relative-form"
          name="add-relative-form"
          className="add-relative-form"
          onFinish={handleAddAuthFamiliar}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-add-relative-form"
            style={{
              ...titleStyleCss,
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            Agregar familiar autorizado
          </h2>

          <Form.Item
            name="new-familiar-relationship-with-patient"
            label="Tipo de parentesco"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor selecciona el tipo de parentesco con el familiar!",
              },
            ]}
          >
            {idTypesLoading && idTypesFetching && !idTypesData ? (
              <CustomSpin />
            ) : (
              <Select
                value={familiarRelationshipLocalState}
                placeholder="Parentesco con familiar"
                onChange={handleOnChangeSelectRelationship}
              >
                {familiarRelationshipListLocalState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            name="new-familiar-name"
            label="Nombre(s) del familiar"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el nombre del familiar!",
              },
              {
                min: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              {
                max: 31,
                message: "El nombre no puede tener más de 31 caracteres",
              },
              {
                pattern: /^[A-Z\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas y espacios",
              },
            ]}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="string"
              value={familiarNameLocalState}
              placeholder="Nombre(s) completos"
              onChange={handleInputInsertNameChange}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="new-familiar-lastname"
            label="Apellido(s) del familiar"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el apellido del familiar!",
              },
              {
                min: 4,
                message: "El apellido debe tener al menos 4 caracteres",
              },
              {
                max: 31,
                message: "El apellido no puede tener más de 31 caracteres",
              },
              {
                pattern: /^[A-Z\s]*$/,
                message:
                  "El apellido solo puede contener letras mayúsculas y espacios",
              },
            ]}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="string"
              value={familiarLastNameLocalState}
              placeholder="Apellido(s) completos"
              onChange={handleInputInsertLastNameChange}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="new-familiar-id-types"
            label="Tipo de identificación del familiar"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor selecciona el tipo de identificación del familiar!",
              },
            ]}
          >
            {idTypesLoading && idTypesFetching && !idTypesData ? (
              <CustomSpin />
            ) : (
              <Select
                value={familiarIdTypeLocalState}
                placeholder="Tipo de identificación"
                onChange={handleOnChangeSelectIdType}
              >
                {idTypesListFamiliarState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            name="new-familiar-id-number"
            label="Número de identificación del familiar"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el número de identificación del familiar!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de identificación sin puntos!",
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
              type="number"
              value={familiarIdNumberLocalState}
              placeholder="Número de identificación"
              onChange={(e) => {
                setFamiliarIdNumberLocalState(parseInt(e.target.value, 10));
              }}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="new-familiar-gender"
            label="Sexo del familiar"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona el tipo de sexo del familiar!",
              },
            ]}
          >
            {gendersLoading && gendersFetching && !gendersData ? (
              <CustomSpin />
            ) : (
              <Select
                value={familiarGenderLocalState}
                placeholder="Selecciona sexo"
                onChange={(e) => {
                  setFamiliarGenderLocalState(e);
                }}
              >
                {familiarGenderListLocalState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            name="new-familiar-cellphone"
            label="Celular del familiar"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el número de celular del familiar!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de celular sin puntos ni comas!",
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
              prefix={<FiPhone className="site-form-item-icon" />}
              type="number"
              value={familiarCellphoneLocalState}
              placeholder="Número de celular"
              onChange={(e) =>
                setFamiliarCellphoneLocalState(parseInt(e.target.value, 10))
              }
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="new-familiar-email"
            label="Correo electrónico del familiar"
            style={{ marginBottom: "13px" }}
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
              type="string"
              value={familiarEmailLocalState}
              placeholder="Correo electrónico"
              onChange={(e) => {
                setFamiliarEmailLocalState(e.target.value);
              }}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="radio-select-auth-method"
            label="Método de autenticación del familiar"
            style={{ marginBottom: 22 }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona un método de autenticación!",
              },
            ]}
          >
            <Radio.Group
              value={familiarAuthMethodLocalState}
              onChange={(e) => setFamiliarAuthMethodLocalState(e.target.value)}
              style={{ textAlign: "start" }}
            >
              <Space size={"small"} direction="horizontal">
                {familiarAuthMethodsListLocalState?.map((option: any) => (
                  <Radio key={option.id} value={option.id}>
                    {option.name}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="familiar-whatsapp-register"
            label="WhatsApp del familiar (opcional)"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de WhatsApp sin puntos ni comas!",
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
              prefix={<WhatsAppOutlined className="site-form-item-icon" />}
              type="number"
              value={familiarWhatsappLocalState}
              placeholder="Número de WhatsApp"
              onChange={(e) => setFamiliarWhatsappLocalState(e.target.value)}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="checkbox-data-autorization"
            valuePropName="checked"
            style={{ textAlign: "center", marginBottom: 13 }}
            rules={[
              {
                validator: checkboxValidator,
              },
            ]}
          >
            <div style={{ marginBlock: 7 }}>
              <div style={{ marginBottom: "13px" }}>
                <a
                  className="data-processing-autorization-link"
                  href={
                    process.env.NEXT_PUBLIC_DATA_PROCESSING_AUTORIZATION_LINK
                  }
                  target="_blank"
                  style={{ textDecoration: "underline" }}
                >
                  Leer Política de Tratamiento de Datos
                </a>
              </div>
              <Checkbox
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              >
                Acepto las políticas de tratamiento de datos personales
              </Checkbox>
            </div>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: "13px" }}>
            {isSubmittingConfirmModal && !modalIsOpenConfirm ? (
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
                className="create-medical-req-form-button"
                onClick={handleButtonClick}
              >
                Agregar familiar
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default AddRelativeForm;
