"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, CheckboxProps, Col, Divider } from "antd";
import EpsRegistrationFormData from "./EpsRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsUserEps } from "@/redux/features/eps/epsSlice";

import { useCreateUserEpsMutation } from "@/redux/apis/register/registerUsersApi";
import { useGetAllEpsCompanyQuery } from "@/redux/apis/eps_company/epsCompanyApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

import { checkboxProcessingPersonalDataValidator } from "@/helpers/checkbox_validator/checkbox_validator";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

const EpsRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userEpsErrorsState = useAppSelector((state) => state.eps.errors);

  const [epsNameLocalState, setEpsNameLocalState] = useState("");
  const [epsLastNameLocalState, setEpsLastNameLocalState] = useState("");
  const [epsIdTypeLocalState, setEpsIdTypeLocalState] = useState(0);
  const [epsIdTypeNameLocalState, setEpsIdTypeNameLocalState] = useState("");
  const [epsIdTypesListLocalState, setEpsIdTypesListLocalState]: any[] =
    useState([]);
  const [epsIdNumberLocalState, setEpsIdNumberLocalState] = useState(0);
  const [epsGenderLocalState, setEpsGenderLocalState] = useState(0);
  const [epsGenderListLocalState, setEpsGenderListLocalState]: any[] = useState(
    []
  );
  const [epsEmailLocalState, setEpsEmailLocalState] = useState("");
  const [epsCellphoneLocalState, setEpsCellphoneLocalState] = useState(0);
  const [
    companyAreaNumberUserEpsLocalState,
    setCompanyAreaNumberUserEpsLocalState,
  ] = useState(0);
  const [epsCompanyAreasListLocalState, setEpsCompanyAreasListLocalState]: any =
    useState([]);
  const [
    epsCompanyNumberUserEpsLocalState,
    setEpsCompanyNumberUserEpsLocalState,
  ] = useState(0);
  const [epsCompanyListLocalState, setEpsCompanyListLocalState]: any = useState(
    []
  );
  const [epsCompanyNameUserEpsLocalState, setEpsCompanyNameUserEpsLocalState] =
    useState("");
  const [epsAuthMethodLocalState, setEpsAuthMethodLocalState] = useState(0);
  const [epsAuthMethodsListLocalState, setEpsAuthMethodsListLocalState]: any[] =
    useState([]);
  const [passwordUserEpsLocalState, setPasswordUserEpsLocalState] =
    useState("");

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewUserEps, setIsSubmittingNewUserEps] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);
  const [showErrorMessageUserEps, setShowErrorMessageUserEps] = useState(false);

  const {
    data: epsCompanyData,
    isLoading: epsCompanyLoading,
    isFetching: epsCompanyFetching,
    error: epsCompanyError,
  } = useGetAllEpsCompanyQuery(null);

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
    data: companyAreaData,
    isLoading: companyAreaLoading,
    isFetching: companyAreaFetching,
    error: companyAreaError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [
    createUserEps,
    {
      data: createUserEpsData,
      isLoading: createUserEpsLoading,
      isSuccess: createUserEpsSuccess,
      isError: createUserEpsError,
    },
  ] = useCreateUserEpsMutation({
    fixedCacheKey: "createUserEpsData",
  });

  useEffect(() => {
    if (!epsCompanyLoading && !epsCompanyFetching && epsCompanyData) {
      setEpsCompanyListLocalState(epsCompanyData);
    }
    if (epsCompanyError) {
      dispatch(setErrorsUserEps("¡No se pudo obtener las empresas!"));
      setShowErrorMessageUserEps(true);
      setEpsCompanyListLocalState(epsCompanyData);
    }
    if (!idTypesLoading && !idTypesFetching && idTypesData) {
      setEpsIdTypesListLocalState(idTypesData);
    }
    if (idTypesError) {
      dispatch(
        setErrorsUserEps("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageUserEps(true);
      setEpsIdTypesListLocalState(idTypesData);
    }
    if (!gendersLoading && !gendersFetching && gendersData) {
      setEpsGenderListLocalState(gendersData);
    }
    if (gendersError) {
      dispatch(setErrorsUserEps("¡No se pudo obtener los tipos de géneros!"));
      setShowErrorMessageUserEps(true);
      setEpsGenderListLocalState(gendersData);
    }
    if (!companyAreaLoading && !companyAreaFetching && companyAreaData) {
      setEpsCompanyAreasListLocalState(companyAreaData);
    }
    if (companyAreaError) {
      dispatch(setErrorsUserEps("¡No se pudo obtener las áreas de empresas!"));
      setShowErrorMessageUserEps(true);
      setEpsCompanyAreasListLocalState(companyAreaData);
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setEpsAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserEps("¡No se pudo obtener los métodos de autenticación!")
      );
      setShowErrorMessageUserEps(true);
      setEpsAuthMethodsListLocalState(authMethodData);
    }
  }, [
    epsCompanyData,
    epsCompanyError,
    idTypesData,
    idTypesError,
    gendersData,
    gendersError,
    companyAreaData,
    companyAreaError,
    authMethodData,
    authMethodError,
    epsNameLocalState,
    epsLastNameLocalState,
    epsCellphoneLocalState,
    epsIdNumberLocalState,
  ]);

  const handleCreateUserEps = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewUserEps(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewUserEps(true);

      const response: any = await createUserEps({
        eps_company: epsCompanyNumberUserEpsLocalState,
        name: epsNameLocalState,
        last_name: epsLastNameLocalState,
        user_id_type: epsIdTypeLocalState,
        id_number: epsIdNumberLocalState,
        user_gender: epsGenderLocalState,
        company_area: companyAreaNumberUserEpsLocalState,
        email: epsEmailLocalState,
        cellphone: epsCellphoneLocalState,
        password: passwordUserEpsLocalState,
        authentication_method: epsAuthMethodLocalState,
      });

      var createUserEpsError = response.error;

      var createUserEpsValidationData = response.data?.message;

      var createUserEpsSuccess = response.data;

      if (createUserEpsError || createUserEpsValidationData) {
        const errorMessage = createUserEpsError?.data.message;
        const validationDataMessage = createUserEpsValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserEps(errorMessage[0]));

          setShowErrorMessageUserEps(true);
        }
        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUserEps(validationDataMessage[0]));

          setShowErrorMessageUserEps(true);
        }

        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsUserEps(errorMessage));
          dispatch(setErrorsUserEps(validationDataMessage));
          setShowErrorMessageUserEps(true);
        }
      }

      if (
        createUserEpsSuccess &&
        !createUserEpsError &&
        !createUserEpsValidationData
      ) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewUserEps(false);
    }
  };

  const handleOnChangeSelectEpsCompany = (value: number) => {
    setEpsCompanyNumberUserEpsLocalState(value);

    const selectedEpsCompany: any = epsCompanyListLocalState?.find(
      (type: any) => type.id === value
    );

    setEpsCompanyNameUserEpsLocalState(selectedEpsCompany?.name);
  };

  const handleOnChangeSelectIdType = (value: number) => {
    setEpsIdTypeLocalState(value);

    const selectedType: any = epsIdTypesListLocalState?.find(
      (type: any) => type.id === value
    );

    setEpsIdTypeNameLocalState(selectedType?.name);
  };

  const handleOnChangeSelectCompanyArea = (value: number) => {
    setCompanyAreaNumberUserEpsLocalState(value);

    const selectedCompanyArea: any = epsCompanyAreasListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await router.replace("/login", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
      setModalIsOpenSuccess(false);
    }
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserEps([]));
    setShowErrorMessageUserEps(false);
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
      <Card
        key={"card-create-user-eps-form"}
        style={{
          width: "100%",
          maxWidth: "450px",
          minWidth: "321px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "54px",
        }}
      >
        {modalIsOpenConfirm && (
          <CustomModalTwoOptions
            key={"custom-confirm-modal-create-user-eps"}
            openCustomModalState={modalIsOpenConfirm}
            iconCustomModal={<FcInfo size={77} />}
            titleCustomModal="¿Deseas crear un nuevo colaborador de EPS?"
            subtitleCustomModal={
              <p>
                Se creará el colaborador con nombre <b>{epsNameLocalState},</b>
                &nbsp; con tipo de identificación&nbsp;
                <b>{epsIdTypeNameLocalState},</b>&nbsp;número de
                identificación&nbsp;
                <b>{epsIdNumberLocalState},</b>&nbsp;para la empresa:&nbsp;
                <b>{epsCompanyNameUserEpsLocalState}</b>
              </p>
            }
            handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
            handleConfirmCustomModal={handleConfirmDataModal}
            isSubmittingConfirm={isSubmittingNewUserEps}
            handleClickCustomModal={handleButtonClick}
          ></CustomModalTwoOptions>
        )}

        {modalIsOpenSuccess && (
          <CustomModalNoContent
            key={"custom-success-modal-create-user-eps"}
            widthCustomModalNoContent={"54%"}
            openCustomModalState={modalIsOpenSuccess}
            closableCustomModal={false}
            maskClosableCustomModal={false}
            contentCustomModal={
              <CustomResultOneButton
                key={"user-eps-created-custom-result"}
                statusTypeResult={"success"}
                titleCustomResult="¡Colaborador de EPS creado correctamente!"
                subtitleCustomResult="El colaborar ha sido agregado a la lista de usuarios de EPS."
                handleClickCustomResult={handleGoToLogin}
                isSubmittingButton={isSubmittingGoToLogin}
                textButtonCustomResult="Ingresar al portal"
              />
            }
          ></CustomModalNoContent>
        )}

        {showErrorMessageUserEps && (
          <CustomMessage
            typeMessage="error"
            message={userEpsErrorsState?.toString() || "¡Error en la petición!"}
          />
        )}

        <EpsRegistrationFormData
          handleCreateUserEpsDataForm={handleCreateUserEps}
          epsCompanyLoadingDataForm={epsCompanyLoading}
          epsCompanyListDataForm={epsCompanyListLocalState}
          epsCompanyValueDataForm={epsCompanyNumberUserEpsLocalState}
          handleOnChangeEpsCompanyDataForm={handleOnChangeSelectEpsCompany}
          epsNameDataForm={epsNameLocalState}
          handleOnChangeEpsNameDataForm={(e) => {
            setEpsNameLocalState(e.target.value.toUpperCase());
          }}
          epsLastNameDataForm={epsLastNameLocalState}
          handleOnChangeEpsLastNameDataForm={(e) => {
            setEpsLastNameLocalState(e.target.value.toUpperCase());
          }}
          idTypeSelectorLoadingDataForm={
            idTypesLoading && idTypesFetching && !idTypesData
          }
          epsIdTypeValueDataForm={epsIdTypeLocalState}
          handleOnChangeSelectIdTypeDataForm={handleOnChangeSelectIdType}
          epsIdTypeListDataForm={epsIdTypesListLocalState}
          epsIdNumberDataForm={epsIdNumberLocalState}
          handleOnChangeEpsIdNumberDataForm={(e) => {
            setEpsIdNumberLocalState(parseInt(e.target.value, 10));
          }}
          genderSelectorLoadingDataForm={
            gendersLoading && gendersFetching && !gendersData
          }
          epsGenderValueDataForm={epsGenderLocalState}
          companyAreasLoadingDataForm={companyAreaLoading}
          companyAreaValueDataForm={companyAreaNumberUserEpsLocalState}
          handleOnChangeCompanyAreaDataForm={handleOnChangeSelectCompanyArea}
          epsCompanyAreasListDataForm={epsCompanyAreasListLocalState}
          handleOnChangeSelectGenderDataForm={(e) => {
            setEpsGenderLocalState(e);
          }}
          epsGenderListDataForm={epsGenderListLocalState}
          epsEmailDataForm={epsEmailLocalState}
          handleOnChangeEpsEmailDataForm={(e) => {
            setEpsEmailLocalState(e.target.value.toLowerCase());
          }}
          epsCellphoneDataForm={epsCellphoneLocalState}
          handleOnChangeEpsCellphoneDataForm={(e) =>
            setEpsCellphoneLocalState(parseInt(e.target.value, 10))
          }
          epsAuthMethodValueDataForm={epsAuthMethodLocalState}
          handleOnChangeSelectAuthMethodDataForm={(e) =>
            setEpsAuthMethodLocalState(e.target.value)
          }
          epsAuthMethodListDataForm={epsAuthMethodsListLocalState}
          passwordUserEpsValueDataForm={passwordUserEpsLocalState}
          handleOnChangePasswordUserEpsValueDataForm={(e) =>
            setPasswordUserEpsLocalState(e.target.value.trim())
          }
          checkboxValidatorDataForm={checkboxProcessingPersonalDataValidator}
          isCheckboxCheckedDataForm={isCheckboxChecked}
          handleCheckboxChangeDataForm={handleCheckboxChange}
          buttonSubmitFormLoadingDataForm={
            isSubmittingConfirmModal && !modalIsOpenConfirm
          }
          handleButtonSubmitFormDataForm={handleButtonClick}
          handleOnChangeValidatorPasswordDataForm={(_, value) => {
            if (
              !epsNameLocalState ||
              !epsLastNameLocalState ||
              !epsIdNumberLocalState ||
              !epsCellphoneLocalState
            ) {
              return Promise.resolve();
            }

            const passwordUpperCase = value?.toUpperCase();

            const nameWords = epsNameLocalState?.toUpperCase().split(" ");

            const lastNameWords = epsLastNameLocalState
              ?.toUpperCase()
              .split(" ");

            const idNumber = String(epsIdNumberLocalState);

            const cellphoneNumber = String(epsCellphoneLocalState);

            if (nameWords?.some((word) => passwordUpperCase?.includes(word))) {
              return Promise.reject(
                new Error(
                  "¡La contraseña no puede contener datos del nombre del usuario!"
                )
              );
            }

            if (
              lastNameWords?.some((word) => passwordUpperCase?.includes(word))
            ) {
              return Promise.reject(
                new Error(
                  "¡La contraseña no puede contener datos del apellido del usuario!"
                )
              );
            }

            if (passwordUpperCase?.includes(idNumber)) {
              return Promise.reject(
                new Error(
                  "¡La contraseña no puede contener datos del número de cédula del usuario!"
                )
              );
            }

            if (passwordUpperCase?.includes(cellphoneNumber)) {
              return Promise.reject(
                new Error(
                  "¡La contraseña no puede contener datos del número de celular del usuario!"
                )
              );
            }

            return Promise.resolve();
          }}
        />

        <Divider
          style={{
            fontSize: 13,
            fontWeight: "normal",
            marginBlock: 4,
            borderWidth: 1.3,
          }}
        >
          ¿Ya tienes cuenta?
        </Divider>

        {isSubmittingGoToLogin ? (
          <CustomSpin />
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                paddingInline: 22,
                color: "#015E90",
                borderColor: "#015E90",
                fontWeight: "bold",
                borderRadius: 7,
                borderWidth: 1.3,
                marginTop: 7,
              }}
              htmlType="button"
              className="go-to-login-button"
              onClick={handleGoToLogin}
              onMouseDown={handleButtonClick}
            >
              Ingresar con mi cuenta
            </Button>
          </div>
        )}
      </Card>
    </Col>
  );
};

export default EpsRegistrationForm;
