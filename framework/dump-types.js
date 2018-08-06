const ref = require('./dist/build/Reflector');

console.log('\n')

ref.typedocReflector('../example-widget/types.json').then(reflector => {
    console.log(reflector.debug());
});