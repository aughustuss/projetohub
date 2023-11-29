import React, { ChangeEventHandler, HTMLInputTypeAttribute, MouseEventHandler } from "react";
import { IoIosClose } from "react-icons/io";
interface InputProps {
    type?: HTMLInputTypeAttribute | undefined;
    placeholder?: string | undefined;
    value?: string | number | readonly string[] | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
    label?: string;
    hasText?: boolean;
    onClick?: MouseEventHandler<undefined & HTMLInputElement> | undefined;
}
const Input = ({onChange, placeholder, type, value, label, hasText, onClick}: InputProps) => {
  return (
    <>
      <div className="gap-y-1 relative flex flex-row items-center w-full">
        <label htmlFor="input">{label}</label>
        <input id="input" type={type} placeholder={placeholder} value={value} onChange={onChange} className='pl-2 pr-8 py-[6px] rounded-lg text-sm text-newBlack w-full shadow-md'/>
        {hasText && (
            <button
            onClick={onClick}
            className="absolute right-1 text-iconSize transition-all duration-300 text-black"
          >
            <IoIosClose />
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
