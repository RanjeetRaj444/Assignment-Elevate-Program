// 1. Find All Duplicates in an Array
// Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Return all the elements that appear twice.

// Input: [4, 3, 2, 7, 8, 2, 3, 1]

// Output: [2, 3]

let output = [];
let obj = {};
for (let i = 0; i < nums.length; i++) {
  if (obj[nums[i]] == undefined) {
    obj[nums[i]] = 1;
  } else {
    obj[nums[i]]++;
  }
}

for (let a in obj) {
  if (obj[a] > 1) {
    output.push(parseInt(a));
  }
}
return output;
