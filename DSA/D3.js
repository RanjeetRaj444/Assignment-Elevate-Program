// Longest Consecutive Sequence
// Given an unsorted array, find the length of the longest consecutive elements sequence
// Solve in O(n) time using Set

function longestConsecutive(arr) {
    const numSet = new Set(arr);
    let longestStreak = 0;
    
    for (const num of numSet) {
        if (!numSet.has(num - 1)) {
        let currentNum = num;
        let currentStreak = 1;
    
        while (numSet.has(currentNum + 1)) {
            currentNum++;
            currentStreak++;
        }
    
        longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    
    return longestStreak;
    }   