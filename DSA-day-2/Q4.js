// 125. Valid Palindrome

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.

var isPalindrome = function (s) {
  s = s.toLowerCase();
  let L = 0;
  let R = s.length - 1;
  while (L < R) {
    while (L < R && !isAlphabets(s[L])) {
      L++;
    }
    while (L < R && !isAlphabets(s[R])) {
      R--;
    }
    if (s[L] != s[R]) {
      return false;
    }
    L++;
    R--;
  }
  return true;
};

function isAlphabets(s) {
  let code = s.charCodeAt(0);
  if (code >= 48 && code <= 57) return true;
  if (code >= 97 && code <= 122) return true;
  return false;
}
