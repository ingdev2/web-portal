export const typesMap = (types: any[]) => {
  const typesMap: { [key: number]: string } = {};
  types?.forEach((type) => {
    typesMap[type.id] = type.name;
  });
  return typesMap;
};
