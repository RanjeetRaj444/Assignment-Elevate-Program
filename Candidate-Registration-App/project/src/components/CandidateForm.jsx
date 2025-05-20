import { useState } from "react";
import { validateForm, formatPhoneNumber } from "../utils/validation";
import FormInput from "./FormInput";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import ImagePreview from "./ImagePreview";
import { useCandidates } from "../contexts/CandidateContext";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  skills: [],
  profilePicture: null,
};

const CandidateForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { addCandidate } = useCandidates();

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const skillOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "node", label: "Node.js" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const reader = new FileReader();
    reader.readAsDataURL(formData.profilePicture);

    reader.onload = () => {
      const newCandidate = {
        ...formData,
        profilePicture: reader.result,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      addCandidate(newCandidate);

      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    };
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm backdrop-blur-sm p-6 animate-slide-up"
    >
      <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
        Candidate Registration
      </h2>

      {showSuccess && (
        <div className="mb-6 p-3 bg-success-500/10 border border-success-500/30 rounded-lg text-success-500 animate-fade-in">
          Candidate successfully registered!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormInput
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <FormInput
        label="Phone Number"
        name="phone"
        placeholder="10 digits only"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <RadioGroup
        label="Gender"
        name="gender"
        options={genderOptions}
        value={formData.gender}
        onChange={handleChange}
        error={errors.gender}
      />

      <CheckboxGroup
        label="Skills (select at least two)"
        name="skills"
        options={skillOptions}
        selectedValues={formData.skills}
        onChange={handleChange}
        error={errors.skills}
      />

      <ImagePreview
        label="Profile Picture"
        name="profilePicture"
        value={formData.profilePicture}
        onChange={handleChange}
        error={errors.profilePicture}
      />

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary min-w-32"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Register Candidate"
          )}
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
