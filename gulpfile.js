const gulp = require("gulp");

const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");
const connect = require("gulp-connect");

gulp.task("build-js", function() {
  return browserify("./src/app.jsx", {debug: true})
    .transform("babelify")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build-css", function() {
  return gulp.src("./src/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["build-js", "build-css"]);
gulp.task("default", ["build"]);

gulp.task("dev", ["build"], function() {
  connect.server({root: "./dist"});
  gulp.watch(["./src/**/*.js", "./src/**/*.jsx"], ["build-js"]);
  gulp.watch(["./src/**/*.css", "./src/**/*.scss"], ["build-css"]);
});