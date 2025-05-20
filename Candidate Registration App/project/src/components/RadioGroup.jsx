import { Fragment } from 'react';

const RadioGroup = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange, 
  error,
  required = true 
}) => {
  return (
    <div className="mb-4">
      <span className="form-label mb-2 inline-block">
        {label} {required && <span className="text-error-500">*</span>}
      </span>
      
      <div className="flex gap-4">
        {options.map((option, index) => (
          <Fragment key={option.value}>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition duration-200 ${value === option.value ? 'border-primary-500 bg-primary-500' : 'border-secondary-300'}`}>
                {value === option.value && (
                  <span className="w-2 h-2 bg-white rounded-full animate-fade-in"></span>
                )}
              </span>
              <span className="text-sm text-secondary-800">{option.label}</span>
            </label>
            {index < options.length - 1 && (
              <span className="text-secondary-300">|</span>
            )}
          </Fragment>
        ))}
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default RadioGroup;