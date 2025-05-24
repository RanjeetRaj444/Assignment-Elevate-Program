// Top K Frequent Elements
// Given an array and integer K, return the K most frequent elements

function topKFrequent(arr, K) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]]) {
      obj[arr[i]]++;
    } else {
      obj[arr[i]] = 1;
    }
  }

  let output = [];
  for (let a in obj) {
    if (obj[a] == k) {
      output.push(parseInt(a));
    }
  }
  console.log(output);
}
