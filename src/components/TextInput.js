import React from 'react';

// 다른 컴포넌트에서 ref를 통해 TextInput의 <input> 요소에 접근해야 하는 경우
// React.forwardRef가 필요
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
    return (
      <div className='w-full flex flex-col mt-4'>
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            value={value || ''}
            onChange={onChange}
            className={`bg-[#f5f5f5] rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
          />
        </div>
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
