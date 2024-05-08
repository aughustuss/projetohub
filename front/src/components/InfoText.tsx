import React from 'react'
interface InfoTextProps {
    children: React.ReactNode;
    bold?: boolean;
}
const InfoText = ({children, bold}: InfoTextProps) => {
  return (
    <span className={`${bold ? "font-bold" : "font-normal"} text-sm text-secondary underline`} >
        {children}
    </span>
  )
}

export default InfoText