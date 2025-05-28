function fruitIntoBaskets(fruits) {
    let left = 0;
    let right = 0;
    let maxFruits = 0;
    const fruitCount = {};

    while (right < fruits.length) {
        const fruit = fruits[right];
        fruitCount[fruit] = (fruitCount[fruit] || 0) + 1;

        while (Object.keys(fruitCount).length > 2) {
            const leftFruit = fruits[left];
            fruitCount[leftFruit] -= 1;
            if (fruitCount[leftFruit] === 0) {
                delete fruitCount[leftFruit];
            }
            left++;
        }

        maxFruits = Math.max(maxFruits, right - left + 1);
        right++;
    }

    return maxFruits;
}