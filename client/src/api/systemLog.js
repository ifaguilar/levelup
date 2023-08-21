export const getSystemLogs = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/system_log`
  );
  const data = await response.json();

  return data;
};
