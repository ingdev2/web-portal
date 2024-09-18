export const isAdminInCompanyAreas = (
  adminCompanyAreaId: number | undefined,
  targetAreaIds: number[] | undefined
) => {
  return targetAreaIds?.includes(adminCompanyAreaId || -1);
};
