export const relationshipsWithPatientMap = (types: any[]) => {
  const relationshipsWithPatientMap: { [key: number]: string } = {};
  types?.forEach((type) => {
    relationshipsWithPatientMap[type.id] = type.name;
  });
  return relationshipsWithPatientMap;
};
