export function mergeSort(arr) {
    if (arr.length <= 1) return arr; // Base da recursão

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

// 🔄 Função que mescla dois arrays ordenados
function merge(left, right) {
    let sortedArray = [],
        i = 0,
        j = 0;

    while (i < left.length && j < right.length) {
        if (left[i].price < right[j].price) {
            sortedArray.push(left[i]);
            i++;
        } else {
            sortedArray.push(right[j]);
            j++;
        }
    }

    return sortedArray.concat(left.slice(i)).concat(right.slice(j));
}

// 🔥 Teste
let arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr));
