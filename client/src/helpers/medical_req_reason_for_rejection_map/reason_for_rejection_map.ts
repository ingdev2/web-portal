export const reasonForRejectionMap = (
  reasons: MedicalReqReasonForRejection[]
) => {
  const reasonForRejectionMap: { [key: number]: string } = {};

  reasons?.forEach((reason) => {
    reasonForRejectionMap[reason.id] = reason.reason_message;
  });

  return reasonForRejectionMap;
};
