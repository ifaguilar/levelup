import { redirect } from "react-router-dom";

const salesLoader = async () => {
  if (!user) {
    return redirect("/login");
  }

  return null;
};

export default salesLoader;
