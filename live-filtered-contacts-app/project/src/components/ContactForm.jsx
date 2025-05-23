import { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create a new contact object
      const newContact = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        favorite,
      };
      
      // Call the addContact function from props
      addContact(newContact);
      
      // Reset form fields
      setName('');
      setEmail('');
      setTags('');
      setFavorite(false);
      setErrors({});
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. work, family, friend"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            <span>Favorite</span>
          </label>
        </div>
        
        <button type="submit" className="submit-button">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;