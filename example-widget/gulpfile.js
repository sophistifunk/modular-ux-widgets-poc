const gulp = require('gulp');
// const debug = require('gulp-debug');
const del = require('del');
const ts = require("gulp-typescript");
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const yaml = require('gulp-yaml');

const { createDistPackage } = require('./src/framework/distPackage');

const tsProject = ts.createProject('tsconfig.json');
const tsProjectFW = ts.createProject('tsconfig.json');

gulp.task('clean', () =>
    del('dist')
);

// Compile the widget's code
gulp.task("ts", () =>
    gulp.src("./src/main/**/*.{ts,tsx}")
        .pipe(tsProject())
        .pipe(gulp.dest("./dist/lib"))
);

// Compile the framework code - TODO: Get framework code from a module
gulp.task("ts-framework", () =>
    gulp.src("./src/framework/**/*.{ts,tsx}")
        .pipe(tsProjectFW())
        .pipe(gulp.dest("./dist/framework"))
);

// Create the inner package.json within /dist for publishing
gulp.task('make-dist-package', () =>
    createDistPackage('./package.json', './dist/package.json')
);

// This compiles the scss to a single /dist/styles/css/main.css for hosts that don't want to compile the css
gulp.task('compile-sass', () =>
    gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles/css'))
);

// This copies the scss files to /dist/styles/scss for hosts that want to use the scss files instead
gulp.task('copy-sass', () => 
    gulp.src('./src/styles/**/*.scss')
        .pipe(gulp.dest('./dist/styles/scss'))
);

// Copy any assests that need static hosting
gulp.task('copy-assets', () =>
    gulp.src('./assets/**/*.{gif,png,jpg}')
        .pipe(gulp.dest('./dist/assets'))
);

// Convert the YAML files for i18n into json
gulp.task('i18n', () => 
    gulp.src('./src/i18n/*.yaml')
        .pipe(yaml({ safe: true, schema: 'DEFAULT_SAFE_SCHEMA' }))
        .pipe(gulp.dest('./dist/i18n'))
);

// All the tasks we can do in parallel after clean, before make-dist-package
gulp.task('build-all', ['ts', 'ts-framework', 'compile-sass', 'copy-sass', 'copy-assets', 'i18n']);

// Main sequence for clean-building /dist ready for publish
gulp.task('dist', done =>
    runSequence('clean', 'build-all', 'make-dist-package', done)
);