// 6. Find the Majority Element
// Given an array of size n, find the element that appears more than ⌊n / 2⌋ times.

// You may assume that the majority element always exists in the array.

// Input: [2,2,1,1,1,2,2]

// Output: 2

let obj = {};
for (let i = 0; i < nums.length; i++) {
  if (obj[nums[i]] == undefined) {
    obj[nums[i]] = 1;
  } else {
    obj[nums[i]]++;
  }
}
for (let a in obj) {
  if (obj[a] > nums.length / 2) {
    return +a;
  }
}
