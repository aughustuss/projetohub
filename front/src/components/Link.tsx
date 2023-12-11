import React from 'react'

interface LinkProps {
    to: string;
    onlyBorder: boolean;
    children: React.ReactNode
}

const Link = ({to, onlyBorder, children}: LinkProps) => {
  return (
    <a className={` ${onlyBorder ? "border border-primaryBgBorder" : "bg-primaryBgBorder"} px-4 py-2 rounded-lg font-bold text-center hover:bg-primaryBgBorder/70 transition duration-300 flex flex-col items-center justify-center active:scale-95`} href={to}>{children}</a>
  )
}

export default Link