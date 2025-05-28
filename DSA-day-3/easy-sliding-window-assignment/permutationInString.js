function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    const s1Count = Array(26).fill(0);
    const s2Count = Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    const matches = (s1Count, s2Count) => {
        for (let i = 0; i < 26; i++) {
            if (s1Count[i] !== s2Count[i]) return false;
        }
        return true;
    };

    if (matches(s1Count, s2Count)) return true;

    for (let i = s1.length; i < s2.length; i++) {
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        s2Count[s2.charCodeAt(i - s1.length) - 'a'.charCodeAt(0)]--;

        if (matches(s1Count, s2Count)) return true;
    }

    return false;
}

module.exports = checkInclusion;