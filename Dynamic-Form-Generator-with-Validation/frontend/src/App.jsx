import { useState } from "react";

const schema = [
  {
    label: "Name",
    type: "text",
    name: "name",
    required: true,
    minLength: 3,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
  },
  {
    label: "Age",
    type: "number",
    name: "age",
    required: false,
    min: 18,
    max: 100,
  },
  {
    label: "Gender",
    type: "select",
    name: "gender",
    required: true,
    options: ["Male", "Female", "Other"],
  },
  {
    label: "Subscribe to newsletter",
    type: "checkbox",
    name: "subscribe",
    required: false,
  },
];

function App() {
  const initialFormState = schema.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    schema.forEach((field) => {
      const value = formData[field.name];

      if (
        field.required &&
        (value === "" ||
          value === null ||
          value === undefined ||
          (field.type === "checkbox" && !value))
      ) {
        newErrors[field.name] = `${field.label} is required.`;
      }

      if (field.type === "text" || field.type === "email") {
        if (field.minLength && value.length < field.minLength) {
          newErrors[
            field.name
          ] = `${field.label} must be at least ${field.minLength} characters.`;
        }
        if (field.maxLength && value.length > field.maxLength) {
          newErrors[
            field.name
          ] = `${field.label} must be at most ${field.maxLength} characters.`;
        }
      }

      if (field.type === "number") {
        const numVal = parseFloat(value);
        if (value && field.min !== undefined && numVal < field.min) {
          newErrors[
            field.name
          ] = `${field.label} must be at least ${field.min}.`;
        }
        if (value && field.max !== undefined && numVal > field.max) {
          newErrors[
            field.name
          ] = `${field.label} must be at most ${field.max}.`;
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();

    if (Object.keys(foundErrors).length === 0) {
      setErrors({});
      setSubmittedData(formData);
      console.log("Submitted:", formData);
    } else {
      setErrors(foundErrors);
      setSubmittedData(null);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Dynamic Form</h2>
      <form
        className="p-4 rounded bg-blue-200"
        onSubmit={handleSubmit}
        noValidate
      >
        {schema.map((field) => (
          <div key={field.name} style={{ marginBottom: "1rem" }}>
            <label>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </label>
            <div>
              {field.type === "text" ||
              field.type === "email" ||
              field.type === "number" ? (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e, field)}
                  className="rounded"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e, field)}
                  className="rounded"
                >
                  <option value="">-- Select --</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={(e) => handleChange(e, field)}
                  className="rounded"
                />
              ) : null}
            </div>
            {errors[field.name] && (
              <div style={{ color: "red", fontSize: "0.9rem" }}>
                {errors[field.name]}
              </div>
            )}
          </div>
        ))}

        <button className="rounded" type="submit">
          Submit
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
