import { SortRequestsBy } from "../request_details_content/enums/select_sortby.enums";

export const sortRequests = (
  filteredRequests: MedicalReq[],
  sortBy: SortRequestsBy
): MedicalReq[] => {
  if (sortBy === SortRequestsBy.MOST_RECENT) {
    filteredRequests.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === SortRequestsBy.OLDER) {
    filteredRequests.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return filteredRequests;
};
