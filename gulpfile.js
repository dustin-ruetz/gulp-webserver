"use strict";

/*
    gulp module and descriptions of required packages
    - pug          : compile Pug to HTML
    - htmlPrettify : add proper indentation to compiled HTML
    - sass         : compile SCSS to CSS
    - autoprefixer : add vendor prefixes
    - babel        : transpile ES6 to ES5 (requires "babel-preset-es2015" NPM module)
    - plumber      : prevent gulp pipe from stopping on error
    - notify       : show errors/messages via tray notifications
    - sourcemaps   : creates sourcemaps for source file
    - browsersync  : synchronize events/views in multiple browsers
    - doctoc       : auto-generate Table of Contents in readme.md
*/
const gulp         = require("gulp"),
      pug          = require("gulp-pug"),
      htmlPrettify = require("gulp-html-prettify"),
      sass         = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      babel        = require("gulp-babel"),
      plumber      = require("gulp-plumber"),
      notify       = require("gulp-notify"),
      sourcemaps   = require("gulp-sourcemaps"),
      browsersync  = require("browser-sync"),
      doctoc       = require("gulp-doctoc");

const tasks = [
    "markup",
    "style",
    "script",
    "devWebserver",
    "readmeTOC",
    "watch"
];
gulp.task("default", tasks, () => {
        gulp.src("").pipe(notify({message: "dev-webserver has been started."}));
    }
);

gulp.task("markup", () => {
    return gulp.src("dev/**/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError("MARKUP ERROR: <%= error.message %>")
        }))
        .pipe(pug())
        .pipe(htmlPrettify({
            indent_char: " ",
            indent_size: 4
        }))
        .pipe(gulp.dest("public/"))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task("style", () => {
    return gulp.src("dev/styles/*.scss")
        .pipe(plumber({
            errorHandler: notify.onError("STYLE ERROR: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"})
            .on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 5 versions"],
            cascade: false
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("public/styles/"))
        .pipe(browsersync.stream({match: "**/*.css"}));
});

gulp.task("script", () => {
    return gulp.src("dev/scripts/*.js")
        .pipe(plumber({
            errorHandler: notify.onError("SCRIPT ERROR: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["es2015"],
            compact: true,
            minified: true
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("public/scripts/"))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task("devWebserver", () => {
    browsersync.init({
        // static port assigned to devWebserver
        port: 4000,
        server: {
            baseDir: "./",
            index: "public/index.html",
            middleware: (req, res, next) => {
                // static port assigned to local dev projects
                res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                next();
            }
        }
    });
});

gulp.task("readmeTOC", () => {
    return gulp.src("readme.md")
        .pipe(doctoc())
        .pipe(gulp.dest(""));
});

gulp.task("watch", () => {
    gulp.watch("dev/**/*.pug", ["markup"]);
    gulp.watch("dev/styles/*.scss", ["style"]);
    gulp.watch("dev/scripts/*.js", ["script"]);
    gulp.watch("readme.md", ["readmeTOC"]);
});