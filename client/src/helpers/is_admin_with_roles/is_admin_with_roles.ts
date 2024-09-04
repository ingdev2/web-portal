export const isAdminWithRoles = (
  adminRole: number | undefined,
  targetRoles: number[] | undefined
) => {
  return targetRoles?.includes(adminRole || -1);
};
