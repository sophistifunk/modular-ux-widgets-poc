const ref = require('./dist/build/Reflector');
const doc = require('./dist/build/DocGenerator');
const fs = require('./dist/build/fsPromises');
const wc = require('./dist/build/WidgetComponent');

console.log('\n')

const typePromise = ref.typedocReflector('../example-widget/types.json');
const descPromise = fs.readFile('../example-widget/src/WidgetDescription.json', 'UTF8')
    .then(json => wc.parseWidgetDescription(JSON.parse(json)));

Promise.all([typePromise, descPromise])
    .then(([reflector, widgetDescription]) => new doc.basicDocGenerator(reflector, widgetDescription))
    .then(docGenerator => {
        console.log(docGenerator.debug());
        if (docGenerator.warnings.length) {
            console.error('Warning:\n * ' + docGenerator.warnings.join('\n * '));
        }
    })
    .catch(e => {
        console.error(e);
    }) ;