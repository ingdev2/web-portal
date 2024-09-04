export const filterRelatives = (
  relatives: Familiar[],
  filterRelationship: number[]
) => {
  return relatives.filter((request) => {
    const relationshipMatches =
      filterRelationship.length > 0
        ? filterRelationship.includes(request.rel_with_patient)
        : true;

    return relationshipMatches;
  });
};
