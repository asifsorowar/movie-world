import React from "react";

export const buttonColors = {
  blueGradient: "bg-gradient-to-r from-blue-500 to-blue-800 text-white",
  white: "bg-white text-black",
};

const Button = ({ color, onClick, icon, children }) => {
  return (
    <button
      className={`btn p-2 px-6 rounded-3xl w-full ${color} ${
        icon ? `flex justify-center items-center gap-1` : ""
      }`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
