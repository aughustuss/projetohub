import React, { MouseEventHandler } from "react";

interface ButtonProps {
    type?: "submit" | "reset" | "button" | undefined;
    onlyBorder: boolean;
    onClick?: MouseEventHandler<undefined & HTMLInputElement> | undefined;
    children?: React.ReactNode
}
const Button = ({type, onlyBorder, onClick, children}:ButtonProps) => {
  return (
    <>
      <div>
        <button onClick={onClick} className={`${onlyBorder ? "bg-transparent border border-primaryNeon" : "bg-primaryNeon"} text-newWhite font-semibold text-sm text-center`} type={type}>{children}</button>
      </div>
    </>
  );
};

export default Button;
