// 🔹 Question 2: Grouping Objects by Key
// Problem:
// Write a function groupBy(arr, key) that takes an array of objects and a key, and returns an
// object grouping the items based on the value of that key.

console.log(
  groupBy(
    [
      { type: "fruit", name: "apple" },
      { type: "veg", name: "carrot" },
      { type: "fruit", name: "grapes" },
    ],
    "type"
  )
);
// Output:
// {
//   fruit: [{ type: 'fruit', name: 'apple' }],
//   veg: [{ type: 'veg', name: 'carrot' }]
// }

function groupBy(arr) {
  let res = {};
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i].type;
    if (!res[key]) {
      res[key] = [arr[i]];
    } else {
      res[key].push(arr[i]);
    }
  }
  return res;
}
