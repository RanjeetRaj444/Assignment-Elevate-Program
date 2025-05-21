/**
 * Creates a throttled function that only invokes the provided function
 * at most once per every `wait` milliseconds.
 * 
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to throttle invocations to
 * @returns {Function} - The throttled function
 */
export const throttle = (func, wait) => {
  let isThrottled = false;
  let lastArgs = null;
  let lastThis = null;
  
  function wrapper(...args) {
    if (isThrottled) {
      lastArgs = args;
      lastThis = this;
      return;
    }
    
    func.apply(this, args);
    isThrottled = true;
    
    setTimeout(() => {
      isThrottled = false;
      
      if (lastArgs) {
        wrapper.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
      }
    }, wait);
  }
  
  return wrapper;
};