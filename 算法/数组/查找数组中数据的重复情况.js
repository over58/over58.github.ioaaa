/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
    let res = {}
    let repeatCount = 0

    nums.forEach(num => {
        if (res[num]) {
            res[num]++
        } else {
            res[num] = 1
        }

        repeatCount = repeatCount < res[num] ? res[num] : repeatCount
    })
    let results = []
    for (let key in res) {
        if (res[key] === repeatCount) {
            results.push(key)
        }
    }
    console.log(res, repeatCount)
    return results[0]
};

console.log(findRepeatNumber([1,1,1]))