import { useMemo } from 'react';
import ContactCard from './ContactCard';
import './ContactList.css';

const ContactList = ({ contacts, searchTerm, onDelete, onToggleFavorite }) => {
  // Use useMemo to optimize filtered contact list
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    
    const lowercasedTerm = searchTerm.toLowerCase();
    
    return contacts.filter(contact => {
      // Check if search term is in name
      const nameMatch = contact.name.toLowerCase().includes(lowercasedTerm);
      
      // Check if search term is in any of the tags
      const tagMatch = contact.tags.some(tag => 
        tag.toLowerCase().includes(lowercasedTerm)
      );
      
      // Return true if search term is found in name or tags
      return nameMatch || tagMatch;
    });
  }, [contacts, searchTerm]);

  if (filteredContacts.length === 0) {
    return (
      <div className="contact-list empty-list">
        {contacts.length === 0 ? (
          <p>No contacts added yet. Add your first contact!</p>
        ) : (
          <p>No contacts match your search.</p>
        )}
      </div>
    );
  }

  return (
    <div className="contact-list">
      <div className="contacts-count">
        Showing {filteredContacts.length} of {contacts.length} contacts
      </div>
      <div className="contact-cards">
        {filteredContacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;