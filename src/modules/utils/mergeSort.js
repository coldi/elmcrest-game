/* eslint-disable  no-param-reassign */
/* eslint-disable  no-plusplus */
/* eslint-disable  no-use-before-define */

const merge = (arr, aux, lo, mid, hi, compareFn) => {
    let i = lo;
    let j = mid + 1;
    let k = lo;
    while (true) { // eslint-disable-line  no-constant-condition
        const cmp = compareFn(arr[i], arr[j]);
        if (cmp <= 0) {
            aux[k++] = arr[i++];
            if (i > mid) {
                do { aux[k++] = arr[j++]; }
                while (j <= hi);
                break;
            }
        } else {
            aux[k++] = arr[j++];
            if (j > hi) {
                do { aux[k++] = arr[i++]; }
                while (i <= mid);
                break;
            }
        }
    }
};

const sortArrToAux = (arr, aux, lo, hi, compareFn) => {
    if (hi < lo) return;
    if (hi == lo) { // eslint-disable-line  eqeqeq
        aux[lo] = arr[lo];
        return;
    }

    const mid = Math.floor(lo + ((hi - lo) / 2));

    sortArrToArr(arr, aux, lo, mid, compareFn);
    sortArrToArr(arr, aux, mid + 1, hi, compareFn);
    merge(arr, aux, lo, mid, hi, compareFn);
};

const sortArrToArr = (arr, aux, lo, hi, compareFn) => {
    if (hi <= lo) return;

    const mid = Math.floor(lo + ((hi - lo) / 2));

    sortArrToAux(arr, aux, lo, mid, compareFn);
    sortArrToAux(arr, aux, mid + 1, hi, compareFn);
    merge(aux, arr, lo, mid, hi, compareFn);
};

const mergeSort = (unsortedArr, compareFn) => {
    const arr = unsortedArr.slice(0);
    const aux = unsortedArr.slice(0);

    sortArrToArr(arr, aux, 0, arr.length - 1, compareFn);

    return arr;
};

export default mergeSort;
