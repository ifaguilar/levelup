export const countTickets = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket/count`
  );
  const data = await response.json();

  return data;
};
