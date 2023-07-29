export const getGenders = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/gender/`
  );
  const data = await response.json();

  return data;
};
