//генерація масиву випадкових чисел
function generateRandomArray(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
}

//створення розрідженого масиву
function makeSparseArray(arr, holesCount) {
    let sparse = [...arr];
    for (let i = 0; i < holesCount; i++) {
        let randomIdx = Math.floor(Math.random() * sparse.length);
        delete sparse[randomIdx];
    }
    return sparse;
}

//копіювання масиву
function copyArr(arr) {
    let copy = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        copy[i] = arr[i];
    }
    return copy;
}

//СТВОРЕННЯ МАСИВІВ
const ARRAY_LENGTH = 100;
let baseDenseArray = generateRandomArray(ARRAY_LENGTH);
let baseSparseArray = makeSparseArray(baseDenseArray, 15);

console.log("==================================================");
console.log("НЕРОЗРІДЖЕНИЙ МАСИВ");

console.log("За зростанням");
SortLib.bubbleSort(copyArr(baseDenseArray), 'asc');

console.log("\n-За спаданням");
SortLib.selectionSort(copyArr(baseDenseArray), 'desc');

console.log("\n-За зростанням");
SortLib.insertionSort(copyArr(baseDenseArray), 'asc');

console.log("\n-За спаданням");
SortLib.shellSort(copyArr(baseDenseArray), 'desc');

console.log("\n-За зростанням");
let qsResult = SortLib.quickSort(copyArr(baseDenseArray), 'asc');
console.log("Фрагмент відсортованого масиву:", qsResult.slice(0, 10));


console.log("\n\n==================================================");
console.log("РОЗРІДЖЕНИЙ МАСИВ");

console.log("За зростанням");
SortLib.bubbleSort(copyArr(baseSparseArray), 'asc');

console.log("\n-За спаданням");
SortLib.selectionSort(copyArr(baseSparseArray), 'desc');

console.log("\n-За зростанням");
SortLib.insertionSort(copyArr(baseSparseArray), 'asc');

console.log("\n-За спаданням");
SortLib.shellSort(copyArr(baseSparseArray), 'desc');

console.log("\n-За зростанням");
let qsSparseResult = SortLib.quickSort(copyArr(baseSparseArray), 'asc');

console.log("Кінець відсортованого масиву:", qsSparseResult.slice(-15));
