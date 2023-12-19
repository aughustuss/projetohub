import React from 'react'
interface RowProps {
    children: React.ReactNode;
    baseline?: boolean;
    space?: boolean;
    moreGap?: boolean;
}
const Row = ({children, baseline, space, moreGap}: RowProps) => {
  return (
    <div className={`flex flex-row ${baseline ? "items-baseline" : "items-center"} ${space && "justify-between"} ${moreGap ? "gap-x-6" : "gap-x-2"} `}>{children}</div>
  )
}

export default Row