function sandglassPattern(n) {
    for (let i = 0; i < n; i++) {
        let stars = '*'.repeat(2 * (n - i) - 1);
        let spaces = ' '.repeat(i);
        console.log(spaces + stars);
    }
    for (let i = 1; i < n; i++) {
        let stars = '*'.repeat(2 * i + 1);
        let spaces = ' '.repeat(n - i - 1);
        console.log(spaces + stars);
    }
}
sandglassPattern(5);