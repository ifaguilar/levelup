import React from "react";

const ProfilePic = ({ src, className = "", onClick = null }) => (
  <img
    className={`w-12 h-12 rounded-full ${className}`}
    src={src}
    alt="Profile pic"
    onClick={onClick}
  />
);

export default ProfilePic;
