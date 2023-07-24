import { DATE_TIME_OPTIONS } from "../constants/constants";

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat(undefined, DATE_TIME_OPTIONS);

  return formatter.format(date);
};
