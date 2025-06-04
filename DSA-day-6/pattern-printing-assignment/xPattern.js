function printXPattern(n) {
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            if (j === i || j === n - i - 1) {
                row += '*';
            } else {
                row += ' ';
            }
        }
        console.log(row);
    }
}

// Example usage
printXPattern(5);