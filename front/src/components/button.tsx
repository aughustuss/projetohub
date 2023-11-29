import React from "react";
interface ButtonProps {
    type?: "submit" | "reset" | "button" | undefined;
    text?: string;
}
const Button = ({type, text}:ButtonProps) => {
  return (
    <>
      <div>
        <button type={type}>{text}</button>
      </div>
    </>
  );
};

export default Button;
