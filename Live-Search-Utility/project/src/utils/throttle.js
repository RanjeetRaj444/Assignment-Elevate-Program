
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