/**
 * Filters an array of objects based on a search query,
 * searching through all nested properties.
 * 
 * @param {Array} data - The array of items to filter
 * @param {string} query - The search query
 * @param {Array} specificFields - Optional array of specific fields to search within
 * @returns {Array} - Filtered array of items
 */
export const deepFilter = (data, query, specificFields = []) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return data;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return data.filter(item => {
    // If specificFields is provided, only search those fields
    if (specificFields && specificFields.length > 0) {
      return specificFields.some(field => {
        const value = getNestedValue(item, field);
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(normalizedQuery);
      });
    }
    
    // Otherwise, search all fields recursively
    return searchObjectRecursively(item, normalizedQuery);
  });
};

/**
 * Gets a value from a nested object using dot notation
 * 
 * @param {Object} obj - The object to get the value from
 * @param {string} path - The path to the value using dot notation (e.g., 'user.name.first')
 * @returns {*} - The value at the path, or undefined if not found
 */
const getNestedValue = (obj, path) => {
  if (!obj || typeof obj !== 'object' || !path) {
    return undefined;
  }
  
  const keys = path.split('.');
  return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
};

/**
 * Recursively searches an object for a query string
 * 
 * @param {*} item - The item to search
 * @param {string} query - The normalized search query
 * @returns {boolean} - True if the query is found, false otherwise
 */
const searchObjectRecursively = (item, query) => {
  // Base case: If the item is null or undefined
  if (item === null || item === undefined) {
    return false;
  }
  
  // For strings, numbers, and booleans, check if they include the query
  if (typeof item !== 'object') {
    return String(item).toLowerCase().includes(query);
  }
  
  // For arrays, check each item
  if (Array.isArray(item)) {
    return item.some(arrayItem => searchObjectRecursively(arrayItem, query));
  }
  
  // For objects, check each value
  return Object.values(item).some(value => searchObjectRecursively(value, query));
};