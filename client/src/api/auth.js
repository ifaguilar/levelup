export const login = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const signup = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};
