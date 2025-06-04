function printPascalsTriangle(n) {
    for (let line = 0; line < n; line++) {
        let result = '';
        let number = 1;
        for (let space = 0; space < n - line - 1; space++) {
            result += ' ';
        }
        for (let i = 0; i <= line; i++) {
            result += number + ' ';
            number = number * (line - i) / (i + 1);
        }

        console.log(result.trim());
    }
}
printPascalsTriangle(5);