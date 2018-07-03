const fs = require('fs');
const path = require('path');

const dist = './dist';
const destPackagePath = path.resolve(dist, 'package.json');

if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

// Start with initial package
const package = require('./package.json')

// Delete some things unneeded for the distributed artefact
package.scripts = {};
delete package.devDependencies;

// Tweak some settings
package.main = 'index.js';
package.types = 'index.d.ts';

// TODO: Ability to publish from dist
package.scripts.prepublishOnly = 'echo "NOT YET" && exit 1';

// Write the artefact package.json
fs.writeFileSync(destPackagePath, JSON.stringify(package, null, 2), 'UTF8');