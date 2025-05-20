export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const hasMinimumSkills = (skills) => {
  return skills.length >= 2;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Full name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Phone must be exactly 10 digits';
  }

  if (!formData.gender) {
    errors.gender = 'Please select your gender';
  }

  if (!hasMinimumSkills(formData.skills)) {
    errors.skills = 'Please select at least two skills';
  }

  if (!formData.profilePicture) {
    errors.profilePicture = 'Profile picture is required';
  }

  return errors;
};

export const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/\D/g, '');
  return phoneNumber;
};