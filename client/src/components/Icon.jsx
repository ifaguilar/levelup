import React from "react";
import {
  BsSpeedometer2,
  BsGraphUpArrow,
  BsCart3,
  BsBarChartLine,
  BsBoxes,
  BsBoxArrowRight,
  BsPerson,
  BsGithub,
} from "react-icons/bs";

const Icon = ({ icon }) => {
  if (icon === "dashboard") {
    return <BsSpeedometer2 />;
  }

  if (icon === "purchases") {
    return <BsCart3 />;
  }

  if (icon === "sales") {
    return <BsGraphUpArrow />;
  }

  if (icon === "finances") {
    return <BsBarChartLine />;
  }

  if (icon === "warehouse") {
    return <BsBoxes />;
  }

  if (icon === "profile") {
    return <BsPerson />;
  }

  if (icon === "logout") {
    return <BsBoxArrowRight />;
  }

  if (icon === "github") {
    return <BsGithub />;
  }

  return null;
};

export default Icon;
