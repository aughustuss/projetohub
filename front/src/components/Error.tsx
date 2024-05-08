import React from 'react'

interface ErrorProps {
    children: React.ReactNode;
}

const Error = ({children}: ErrorProps) => {
  return (
    <small className='text-xs text-left w-full font-semibold text-red-700'>{children}</small>
  )
}

export default Error