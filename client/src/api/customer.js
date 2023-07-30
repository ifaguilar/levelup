export const countCustomers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customers/count`
  );
  const data = await response.json();

  return data;
};
