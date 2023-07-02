export const getJobs = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/job/`);
  const data = await response.json();

  return data;
};
