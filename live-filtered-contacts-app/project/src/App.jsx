import { useState, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  // Use our custom hook to persist contacts in localStorage
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use useCallback to prevent unnecessary rerenders
  const handleAddContact = useCallback((newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  }, [setContacts]);
  
  const handleDeleteContact = useCallback((id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  }, [setContacts]);
  
  const handleToggleFavorite = useCallback((id) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === id 
          ? { ...contact, favorite: !contact.favorite } 
          : contact
      )
    );
  }, [setContacts]);
  
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Contacts Manager</h1>
      </header>
      
      <main className="app-main">
        <div className="app-container">
          <div className="sidebar">
            <ContactForm addContact={handleAddContact} />
          </div>
          
          <div className="content">
            <SearchBar onSearch={handleSearch} />
            <ContactList 
              contacts={contacts} 
              searchTerm={searchTerm}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;