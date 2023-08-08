export const getCategory = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/category`);
    const data = await response.json();
  
    return data;
  };
  
  export const getCategoryById = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/category/${id}`
    );
    const data = await response.json();
  
    return data;
  };
  
  export const createCategory = async (values) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
  
    return data;
  };
  
  export const editCategory = async (values, id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/category/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
  
    return data;
  };
  
  export const deleteCategory = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/category/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
  
    return data;
  };
  