export const formatDate = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-CA");
  }

  return "NO REGISTRA";
};

export const formatTime = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-GB", { hour12: true });
  }

  return "NO REGISTRA";
};
