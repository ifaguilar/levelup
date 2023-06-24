import React, { useEffect, useState } from "react";

// import { testRequest } from "../api/test";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await testRequest();
  //       setData(response);
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen px-4 py-12 lg:p-24 mt-14">
      <h3>
        {`${user?.gender_name === "Masculino" ? "Bienvenido" : "Bienvenida"}, ${
          user?.first_name
        }`}
      </h3>
    </div>
  );
};

export default App;
