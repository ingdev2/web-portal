import { SortRelativesBy } from "./enums/select_sortby.enums";

export const sortRelatives = (
  filteredRelatives: Familiar[],
  sortBy: SortRelativesBy
): Familiar[] => {
  if (sortBy === SortRelativesBy.MOST_RECENT) {
    filteredRelatives.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === SortRelativesBy.OLDER) {
    filteredRelatives.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return filteredRelatives;
};
