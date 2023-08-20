import { redirect } from "react-router-dom";

const salesLoader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  return null;
};

export default salesLoader;
