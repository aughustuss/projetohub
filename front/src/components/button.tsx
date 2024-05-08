import React, { MouseEventHandler } from "react";
import { CgSpinner } from "react-icons/cg";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  onlyBorder: boolean;
  onClick?: MouseEventHandler<undefined & HTMLInputElement> | undefined;
  children?: React.ReactNode;
  small: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
const Button = ({
  type,
  onlyBorder,
  onClick,
  children,
  small,
  fullWidth,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`text-newWhite font-bold text-center transition duration-300 flex flex-row items-center ${fullWidth ? "w-full justify-center" : "w-fit"} px-4 gap-x-4 ${small ? "py-2 px-6 text-xs rounded-xl" : "py-2 rounded-xl"} ${disabled ? "disabled:cursor-not-allowed disabled:bg-primary/40 text-bodyColor/40" : "active:scale-95"}
        ${onlyBorder
              ? "border-2 border-border text-primaryBlack hover:bg-border"
              : "bg-primaryBlack hover:bg-primaryBlack/90"
        }`}
        type={type}
      >
        {!loading 
          ? children 
          : <CgSpinner className="animate-spin text-xl" />}
      </button>
    </>
  );
};

export default Button;
