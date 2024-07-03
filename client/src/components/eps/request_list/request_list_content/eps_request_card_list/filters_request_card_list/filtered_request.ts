export const filterRequests = (
  requests: MedicalReq[],
  filterTypes: number[],
  filterStatus: number[]
) => {
  return requests.filter((request) => {
    const typeMatches =
      filterTypes.length > 0
        ? filterTypes.includes(request.requirement_type)
        : true;

    const statusMatches =
      filterStatus.length > 0
        ? filterStatus.includes(request.requirement_status)
        : true;

    return typeMatches && statusMatches;
  });
};
