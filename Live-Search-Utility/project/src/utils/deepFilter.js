
export const deepFilter = (data, query, specificFields = []) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return data;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return data.filter(item => {
    if (specificFields && specificFields.length > 0) {
      return specificFields.some(field => {
        const value = getNestedValue(item, field);
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(normalizedQuery);
      });
    }
    
    return searchObjectRecursively(item, normalizedQuery);
  });
};

const getNestedValue = (obj, path) => {
  if (!obj || typeof obj !== 'object' || !path) {
    return undefined;
  }
  
  const keys = path.split('.');
  return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
};

const searchObjectRecursively = (item, query) => {
  if (item === null || item === undefined) {
    return false;
  }
  if (typeof item !== 'object') {
    return String(item).toLowerCase().includes(query);
  }
  if (Array.isArray(item)) {
    return item.some(arrayItem => searchObjectRecursively(arrayItem, query));
  }
  return Object.values(item).some(value => searchObjectRecursively(value, query));
};