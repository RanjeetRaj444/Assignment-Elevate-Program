import { useState, useEffect } from 'react';

const ImagePreview = ({ 
  label, 
  name, 
  onChange, 
  error,
  value, 
  required = true 
}) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name, value: file } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange({ target: { name, value: e.dataTransfer.files[0] } });
    }
  };
  
  return (
    <div className="mb-4">
      <span className="form-label mb-2 inline-block">
        {label} {required && <span className="text-error-500">*</span>}
      </span>
      
      <div
        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200
          ${isDragging ? 'border-primary-500 bg-primary-50' : error ? 'border-error-500' : 'border-secondary-300 hover:border-primary-500'}
          ${preview ? 'bg-white' : 'bg-secondary-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3 ring-4 ring-primary-100">
              <img 
                src={preview} 
                alt="Profile Preview" 
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange({ target: { name, value: null } })}
                className="btn btn-secondary text-xs"
              >
                Remove
              </button>
              <label className="btn btn-primary text-xs cursor-pointer">
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer py-6">
            <svg className="w-12 h-12 text-secondary-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-secondary-500 mb-1">Drag & drop an image here, or click to select</span>
            <span className="text-xs text-secondary-400">JPG, PNG, GIF up to 5MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="sr-only"
            />
          </label>
        )}
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default ImagePreview;