"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Form, Select } from "antd";
import { GrSend } from "react-icons/gr";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import TextArea from "antd/es/input/TextArea";
import { FcInfo } from "react-icons/fc";
import { titleStyleCss } from "@/theme/text_styles";

import { setErrorsAdmin } from "@/redux/features/admin/adminSlice";

import { useForwardToAnotherAreaMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import {
  setAreaRedirectionMessageMedicalReq,
  setCurrentlyInAreaMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";

const SendToAnotherAreaButton: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);

  const [
    companyAreaNumberAdminLocalState,
    setCompanyAreaNumberAdminLocalState,
  ] = useState(0);
  const [
    adminCompanyAreasListLocalState,
    setAdminCompanyAreasListLocalState,
  ]: any = useState([]);
  const [
    areaRedirectionMessageLocalState,
    setAreaRedirectionMessageLocalState,
  ] = useState("");

  const [
    isSubmittingSendMedicalReqToAnotherArea,
    setIsSubmittingSendMedicalReqToAnotherArea,
  ] = useState(false);
  const [successMessageAdmin, setSuccessMessageAdmin] = useState("");
  const [showSuccessMessageAdmin, setShowSuccessMessageAdmin] = useState(false);
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const [showCustomConfirmModal, setShowCustomConfirmModal] = useState(false);

  const tableRowIdState = useAppSelector((state) => state.modal.tableRowId);

  const adminErrorsState = useAppSelector((state) => state.admin.errors);

  const [
    sendToAnotherAreaButton,
    {
      data: sendToAnotherAreaButtonData,
      isLoading: sendToAnotherAreaButtonLoading,
      isSuccess: sendToAnotherAreaButtonFetching,
      isError: sendToAnotherAreaButtonError,
    },
  ] = useForwardToAnotherAreaMutation({
    fixedCacheKey: "sendToAnotherAreaButtonData",
  });

  const {
    data: companyAreasData,
    isLoading: companyAreasLoading,
    isFetching: companyAreasFetching,
    error: companyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  useEffect(() => {
    if (companyAreasData && !companyAreasLoading && !companyAreasFetching) {
      setAdminCompanyAreasListLocalState(companyAreasData);
    }
    if (companyAreasError) {
      dispatch(setErrorsAdmin("¡No se pudo obtener las áreas de empresas!"));
      setShowErrorMessageAdmin(true);
      setAdminCompanyAreasListLocalState(companyAreasData);
    }
  }, [companyAreasData, companyAreasError]);

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingSendMedicalReqToAnotherArea(true);

      const response: any = await sendToAnotherAreaButton({
        reqId: tableRowIdState,
        sendToAnotherArea: {
          currently_in_area: companyAreaNumberAdminLocalState,
          area_redirection_message: areaRedirectionMessageLocalState,
        },
      });

      var sendToAnotherAreaSuccess = response.data;

      var sendToAnotherAreaError = response.error;

      if (sendToAnotherAreaError?.status !== 202) {
        const errorMessage = sendToAnotherAreaError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsAdmin(errorMessage[0]));

          setShowErrorMessageAdmin(true);
        }

        if (typeof errorMessage === "string") {
          dispatch(setErrorsAdmin(errorMessage));

          setShowErrorMessageAdmin(true);
        }
      }

      if (sendToAnotherAreaSuccess?.status === 202 && !sendToAnotherAreaError) {
        const successMessage = sendToAnotherAreaSuccess?.message;

        setSuccessMessageAdmin(successMessage);
        setShowSuccessMessageAdmin(true);

        setShowCustomConfirmModal(false);

        setIsModalVisibleLocalState(false);

        dispatch(
          setCurrentlyInAreaMedicalReq(companyAreaNumberAdminLocalState)
        );
        dispatch(
          setAreaRedirectionMessageMedicalReq(areaRedirectionMessageLocalState)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingSendMedicalReqToAnotherArea(false);
    }
  };

  const handleCorrectData = () => {
    try {
      dispatch(setCurrentlyInAreaMedicalReq(0));
      dispatch(setAreaRedirectionMessageMedicalReq(""));

      setShowCustomConfirmModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingSendMedicalReqToAnotherArea(false);
    }
  };

  const handleOnChangeSelectCompanyArea = (value: number) => {
    setCompanyAreaNumberAdminLocalState(value);

    const selectedCompanyArea: any = adminCompanyAreasListLocalState?.find(
      (type: any) => type.id === value
    );
  };

  const handleButtonClick = () => {
    dispatch(setErrorsAdmin([]));
    setShowErrorMessageAdmin(false);
  };

  return (
    <>
      {showErrorMessageAdmin && (
        <CustomMessage
          typeMessage="error"
          message={adminErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageAdmin && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageAdmin?.toString() ||
            `¡Solicitud enviada correctamente!`
          }
        />
      )}

      {showCustomConfirmModal && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-send-to-another-area"}
          iconCustomModal={<FcInfo size={77} />}
          openCustomModalState={showCustomConfirmModal}
          titleCustomModal="¿Deseas enviar esta solicitud a otra área?"
          subtitleCustomModal="Esta solicitud se enviará al área que seleccionaste en la pantalla anterior."
          handleCancelCustomModal={() => {
            setShowCustomConfirmModal(false);
          }}
          handleConfirmCustomModal={handleConfirmDataModal}
          handleClickCustomModal={handleButtonClick}
          isSubmittingConfirm={isSubmittingSendMedicalReqToAnotherArea}
        ></CustomModalTwoOptions>
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-send-to-another-area-action"}
          widthCustomModalNoContent={"45%"}
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            setIsModalVisibleLocalState(false);
          }}
          contentCustomModal={
            <Form
              id="create-admin-form"
              name="create-admin-form"
              className="create-admin-form"
              onFinish={handleCorrectData}
              initialValues={{ remember: false }}
              autoComplete="false"
              layout="vertical"
              style={{
                width: "100%",
              }}
            >
              <h2
                className="title-create-admin-form"
                style={{
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBottom: "22px",
                }}
              >
                Enviar solicitud a otra área
              </h2>

              <Form.Item
                name="areas-company-send-to-another-area"
                label="Área a la que desea enviar la solicitud:"
                tooltip="Aquí debes seleccionar el área de la empresa en la que se debe enviar esta solicitud para que ellos la gestionen."
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor selecciona el área de empresa a la que deseas enviar la solicitud!",
                  },
                ]}
              >
                {companyAreasLoading ? (
                  <CustomSpin />
                ) : (
                  <Select
                    value={companyAreaNumberAdminLocalState}
                    placeholder="Seleccionar área"
                    onChange={handleOnChangeSelectCompanyArea}
                  >
                    {adminCompanyAreasListLocalState?.map((option: any) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                name="especifications-patient"
                label="Observaciones y/o detalles"
                tooltip="Aquí debes ingresar observaciones o detalles adicionales que debe tener en cuenta la otra área."
                style={{ marginBottom: "31px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor, especifique detalles a tener en cuenta por la otra área en esta solicitud!",
                  },
                ]}
              >
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  maxLength={301}
                  value={areaRedirectionMessageLocalState}
                  placeholder="Especifique detalles adicionales a tener en cuenta por la otra área."
                  onChange={(e) =>
                    setAreaRedirectionMessageLocalState(e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item style={{ textAlign: "center", marginBottom: "7px" }}>
                {isSubmittingSendMedicalReqToAnotherArea ? (
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
                    className="send-to-another-area-form-button"
                    onClick={handleButtonClick}
                  >
                    Enviar al área
                  </Button>
                )}
              </Form.Item>
            </Form>
          }
        />
      )}

      <Button
        className="send-to-another-area-button"
        size="large"
        style={{
          backgroundColor: "#013B5A",
          color: "#F7F7F7",
          borderRadius: "31px",
          paddingInline: "31px",
          marginInline: "22px",
        }}
        onClick={() => {
          setIsModalVisibleLocalState(true);
        }}
      >
        <div
          style={{
            minWidth: "137px",
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <GrSend size={17} />
          &nbsp;Enviar a otra área
        </div>
      </Button>
    </>
  );
};

export default SendToAnotherAreaButton;
