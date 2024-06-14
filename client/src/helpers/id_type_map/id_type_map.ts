export const idTypeMap = (types: any[]) => {
  const idTypeMap: { [key: number]: string } = {};
  types?.forEach((type) => {
    idTypeMap[type.id] = type.name;
  });
  return idTypeMap;
};
