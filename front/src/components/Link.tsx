import React from "react";

interface LinkProps {
  to: string;
  onlyBorder: boolean;
  bgNotPrimary?: boolean;
  bgPrimary?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  col?: boolean;
  small?: boolean;
}

const Link = ({
  to,
  onlyBorder,
  children,
  fullWidth,
  bgNotPrimary,
  bgPrimary,
  col,
  small,
}: LinkProps) => {
  return (
    <a
      className={` ${
        fullWidth ? "w-full" : "w-fit"
      } ${
        small ? "py-2 px-6 text-xs rounded-xl" : "px-4 py-2 rounded-xl"
      } font-bold text-center  transition duration-300 flex ${
        col ? "flex-col" : "flex-row"
      } gap-4 items-center justify-center active:scale-95
      ${
        bgPrimary
          ? onlyBorder 
            ? "border border-primaryBg hover:bg-primaryBg"
            : "bg-primaryBg text-newWhite"
          : bgNotPrimary
            ? onlyBorder
              ? "border border-border hover:bg-border"
              : " bg-border text-primaryBlack"
            : "bg-transparent hover:text-primaryBlack"
      }
      `}
      href={to}
    >
      {children}
    </a>
  );
};

export default Link;
