import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { Button, Modal } from "antd";
import CustomMessage from "../common/custom_messages/CustomMessage";
import { signIn } from "next-auth/react";

const ModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const id_number = useAppSelector((state) => state.userLogin.id_number);

  useEffect(() => {
    if (!id_number) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error en la petición!");
    } else {
      setOpen(true);
    }
  }, [id_number]);

  const handleOk = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setOpen(false);

      const responseNextAuth = await signIn("credentials", {
        id_type,
        id_number,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        dispatch(setErrors(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    <Link href="users_login" />;
  };

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}
      <Modal
        title="Title"
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isSubmitting}
        destroyOnClose={true}
      ></Modal>
    </div>
  );
};

export default ModalVerificationCode;
