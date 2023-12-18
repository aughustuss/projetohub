import React from 'react'

interface LinkProps {
    to: string;
    onlyBorder: boolean;
    bg?: boolean;
    children: React.ReactNode
    fullWidth?: boolean;
}

const Link = ({to, onlyBorder, children, fullWidth, bg}: LinkProps) => {
  return (
    <a className={` ${onlyBorder && "border border-primaryBgBorder"} ${bg ? "bg-primaryBgBorder hover:bg-primaryBgBorder/70 " : "bg-transparent hover:text-primary/90"} ${fullWidth ? "w-full" : "w-fit"} px-4 py-2 rounded-lg font-bold text-center transition duration-300 flex flex-col items-center justify-center active:scale-95`} href={to}>{children}</a>
  )
}

export default Link