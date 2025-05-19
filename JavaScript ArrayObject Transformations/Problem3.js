//  Question 3: Deep Clone an Object
// Problem:
// Write a function deepClone(obj) that creates a deep copy of any object, including nested arrays
// and objects, so that modifying the clone doesn’t affect the original.

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
function deepClone(original) {
  return JSON.parse(JSON.stringify(original));
}
cloned.b.c = 10;

console.log(original.b.c); // Output: 2
