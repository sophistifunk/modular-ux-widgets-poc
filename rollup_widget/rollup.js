const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');

async function bundle(bundleResources) {
    const bundle = await rollup.rollup({
        input: './src/main.tsx',
        external: [ "react"],
        
        plugins: [
            typescript({tsconfig: 'tsconfig.json'}),
            postcss({
                extract: !bundleResources
            }) 
        ]
    });  
  
    await bundle.write({
        format: 'es',
        file: `dist/widget${bundleResources ? '.resource.bundle' : ''}.js`
    })
}

async function build() {
    await bundle()
    await bundle(true)
}

build()
