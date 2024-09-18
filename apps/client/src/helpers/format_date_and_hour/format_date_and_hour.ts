export const formatDate = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);

    return date.toISOString().split("T")[0];
  }
};

export const formatTime = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);

    return date.toTimeString().split(" ")[0];
  }
};
