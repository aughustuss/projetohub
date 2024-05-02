import { ChangeEventHandler } from 'react'

interface SelectProps {
    options: Array<string>
    selectId: string;
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
    value?: Array<string> | ReadonlyArray<string> | number | undefined ;
    height?: number;
    transparent?: boolean;
    label?: string;
}

const Select = ({options, selectId, onChange, value, height, transparent, label}: SelectProps) => {
  return (
    <>
      <div className='flex flex-col gap-y-1'>
        {label && (
          <label htmlFor={selectId}>{label}</label>
        ) }
          <select 
              id={selectId}
              onChange={onChange}
              className={`${height ? `h-[${height}px]` : "py-2"} py-2 rounded-lg text-sm text-newBlack w-full border border-border ${
                  transparent
                    ? "bg-transparent border border-border text-newWhite"
                    : "bg-newWhite"
                }`}
              >
                  {options.map((option, index) => (
                      <option
                          value={value}
                          key={index}>
                          {option}
                      </option>
                  ))}
          </select>
      </div>
    </>
  )
}

export default Select