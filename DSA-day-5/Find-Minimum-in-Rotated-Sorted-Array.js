//leetcode.com/problems/find-minimum-in-rotated-sorted-array/submissions/1652518638/?languageTags=javascript

https: function findMin(nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}
