// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

// interface PatientUsersLoginProps {
//   onSubmit: (userData: {
//     idType: string;
//     idNumber: number;
//     password: string;
//   }) => void;
// }

// const PatientUsersLogin: React.FC<PatientUsersLoginProps> = ({
//   onSubmit,
// }: any) => {
//   const router = useRouter();

//   const [id_type, setIdType] = useState("");
//   const [id_number, setIdNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [idTypeOptions, setIdTypeOptions] = useState([]);
//   const [errors, setErrors] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchIdTypes = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/id-types/getAll`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setIdTypeOptions(data);
//         } else {
//           console.error("Error al obtener los tipos de identificación");
//         }
//       } catch (error) {
//         console.error("Error al procesar la solicitud:", error);
//       }
//     };

//     fetchIdTypes();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setErrors([]);
//     const responseNextAuth = await signIn("credentials", {
//       id_type,
//       id_number,
//       password,
//       redirect: false,
//     });

//     if (responseNextAuth?.error) {
//       setErrors(responseNextAuth.error.split(","));
//       return;
//     }

//     onSubmit({ id_type, id_number, password });
//     router.push("/dashboard-admin");
//   };

//   return (
//     <div>
//       <h2>Iniciar sesión</h2>
//       <form action="verify-user-data" onSubmit={handleSubmit}>
//         <label>
//           Tipo de identificación:
//           <select value={id_type} onChange={(e) => setIdType(e.target.value)}>
//             <option value="">Seleccionar tipo de identificación</option>
//             {idTypeOptions.map((option: any) => (
//               <option key={option.id} value={option.id}>
//                 {option.name}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <label>
//           Número de identificación:
//           <input
//             type="number"
//             value={id_number}
//             onChange={(e) => setIdNumber(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Contraseña:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Ingresar</button>
//       </form>

//       {errors.length > 0 && (
//         <div className="alert-danger">
//           <ul className="error-login-patient">
//             {errors.map((error) => (
//               <li key={error}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientUsersLogin;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

interface PatientUsersLoginProps {
  onSubmit: (userData: {
    idType: string;
    idNumber: number;
    password: string;
  }) => void;
}

const PatientUsersLogin: React.FC<PatientUsersLoginProps> = ({
  onSubmit,
}: any) => {
  const router = useRouter();

  const [id_type, setIdType] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [idTypeOptions, setIdTypeOptions] = useState([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchIdTypes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/id-types/getAll`
        );
        if (response.ok) {
          const data = await response.json();
          setIdTypeOptions(data);
        } else {
          console.error("Error al obtener los tipos de identificación");
        }
      } catch (error) {
        console.error("Error al procesar la solicitud:", error);
      }
    };

    fetchIdTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const responseNextAuth = await signIn("credentials", {
      id_type,
      id_number,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    onSubmit({ id_type, id_number, password });
    router.push("/dashboard-admin");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{ maxWidth: 321 }}
      initialValues={{ remember: false }}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        name="patient-user-id-number"
        label="Número de identificación"
        style={{ textAlign: "center" }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingresa tu número de identificación!",
          },
        ]}
      >
        <Input
          prefix={<IdcardOutlined className="site-form-item-icon" />}
          type="number"
          value={id_number}
          placeholder="Número de identificación"
          onChange={(e) => setIdNumber(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="patient-user-password"
        label="Contraseña"
        style={{ textAlign: "center" }}
        rules={[
          { required: true, message: "¡Por favor ingresa tu contraseña!" },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <center>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recordar datos</Checkbox>
          </Form.Item>
          &emsp;
          <a className="login-form-forgot-patient-user" href="">
            Olvide mi contraseña
          </a>
        </Form.Item>
      </center>

      <Form.Item>
        <center>
          <Button
            style={{ width: 222, borderRadius: 31 }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Ingresar
          </Button>{" "}
          <p></p>
          <hr
            style={{
              width: 222,
            }}
          />
          <a href="">Quiero registrarme</a>
        </center>
      </Form.Item>
    </Form>
  );
};

export default PatientUsersLogin;
