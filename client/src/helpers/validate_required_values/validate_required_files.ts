export const validateRequiredFiles = (
  filesState: Express.Multer.File[],
  errorMessage: string
) => {
  return (_: any, value: any) => {
    if (!filesState || filesState.length === 0) {
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.resolve();
  };
};

export const validateRequiredDate = (
  dateState: string,
  errorMessage: string
) => {
  return (_: any, value: any) => {
    if (!dateState || dateState.length === 0) {
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.resolve();
  };
};
