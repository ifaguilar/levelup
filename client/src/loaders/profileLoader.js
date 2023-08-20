import { redirect } from "react-router-dom";

const profileLoader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  return null;
};

export default profileLoader;
