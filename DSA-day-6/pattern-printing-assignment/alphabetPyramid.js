function printAlphabetPyramid(n) {
  for (let i = 0; i < n; i++) {
    let str = " ".repeat(n - i - 1);
    for (let j = 0; j <= i; j++) {
      str += String.fromCharCode(65 + j);
    }
    for (let j = i - 1; j >= 0; j--) {
      str += String.fromCharCode(65 + j);
    }
    console.log(str);
  }
}

printAlphabetPyramid(5);
