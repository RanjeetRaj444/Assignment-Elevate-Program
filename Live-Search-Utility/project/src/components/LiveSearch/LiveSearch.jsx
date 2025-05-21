import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { debounce } from '../../utils/debounce';
import { deepFilter } from '../../utils/deepFilter';
import { throttle } from '../../utils/throttle';
import './LiveSearch.css';

const LiveSearch = ({ 
  data = [], 
  placeholder = 'Search...', 
  searchFields = [], 
  minChars = 2,
  maxResults = 10 
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const searchRef = useRef(null);
  
  const handleSearch = debounce((value) => {
    setDebouncedQuery(value);
  }, 500);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= minChars) {
      handleSearch(value);
      setIsOpen(true);
    } else {
      setDebouncedQuery('');
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    if (debouncedQuery.length >= minChars) {
      const results = deepFilter(data, debouncedQuery, searchFields);
      setFilteredResults(results.slice(0, maxResults));
      setIsOpen(results.length > 0);
    } else {
      setFilteredResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery, data, searchFields, minChars, maxResults]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex(prevIndex => 
        prevIndex < filteredResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    else if (e.key === 'ArrowUp') {
      setFocusedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
      e.preventDefault(); 
    }
    else if (e.key === 'Enter' && focusedIndex >= 0) {
      handleResultSelect(filteredResults[focusedIndex]);
    }
    else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 200);
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleResultSelect = (result) => {
    console.log('Selected result:', result);
    setIsOpen(false);
  };
  
  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredResults]);
  
  return (
    <div className="live-search" ref={searchRef}>
      <SearchBar 
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      
      {isOpen && filteredResults.length > 0 && (
        <SearchResults 
          results={filteredResults}
          searchQuery={debouncedQuery}
          focusedIndex={focusedIndex}
          onResultSelect={handleResultSelect}
        />
      )}
      
      {query.length >= minChars && filteredResults.length === 0 && (
        <div className="no-results">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default LiveSearch;