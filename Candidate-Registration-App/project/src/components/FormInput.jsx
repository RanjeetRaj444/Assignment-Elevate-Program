import { useState } from 'react';

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error,
  placeholder,
  required = true,
  disabled = false,
  autoComplete = 'on',
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`form-input ${error ? 'error' : ''} ${isFocused ? 'ring-2 ring-primary-500' : ''}`}
      />
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormInput;