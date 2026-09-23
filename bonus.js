var longestCommonPrefix = function(strs) {
     if (strs.length === 0) return "";
    let firstWord = strs[0];
    
    for (let i = 0; i < firstWord.length; i++) {
        let char = firstWord[i]

        for (let j = 1; j < strs.length; j++) {

            if (i === strs[j].length || strs[j][i] !== char) {  
             return firstWord.substring(0, i)
            }
        }
    }
    return firstWord
};
console.log(longestCommonPrefix(["flower","flow","flight"]))
console.log(longestCommonPrefix(["dog","racecar","car"]))
