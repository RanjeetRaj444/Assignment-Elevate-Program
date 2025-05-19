//  Question 4: Polyfill for Array.prototype.map
// Problem:
// Implement your own version of map() and add it as a method myMap() on Array.prototype.
// Requirements:
// It should behave exactly like Array.prototype.map().
// It should return a new array without modifying the original.

Array.prototype.myMap = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    let temp = cb(this[i], i, this);
    newArr.push(temp);
  }
  return newArr;
};

let arr = [1, 2, 3];
let result = arr.myMap((ele) => ele * 2);
console.log(result);
