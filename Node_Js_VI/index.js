const fs = require('fs').promises;
const path = require('path');

async function processFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');
        let sum = 0;

        for (let line of lines) {
            line = line.trim();
            if (line) {
                const number = parseFloat(line);
                if (isNaN(number)) {
                    throw new Error(`Invalid number format in file ${filePath}: ${line}`);
                }
                sum += number;
            }
        }
        return sum;
    } catch (err) {
        console.error(`Error processing file ${filePath}: ${err.message}`);
        return 0;
    }
}

async function processFiles(filePaths) {
    let totalSum = 0;

    for (const filePath of filePaths) {
        const fileSum = await processFile(filePath);
        totalSum += fileSum;
    }

    return totalSum;
}

(async () => {
    try {
        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt']; // the examiner can replace with their own file
        const filePaths = fileNames.map(fileName => path.join(__dirname, fileName));

        const totalSum = await processFiles(filePaths);
        console.log(`The total sum of all numbers in the files is: ${totalSum}`);
    } catch (err) {
        console.error(`Unexpected error: ${err.message}`);
    }
})();


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); 
});
