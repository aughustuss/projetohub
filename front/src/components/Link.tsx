import React from 'react'

interface LinkProps {
    to: string;
    onlyBorder: boolean;
    children: React.ReactNode
    fullWidth?: boolean;
}

const Link = ({to, onlyBorder, children, fullWidth}: LinkProps) => {
  return (
    <a className={` ${onlyBorder ? "border border-primaryBgBorder" : "bg-primaryBgBorder"} ${fullWidth ? "w-full" : "w-fit"} px-4 py-2 rounded-lg font-bold text-center hover:bg-primaryBgBorder/70 transition duration-300 flex flex-col items-center justify-center active:scale-95`} href={to}>{children}</a>
  )
}

export default Link