/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
    let row = matrix.length
    let col = matrix[0].length
    if ( row === 0 || col===0 || target < matrix[0][0] || target > matrix[row - 1][col - 1]) {
        return false
    }

    for(let i = 0; i< row;i ++) { 
        if (target <= matrix[i][col - 1] && target >= matrix[i][0]) { 
            if(matrix[i].find(x => x== target)) { 
                return true
            }
        }
    }
    return false
};


var test = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
console.log(
    findNumberIn2DArray(test, 20)
)