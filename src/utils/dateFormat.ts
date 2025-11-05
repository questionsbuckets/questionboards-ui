export const dateFormat = (utcDate: any) => {
  const date = new Date(utcDate);

  if (isNaN(date.getTime())) {
    return "--";
  }

  // Format only year, month, and day
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "long",
    day: "2-digit",
    // timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-IL", options).format(date);
};
