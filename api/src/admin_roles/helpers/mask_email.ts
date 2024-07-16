export const maskEmailAdmin = (email: string): string => {
  const [localPart, domain] = email.split('@');

  const visiblePart = localPart.substring(0, 5);

  const maskedPart = '*'.repeat(localPart.length - 5);

  return `${visiblePart}${maskedPart}@${domain}`;
};
