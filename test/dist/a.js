function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}
var a = [2, 3, 4, 5, 6, 7, 8];
console.log(toArray(a, 3));
