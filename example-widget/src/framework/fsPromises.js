// Quick re-impl of (the subset we care about of) fs.promises from node 10

const fs = require('fs');

function readFile(sourceFilePath, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(sourceFilePath, options, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

function writeFile(destFilePath, data, options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(destFilePath, data, options, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        })

    });
}

module.exports = { readFile, writeFile }
