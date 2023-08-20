import { redirect } from "react-router-dom";

const supportLoader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  return null;
};

export default supportLoader;
