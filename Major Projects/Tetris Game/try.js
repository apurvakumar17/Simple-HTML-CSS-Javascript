function getDimensions(matrix) {
    let height = 0;
    let width = 0;

    for (let row of matrix) {
        if (row.includes(1)) {
            height++;
            width = Math.max(width, row.filter(cell => cell === 1).length);
        }
    }

    return { height, width };
}

// Example usage:
const arr = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
];

console.log(getDimensions(arr)); // Output: { height: 4, width: 1 }