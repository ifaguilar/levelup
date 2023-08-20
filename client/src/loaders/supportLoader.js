import { redirect } from "react-router-dom";

const supportLoader = async () => {
  if (!user) {
    return redirect("/login");
  }

  return null;
};

export default supportLoader;
