import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Call onSearch prop when debouncedSearchTerm changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search contacts by name or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;