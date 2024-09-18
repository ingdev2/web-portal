export const checkboxProcessingPersonalDataValidator = (
  _: any,
  value: boolean
) => {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(
        new Error(
          "¡Para continuar debes aceptar las políticas de tratamientos de datos!"
        )
      );
    } else {
      resolve(
        "¡El usuario aceptó términos y condiciones de tratamiento de datos!"
      );
    }
  });
};

export const checkboxMessagesValidator = (_: any, value: boolean) => {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(
        new Error(
          "¡Para continuar debes aceptar recibir mensajes informativos vía email o celular!"
        )
      );
    } else {
      resolve("¡El usuario aceptó recibir mensajes vía email o celular!");
    }
  });
};
