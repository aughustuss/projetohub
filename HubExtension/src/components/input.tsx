import React, { ChangeEvent, MouseEventHandler, KeyboardEventHandler } from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  hasText?: boolean;
  withIcon?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
  password?: boolean;
  height?: number;
  left?: boolean;
  transparent?: boolean;
  updateParentValue?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
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
  left,
  transparent,
  updateParentValue,
}: InputProps) => {
  return (
    <div className={`gap-y-1 relative flex flex-row items-center w-full`}>
      <label htmlFor="input">{label}</label>
      <input
        onKeyDown={onKeyDown}
        type={password ? 'password' : type}
        placeholder={placeholder}
        value={value?.toString() || ''}
        onChange={onChange || ((e) => updateParentValue?.(e.target.value))}
        className={`${height ? `h-[${height}px]` : 'py-2'} ${
          left ? 'pl-8 pr-2' : 'pl-2 pr-8'
        } py-2 rounded-lg text-sm text-newBlack w-full shadow-md ${
          transparent ? 'bg-transparent border border-primaryBgBorder text-newWhite' : 'bg-newWhite'
        }`}
      />
      {hasText && withIcon && (
        <button
          onClick={onClick}
          className={`${left ? 'left-1' : 'right-1'} absolute text-iconSize transition-all duration-300 text-black`}
        >
          <div className={`text-xs ${left ? 'pl-1' : 'pr-1'}`}>{icon}</div>
        </button>
      )}
    </div>
  );
};

export default Input;
