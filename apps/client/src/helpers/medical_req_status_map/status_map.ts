export const statusMap = (statuses: any[]) => {
  const statusMap: { [key: number]: string } = {};
  statuses?.forEach((status) => {
    statusMap[status.id] = status.name;
  });
  return statusMap;
};
