export const formatFilingNumber = (filingNumber: string) => {
  const parts = filingNumber.split("-");
  const prefix = parts[0];
  const number = parseInt(parts[1], 10);
  return `${prefix}-${number}`;
};
