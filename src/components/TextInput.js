import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const TextInput = React.forwardRef(
  (
    {
      type,
      placeholder,
      styles,
      label,
      labelStyles,
      name,
      error,
      onChange,
      value,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className='w-full flex flex-col mt-4'>
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div className='relative'>
          <input
            type={isPasswordType && showPassword ? 'text' : type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            value={value || ''}
            onChange={onChange}
            className={`bg-[#f5f5f5] rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
          />
          {isPasswordType && (
            <div
              className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          )}
        </div>
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
