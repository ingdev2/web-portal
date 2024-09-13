export const isAdminInPositionLevel = (
  adminPositionLevelId: number | undefined,
  targetLevelsIds: number[] | undefined
) => {
  return targetLevelsIds?.includes(adminPositionLevelId || -1);
};
