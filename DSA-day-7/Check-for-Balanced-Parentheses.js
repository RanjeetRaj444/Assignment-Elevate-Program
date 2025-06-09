// 5. Check for Balanced Parentheses
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// A string is valid if all open brackets are closed by the same type and in the correct order.

// Input: "({[]})"

// Output: true

const stack = [];
const obj = {
  ")": "(",
  "}": "{",
  "]": "[",
};

for (let i = 0; i < s.length; i++) {
  if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
    stack.push(s[i]);
  } else if (s[i] == "}" || s[i] == ")" || s[i] == "]") {
    if (stack.length == 0) return false;
    let temp = stack.pop();
    if (obj[s[i]] !== temp) {
      return false;
    }
  }
}

return stack.length === 0;
