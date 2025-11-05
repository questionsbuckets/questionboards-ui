export const removeCountryCode = (phoneNumber: any, code: any) => {
  if (phoneNumber.startsWith(code)) {
    return phoneNumber.slice(code.length);
  }
  return phoneNumber;
};
