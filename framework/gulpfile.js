const gulp = require('gulp');
const del = require('del');
const ts = require("gulp-typescript");
const runSequence = require('run-sequence');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () =>
    del('dist')
);

// Compile the widget's code
gulp.task("ts", () =>
    gulp.src("./src/**/*.{ts,tsx}")
        .pipe(tsProject())
        .pipe(gulp.dest("./dist/lib"))
);

// Create the inner package.json within /dist for publishing
gulp.task('make-dist-package', () => {
    const { createDistPackage } = require('./dist/lib/distPackage');
    return createDistPackage('./package.json', './dist/package.json')
});

// All the tasks we can do in parallel after clean, before make-dist-package
gulp.task('build-all', ['ts']);

// Main sequence for clean-building /dist ready for publish
gulp.task('dist', done =>
    runSequence('clean', 'build-all', 'make-dist-package', done)
);