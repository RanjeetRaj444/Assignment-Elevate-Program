// 42. Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
// Example 2:

// Input: height = [4,2,0,3,2,5]
// Output: 9

let i = 0;
let l_max = height[0];
let sum = 0;
let j = height.length - 1;
let r_max = height[j];
while (i < j) {
  if (l_max <= r_max) {
    sum += l_max - height[i];
    i++;
    l_max = Math.max(l_max, height[i]);
  } else {
    sum += r_max - height[j];
    j--;
    r_max = Math.max(r_max, height[j]);
  }
}
return sum;
