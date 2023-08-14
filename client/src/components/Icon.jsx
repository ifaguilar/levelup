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
  BsBox,
  BsReceipt,
  BsTicket,
  BsPencilSquare,
  BsTrash,
  BsXLg,
  BsClipboardCheck,
  BsLightningCharge,
  BsCheckCircleFill,
} from "react-icons/bs";

const Icon = ({ icon }) => {
  if (icon === "dashboard") {
    return <BsSpeedometer2 />;
  }

  if (icon === "hr" || icon === "people") {
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

  if (icon === "system_logs") {
    return <BsClipboardCheck />;
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

  if (icon === "box") {
    return <BsBox />;
  }

  if (icon === "receipt") {
    return <BsReceipt />;
  }

  if (icon === "ticket") {
    return <BsTicket />;
  }

  if (icon === "edit") {
    return <BsPencilSquare />;
  }

  if (icon === "delete") {
    return <BsTrash />;
  }

  if (icon === "close") {
    return <BsXLg />;
  }

  if (icon === "pro") {
    return <BsLightningCharge />;
  }

  if (icon === "checkmark") {
    return <BsCheckCircleFill />;
  }

  return null;
};

export default Icon;
