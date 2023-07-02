import React from "react";
import {
  BsSpeedometer2,
  BsGraphUpArrow,
  BsPeople,
  BsBarChartLine,
  BsBoxes,
  BsHeadset,
  BsBoxArrowRight,
  BsPerson,
  BsGithub,
} from "react-icons/bs";

const Icon = ({ icon }) => {
  if (icon === "dashboard") {
    return <BsSpeedometer2 />;
  }

  if (icon === "hr") {
    return <BsPeople />;
  }

  if (icon === "inventory") {
    return <BsBoxes />;
  }

  if (icon === "sales") {
    return <BsGraphUpArrow />;
  }

  if (icon === "support") {
    return <BsHeadset />;
  }

  if (icon === "analytics") {
    return <BsBarChartLine />;
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
