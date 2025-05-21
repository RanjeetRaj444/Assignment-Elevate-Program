export const debounce = (func, delay) => {
  let timeoutId;

  function debounced(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debounced;
};
