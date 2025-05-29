function longestSubstringWithAtMostKDistinctCharacters(s, k) {
    const charCount = {};
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        charCount[s[right]] = (charCount[s[right]] || 0) + 1;

        while (Object.keys(charCount).length > k) {
            charCount[s[left]]--;
            if (charCount[s[left]] === 0) {
                delete charCount[s[left]];
            }
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}   //kbducizbjsn