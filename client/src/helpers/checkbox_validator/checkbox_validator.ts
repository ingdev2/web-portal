export const checkboxValidator = (_: any, value: boolean) => {
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
