const gulp = require('gulp');
// const debug = require('gulp-debug');
const del = require('del');
const ts = require("gulp-typescript");
const runSequence = require('run-sequence');
const { createDistPackage } = require('./src/framework/distPackage');

var tsProject = ts.createProject('tsconfig.json');
var tsProjectFW = ts.createProject('tsconfig.json');

gulp.task('clean', () =>
    del('dist')
);

gulp.task("ts", () =>
    gulp.src("./src/main/**/*.{ts,tsx}")
        .pipe(tsProject())
        .pipe(gulp.dest("./dist/lib"))
);

gulp.task("ts-framework", () =>
    gulp.src("./src/framework/**/*.{ts,tsx}")
        .pipe(tsProjectFW())
        .pipe(gulp.dest("./dist/framework"))
);

gulp.task('make-dist-package', () =>
    createDistPackage('./package.json', './dist/package.json')
);

gulp.task('copy-styles', () =>
    gulp.src('./src/styles/**/*.css')
        .pipe(gulp.dest('./dist/styles'))
);

gulp.task('build-all', ['ts', 'copy-styles', 'ts-framework']);

gulp.task('dist', done =>
    runSequence('clean', 'build-all', 'make-dist-package', done)
);