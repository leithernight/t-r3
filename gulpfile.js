const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const patch = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/images/*',
        dest: 'dist/images/'
    }
}

const rename = require('gulp-rename');
const clean_css = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

function clean() {
    return del(['dist'])
}
function styles() {
    return gulp.src(patch.styles.src)
    .pipe(less())
    .pipe(clean_css())
    .pipe(rename({
        basename: 'style',
        suffix: '.min'
    }))
    .pipe(gulp.dest(patch.styles.dest))
}

function images() {
    return gulp.src(patch.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(patch.images.dest))
}

function scripts() {
    return gulp.src(patch.scripts.src, {
        sourcemaps: true,
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(patch.scripts.dest))

}

function watch() {
    gulp.watch(patch.styles.src, styles)
    gulp.watch(patch.scripts.src, scripts)
}


exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.scripts = scripts;
exports.images = images;

exports.build = gulp.series(clean, gulp.parallel(styles, scripts, images), watch);
exports.default = gulp.series(clean, gulp.parallel(styles, scripts, images), watch);