// "use client";

// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";

// import { Button, Card, Col, Divider, Form, Input, Select } from "antd";
// import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
// import PatientModalVerificationCode from "./PatientModalVerificationCode";
// import CustomSpin from "../common/custom_spin/CustomSpin";
// import CustomMessage from "../common/custom_messages/CustomMessage";
// import { titleStyleCss } from "@/theme/text_styles";

// import {
//     setMedicalReqUserPatient,
// setErrorsUserPatient,
// } from "@/redux/features/patient/patientSlice";

// import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
// import { useLoginPatientUsersMutation } from "@/redux/apis/auth/loginUsersApi";

// const CreateRequestForm: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const idTypeOptionsPatient = useAppSelector(
//     (state) => state.patientUserLogin.idTypeOptions
//   );
//   const idTypePatientState = useAppSelector(
//     (state) => state.patientUserLogin.id_type
//   );
//   const idNumberPatientState = useAppSelector(
//     (state) => state.patientUserLogin.id_number
//   );
//   const passwordPatientState = useAppSelector(
//     (state) => state.patientUserLogin.password
//   );
//   const affiliationEpsPatientState = useAppSelector(
//     (state) => state.patient.affiliation_eps
//   );
//   const errorsPatientState = useAppSelector(
//     (state) => state.patientUserLogin.errors
//   );

//   const modalIsOpenPatient = useAppSelector(
//     (state) => state.modal.patientModalIsOpen
//   );

//   const [isSubmittingRegisterPagePatient, setIsSubmittingRegisterPagePatient] =
//     useState(false);
//   const [isSubmittingPatient, setIsSubmittingPatient] = useState(false);
//   const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

//   const {
//     data: idTypesPatientData,
//     isLoading: idTypesPatientLoading,
//     isFetching: idTypesPatientFetching,
//     error: idTypesPatientError,
//   } = useGetAllIdTypesQuery(null);

//   const [
//     loginPatientUsers,
//     {
//       data: isLoginPatientData,
//       isLoading: isLoginPatientLoading,
//       isSuccess: isLoginPatientSuccess,
//       isError: isLoginPatientError,
//     },
//   ] = useLoginPatientUsersMutation({ fixedCacheKey: "loginPatientData" });

//   useEffect(() => {
//     if (
//       !idTypesPatientLoading &&
//       !idTypesPatientFetching &&
//       idTypesPatientData
//     ) {
//       dispatch(setIdTypeOptionsLoginPatient(idTypesPatientData));
//     }
//   }, [idTypesPatientData, idTypesPatientLoading, idTypesPatientFetching]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     try {
//       setIsSubmittingPatient(true);

//       const response: any = await loginPatientUsers({
//         id_type: idTypePatientState,
//         id_number: idNumberPatientState,
//         password: passwordPatientState,
//       });

//       var isLoginUserError = response.error;

//       var isLoginUserSuccess = response.data;

//       if (isLoginUserError) {
//         const errorMessage = isLoginUserError?.data.message;

//         if (Array.isArray(errorMessage)) {
//           dispatch(setErrorsLoginPatient(errorMessage[0]));
//           setShowErrorMessagePatient(true);
//         }
//         if (typeof errorMessage === "string") {
//           dispatch(setErrorsLoginPatient(errorMessage));
//           setShowErrorMessagePatient(true);
//         }
//       }

//       if (isLoginUserSuccess) {
//         dispatch(setErrorsLoginPatient([]));
//         setShowErrorMessagePatient(false);
//         dispatch(setPatientModalIsOpen(true));
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsSubmittingPatient(false);
//     }
//   };

//   const handleButtonClick = () => {
//     dispatch(setErrorsLoginPatient([]));
//     setShowErrorMessagePatient(false);
//   };

//   return (
//     <Card
//       key={"card-patient-user-login-form"}
//       style={{
//         width: "max-content",
//         height: "max-content",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#fcfcfc",
//         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
//         marginBottom: "31px",
//         marginInline: "31px",
//       }}
//     >
//       {modalIsOpenPatient && <PatientModalVerificationCode />}

//       {showErrorMessagePatient && (
//         <CustomMessage
//           typeMessage="error"
//           message={errorsPatientState?.toString() || "¡Error en la petición!"}
//         />
//       )}

//       <Col
//         xs={24}
//         lg={24}
//         style={{ padding: "0 2px", width: "100vw", maxWidth: "321px" }}
//       >
//         <Form
//           id="patient-users-login-form"
//           name="patient-users-login-form"
//           className="patient-users-login-form"
//           onFinish={handleSubmit}
//           initialValues={{ remember: false }}
//           autoComplete="false"
//           layout="vertical"
//         >
//           <h2
//             className="title-login-patient"
//             style={{
//               ...titleStyleCss,
//               textAlign: "center",
//             }}
//           >
//             Ingreso de usuario <br /> Paciente
//           </h2>

//           <Form.Item
//             name="patient-user-id-number"
//             label="Número de identificación"
//             style={{ marginBottom: 7 }}
//             rules={[
//               {
//                 required: true,
//                 message: "¡Por favor ingresa tu número de identificación!",
//               },
//               {
//                 pattern: /^[0-9]+$/,
//                 message:
//                   "¡Por favor ingresa número de identificación sin puntos!",
//               },
//               {
//                 min: 7,
//                 message: "¡Por favor ingresa mínimo 7 números!",
//               },
//               {
//                 max: 11,
//                 message: "¡Por favor ingresa máximo 11 números!",
//               },
//             ]}
//           >
//             <Input
//               prefix={<IdcardOutlined className="site-form-item-icon" />}
//               type="number"
//               value={idNumberPatientState}
//               placeholder="Número de identificación"
//               onChange={(e) =>
//                 dispatch(setIdNumberLoginPatient(e.target.value))
//               }
//               min={0}
//             />
//           </Form.Item>

//           <Form.Item style={{ textAlign: "center" }}>
//             {isSubmittingPatient && isLoginPatientLoading ? (
//               <CustomSpin />
//             ) : (
//               <Button
//                 size="large"
//                 style={{
//                   paddingInline: 62,
//                   borderRadius: 31,
//                   backgroundColor: "#015E90",
//                   color: "#f2f2f2",
//                   marginBottom: 7,
//                 }}
//                 htmlType="submit"
//                 className="patient-login-form-button"
//                 onClick={handleButtonClick}
//               >
//                 Ingresar
//               </Button>
//             )}
//           </Form.Item>
//         </Form>
//       </Col>
//     </Card>
//   );
// };

// export default CreateRequestForm;
