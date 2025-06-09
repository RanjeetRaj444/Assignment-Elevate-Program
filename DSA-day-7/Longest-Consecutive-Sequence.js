// 2. Longest Consecutive Sequence
// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

// Input: [100, 4, 200, 1, 3, 2]

// Output: 4 → because the sequence [1, 2, 3, 4] is the longest

let n = nums.length;

if (n === 0) {
  return 0;
}

nums.sort((a, b) => a - b);

let count = 1;
let maxCount = 0;

for (let i = 1; i < n; i++) {
  if (nums[i] !== nums[i - 1]) {
    if (nums[i] === nums[i - 1] + 1) {
      count++;
    } else {
      maxCount = Math.max(maxCount, count);
      count = 1;
    }
  }
}

return Math.max(maxCount, count);
