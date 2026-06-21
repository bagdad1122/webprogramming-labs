(function(window) {
    const SortLib = {};


    function extractValidElements(arr) {
        let cleanArr = [];
        let undefinedCount = 0;
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else {
                cleanArr.push(arr[i]);
            }
        }

        if (undefinedCount > 0) {
            console.log(`Знайдено розріджених елементів: ${undefinedCount}. Їх перенесено в кінець.`);
        }
        
        return { cleanArr, undefinedCount };
    }

    function restoreUndefined(arr, count) {
        for (let i = 0; i < count; i++) {
            arr.push(undefined);
        }
        return arr;
    }

    function logStats(name, comparisons, moves) {
        console.log(`[${name}] Порівнянь: ${comparisons}, Обмінів/переміщень: ${moves}`);
    }


    //СОРТУВАННЯ ОБМІНУ
    SortLib.bubbleSort = function(arr, order = 'asc') {
        let { cleanArr, undefinedCount } = extractValidElements(arr);
        let comparisons = 0, swaps = 0;
        let n = cleanArr.length;
        let isAsc = order === 'asc';

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                let condition = isAsc ? (cleanArr[j] > cleanArr[j + 1]) : (cleanArr[j] < cleanArr[j + 1]);
                
                if (condition) {
                    swaps++;
                    let temp = cleanArr[j];
                    cleanArr[j] = cleanArr[j + 1];
                    cleanArr[j + 1] = temp;
                }
            }
        }

        logStats('Bubble Sort', comparisons, swaps);
        return restoreUndefined(cleanArr, undefinedCount);
    };


    //СОРТУВАННЯ МІНІМАЛЬНИХ ЕЛЕМЕНТІВ
    SortLib.selectionSort = function(arr, order = 'asc') {
        let { cleanArr, undefinedCount } = extractValidElements(arr);
        let comparisons = 0, swaps = 0;
        let n = cleanArr.length;
        let isAsc = order === 'asc';

        for (let i = 0; i < n - 1; i++) {
            let targetIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                let condition = isAsc ? (cleanArr[j] < cleanArr[targetIdx]) : (cleanArr[j] > cleanArr[targetIdx]);
                if (condition) {
                    targetIdx = j;
                }
            }
            if (targetIdx !== i) {
                swaps++;
                let temp = cleanArr[i];
                cleanArr[i] = cleanArr[targetIdx];
                cleanArr[targetIdx] = temp;
            }
        }

        logStats('Selection Sort', comparisons, swaps);
        return restoreUndefined(cleanArr, undefinedCount);
    };


    //СОРТУВАННЯ ВСТАВКАМИ
    SortLib.insertionSort = function(arr, order = 'asc') {
        let { cleanArr, undefinedCount } = extractValidElements(arr);
        let comparisons = 0, moves = 0;
        let n = cleanArr.length;
        let isAsc = order === 'asc';

        for (let i = 1; i < n; i++) {
            let key = cleanArr[i];
            let j = i - 1;

            while (j >= 0) {
                comparisons++;
                let condition = isAsc ? (cleanArr[j] > key) : (cleanArr[j] < key);
                if (!condition) break;
                
                cleanArr[j + 1] = cleanArr[j];
                moves++;
                j--;
            }
            cleanArr[j + 1] = key;
        }

        logStats('Insertion Sort', comparisons, moves);
        return restoreUndefined(cleanArr, undefinedCount);
    };


    //СОРТУВАННЯ ШЕЛЛА
    SortLib.shellSort = function(arr, order = 'asc') {
        let { cleanArr, undefinedCount } = extractValidElements(arr);
        let comparisons = 0, moves = 0;
        let n = cleanArr.length;
        let isAsc = order === 'asc';

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = cleanArr[i];
                let j;
                for (j = i; j >= gap; j -= gap) {
                    comparisons++;
                    let condition = isAsc ? (cleanArr[j - gap] > temp) : (cleanArr[j - gap] < temp);
                    if (!condition) break;
                    
                    cleanArr[j] = cleanArr[j - gap];
                    moves++;
                }
                cleanArr[j] = temp;
            }
        }

        logStats('Shell Sort', comparisons, moves);
        return restoreUndefined(cleanArr, undefinedCount);
    };


    //ШВИДКЕ СОРТУВАННЯ ХОАРА
    SortLib.quickSort = function(arr, order = 'asc') {
        let { cleanArr, undefinedCount } = extractValidElements(arr);
        let comparisons = 0, swaps = 0;
        let isAsc = order === 'asc';

        function partition(subArr, low, high) {
            let pivot = subArr[Math.floor((low + high) / 2)];
            let i = low - 1;
            let j = high + 1;

            while (true) {
                do {
                    i++;
                    comparisons++;
                } while (isAsc ? subArr[i] < pivot : subArr[i] > pivot);

                do {
                    j--;
                    comparisons++;
                } while (isAsc ? subArr[j] > pivot : subArr[j] < pivot);

                if (i >= j) return j;

                swaps++;
                let temp = subArr[i];
                subArr[i] = subArr[j];
                subArr[j] = temp;
            }
        }

        function qs(subArr, low, high) {
            if (low < high) {
                let pi = partition(subArr, low, high);
                qs(subArr, low, pi);
                qs(subArr, pi + 1, high);
            }
        }

        if (cleanArr.length > 0) {
            qs(cleanArr, 0, cleanArr.length - 1);
        }

        logStats('Quick Sort (Hoare)', comparisons, swaps);
        return restoreUndefined(cleanArr, undefinedCount);
    };

    window.SortLib = SortLib;

})(window);
