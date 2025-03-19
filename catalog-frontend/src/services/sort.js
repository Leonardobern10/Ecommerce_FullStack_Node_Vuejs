export function mergeSort(arr, prop) {
    if (arr.length <= 1) return arr; // Base da recursão

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), prop);
    const right = mergeSort(arr.slice(mid), prop);
    return merge(left, right, prop);
}

// 🔄 Função que mescla dois arrays ordenados
function merge(left, right, prop) {
    let sortedArray = [],
        i = 0,
        j = 0;

    while (i < left.length && j < right.length) {
        if (left[i][prop] < right[j][prop]) {
            sortedArray.push(left[i]);
            i++;
        } else {
            sortedArray.push(right[j]);
            j++;
        }
    }

    return sortedArray.concat(left.slice(i)).concat(right.slice(j));
}
