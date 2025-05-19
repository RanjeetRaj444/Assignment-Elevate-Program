// Question 5 (Bonus): Polyfill for Array.prototype.reduce
// Problem:

// Create a polyfill function myReduce() on Array.prototype that works like the native reduce().

// Requirements:

// It should accept a callback and an optional initial value.

// It should reduce the array into a single accumulated value.

// Example:

// js
// Copy
// Edit
// [1, 2, 3, 4].myReduce((acc, val) => acc + val, 0)

Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = this;
  let accumulator;
  let startIndex = 0;

  if (arguments.length >= 2) {
    // Initial value provided
    accumulator = initialValue;
  } else {
    // No initial value: use the first non-empty element of the array
    while (startIndex < arr.length && !(startIndex in arr)) {
      startIndex++;
    }
    if (startIndex >= arr.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = arr[startIndex++];
  }

  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

const result = [1, 2, 3, 4].myReduce((acc, val) => acc + val, 0);
console.log(result); // Output: 10
