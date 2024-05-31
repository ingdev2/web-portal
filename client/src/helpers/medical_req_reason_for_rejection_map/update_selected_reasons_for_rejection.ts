export const updateSelectedRequestReasonsForRejection = (
  motiveIds: number[] = [],
  reasonMap: { [key: number]: string },
  setSelectedRequestReasonsForRejectionLocalState: React.Dispatch<
    React.SetStateAction<string[]>
  >
) => {
  const rejectionTitles = motiveIds.map((id) => reasonMap[id]);
  setSelectedRequestReasonsForRejectionLocalState(rejectionTitles);
};
