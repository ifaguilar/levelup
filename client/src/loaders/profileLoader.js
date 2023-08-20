import { redirect } from "react-router-dom";

const profileLoader = async () => {
  if (!user) {
    return redirect("/login");
  }

  return null;
};

export default profileLoader;
