const CheckboxGroup = ({ 
  label, 
  name, 
  options, 
  selectedValues, 
  onChange, 
  error,
  required = true 
}) => {
  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(val => val !== value)
      : [...selectedValues, value];
    
    onChange({ target: { name, value: updatedValues } });
  };

  return (
    <div className="mb-4">
      <span className="form-label mb-2 inline-block">
        {label} {required && <span className="text-error-500">*</span>}
      </span>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map(option => (
          <label 
            key={option.value} 
            className={`
              inline-flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
              ${selectedValues.includes(option.value) 
                ? 'bg-primary-500 text-white' 
                : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'}
            `}
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="sr-only"
            />
            <span className={`w-4 h-4 rounded border flex items-center justify-center mr-2 transition duration-200 
              ${selectedValues.includes(option.value) 
                ? 'border-white bg-white/20' 
                : 'border-secondary-300'}`
            }>
              {selectedValues.includes(option.value) && (
                <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;