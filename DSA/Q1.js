// Longest Subarray with Sum = K
// Given an array and integer K, return the length of the longest subarray with sum = K

function longestSubarrayWithSumK(arr, K) {
  let maxLength = 0;
  let sum = 0;
  const sumMap = new Map();

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (sum === K) {
      maxLength = i + 1;
    }

    if (sumMap.has(sum - K)) {
      maxLength = Math.max(maxLength, i - sumMap.get(sum - K));
    }

    if (!sumMap.has(sum)) {
      sumMap.set(sum, i);
    }
  }

  return maxLength;
}
