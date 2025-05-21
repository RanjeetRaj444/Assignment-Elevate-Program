import { useState } from 'react';
import LiveSearch from './components/LiveSearch/LiveSearch';
import { users, products } from './assets/mockData';
import './App.css';

function App() {
  const [dataType, setDataType] = useState('users');
  const [searchFields, setSearchFields] = useState([]);
  
  const currentData = dataType === 'users' ? users : products;
  
  const handleDataTypeChange = (type) => {
    setDataType(type);
    
    if (type === 'users') {
      setSearchFields(['name.first', 'name.last', 'email', 'location.city', 'location.country', 'tags']);
    } else {
      setSearchFields(['name', 'category.main', 'category.sub', 'specs.processor', 'tags']);
    }
  };
  
  useState(() => {
    handleDataTypeChange(dataType);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Live Search with Deep Filtering</h1>
        <p className="subtitle">
          Search through complex nested data structures with real-time results
        </p>
      </header>
      
      <div className="controls">
        <div className="data-selector">
          <button 
            className={`selector-btn ${dataType === 'users' ? 'active' : ''}`}
            onClick={() => handleDataTypeChange('users')}
          >
            Users
          </button>
          <button 
            className={`selector-btn ${dataType === 'products' ? 'active' : ''}`}
            onClick={() => handleDataTypeChange('products')}
          >
            Products
          </button>
        </div>
      </div>
      
      <div className="search-container">
        <LiveSearch 
          data={currentData}
          placeholder={dataType === 'users' ? 'Search users...' : 'Search products...'}
          searchFields={searchFields}
          minChars={2}
          maxResults={8}
        />
      </div>
    </div>
  );
}

export default App;