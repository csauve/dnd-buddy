const gulp = require("gulp");

const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");

const SRC_DIR = "./client";
const DST_DIR = "./static";

gulp.task("build-js", function() {
  return browserify(`${SRC_DIR}/app.jsx`, {debug: true})
    .transform("babelify")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(DST_DIR));
});

gulp.task("build-css", function() {
  return gulp.src(`${SRC_DIR}/app.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(DST_DIR));
});

gulp.task("build", ["build-js", "build-css"]);
gulp.task("default", ["build"]);

gulp.task("dev", ["build"], function() {
  gulp.watch([`${SRC_DIR}/**/*.js`, `${SRC_DIR}/**/*.jsx`], ["build-js"]);
  gulp.watch([`${SRC_DIR}/**/*.css`, `${SRC_DIR}/**/*.scss`], ["build-css"]);
});