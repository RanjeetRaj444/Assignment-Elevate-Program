import { memo } from 'react';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import './ContactCard.css';

const ContactCard = memo(({ contact, onDelete, onToggleFavorite }) => {
  const { id, name, email, tags, favorite } = contact;
  
  return (
    <div className="contact-card">
      <div className="contact-header">
        <h3>{name}</h3>
        <div className="contact-actions">
          <button 
            onClick={() => onToggleFavorite(id)} 
            className="favorite-button"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? <FaStar className="star-icon favorite" /> : <FaRegStar className="star-icon" />}
          </button>
          <button 
            onClick={() => onDelete(id)} 
            className="delete-button"
            aria-label="Delete contact"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <p className="contact-email">{email}</p>
      
      {tags && tags.length > 0 && (
        <div className="contact-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
});

ContactCard.displayName = 'ContactCard';

export default ContactCard;