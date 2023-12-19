import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
interface InputProps {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  hasText?: boolean;
  withIcon?: boolean;
  onClick?: MouseEventHandler<undefined & HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  icon?: string | React.ReactNode | undefined;
  password?: boolean;
  width?: string | number;
  height?: string | number;
  left?: boolean;
}
const Input = ({
  onChange,
  placeholder,
  type,
  value,
  label,
  hasText,
  withIcon,
  onClick,
  onKeyDown,
  icon,
  password,
  height,
  width,
  left,
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleTypeChange = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div
        className={`gap-y-1 relative flex flex-row items-center  
        ${
          width ? `w-[${width}px]` : "w-full"
        }
        `
      }
      >
        <label htmlFor="input">{label}</label>
        <input
          onKeyDown={onKeyDown}
          id="input"
          type={showPassword && password ? "password" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={` ${height ? `h-[${height}px]` : "py-2"} ${left ? "pl-8 pr-2" : "pl-2 pr-8"}  py-2 rounded-lg text-sm text-newBlack  w-full
          shadow-md`} 
        />
        {hasText && withIcon && (
          <>
            {!password ? (
              <button
                onClick={onClick}
                className={` ${left ? "left-1" : "right-1"} absolute  text-iconSize transition-all duration-300 text-black`}
              >
                <div className={`text-xs ${left ? "pl-1" : "pr-1"}`}>{icon && icon}</div>
              </button>
            ) : (
              <button
                onClick={handleTypeChange}
                className="absolute right-1 text-iconSize transition-all duration-300 text-black"
              >
                <div className="text-sm pr-1">
                  {showPassword ? <IoEye /> : <IoEyeOff />}
                </div>
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Input;