/**
 * Propagates widget dev package.json into widget dist package.json
 * 
 * TODO: Should live in the framework module, should be a gulp plugin
 */

const fs = require('./fsPromises');

function createDistPackage(sourceFilePath, destFilePath) {
    return fs.readFile(sourceFilePath, 'utf8')
        .then(src => JSON.parse(src))
        .then(packageDetails => processPackage(packageDetails))
        .then(obj => JSON.stringify(obj, null, 2))
        .then(src => fs.writeFile(destFilePath, src, 'utf8'));
}

function processPackage(packageDetails) {
    // Delete some things unneeded for the distributed artefact
    packageDetails.scripts = {};
    delete packageDetails.devDependencies;

    // Tweak some settings
    packageDetails.main = 'lib/index.js';
    packageDetails.types = 'lib/index.d.ts';

    // TODO: Ability to publish from dist
    packageDetails.scripts.prepublishOnly = 'echo "NOT YET" && exit 1';

    return packageDetails;
}

module.exports = { createDistPackage, processPackage };