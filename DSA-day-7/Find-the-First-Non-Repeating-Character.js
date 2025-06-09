// 3. Find the First Non-Repeating Character
// Given a string s, return the index of the first non-repeating character in it. If it doesn't exist, return -1.

// Input: "leetcode"

// Output: 0

let obj = {};

for (let i = 0; i < s.length; i++) {
  if (obj[s[i]] == undefined) {
    obj[s[i]] = 1;
  } else {
    obj[s[i]]++;
  }
}

let firstUnique = "";
let notUnique = false;
for (let a in obj) {
  if (obj[a] == 1) {
    firstUnique = a;
    notUnique = true;
    break;
  }
}
if (!notUnique) {
  return -1;
}
for (let i = 0; i < s.length; i++) {
  if (s[i] == firstUnique) {
    return i;
  }
}
