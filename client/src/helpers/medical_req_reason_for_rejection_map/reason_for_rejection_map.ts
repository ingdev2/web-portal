export const reasonForRejectionMap = (reasons: any[]) => {
  const reasonForRejectionMap: { [key: number]: string } = {};
  reasons?.forEach((reason) => {
    reasonForRejectionMap[reason.id] = reason.rejection_title;
  });
  return reasonForRejectionMap;
};
