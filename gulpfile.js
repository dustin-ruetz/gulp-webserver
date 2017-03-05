"use strict";

const gulp = require("gulp"),
		pug = require("gulp-pug"), // markup - Pug to HTML
		inline = require("gulp-inline"), // markup - image SVGs to inline SVGs
		sass = require("gulp-sass"), // style - SCSS to CSS
		autoprefixer = require("gulp-autoprefixer"), // style - adds vendor prefixes
		babel = require("gulp-babel"), // script - ES6 to ES5 (requires "babel-preset-es2015" module)
		plumber = require("gulp-plumber"), // build tool - prevents gulp pipe from stopping on error
		notify = require("gulp-notify"), // build tool - used to show errors/messages via tray notifications
		sourcemaps = require("gulp-sourcemaps"), // build tool - creates sourcemaps for source file
		browsersync = require("browser-sync"), // build tool - synchronize view/scroll states in multiple browsers
		doctoc = require("gulp-doctoc"); // documentation - automatically generates Table of Contents in readme.md

// default tasks to run on "gulp" command
gulp.task("default",
	[
		"markup",
		"style",
		"script",
		"devWebserver",
		"readmeTOC",
		"watch"
	],
	() => {
		gulp.src("").pipe(notify({message: "dev-webserver has been started."}));
	}
);

// markup task
// 1) source: all Pug from dev/ pipes into...
// 2) pug: converts Pug to HTML, then pipes into...
// 3) inline: converts image SVGs to inline SVGs, then pipes into...
// 4) destination: public/ which then pipes into...
// 5) browsersync: reload the page with the updated markup
gulp.task("markup", () => {
	return gulp.src("dev/**/*.pug")
		.pipe(plumber({
			errorHandler: notify.onError("Markup Error: <%= error.message %>")
		}))
		.pipe(pug({
			// pretty: "\t" // output prettified HTML with tab indentation
			pretty: false // output compressed/minified HTML
		}))
		.pipe(inline({
			base: "icons",
			disabledTypes: ["css", "img", "js"]
		}))
		.pipe(gulp.dest("public/"))
		.pipe(browsersync.reload({stream: true}));
});

// style task
// 1) source: all SCSS from dev/styles/ pipes into...
// 2) plumber: prevents gulp pipe from stopping on error and calls notify if an error is found
// 3) notify: shows tray notification listing error message and line number, then pipes into...
// 4) sourcemaps: initializes sourcemaps for source file, then pipes into...
// 5) sass: converts SCSS to compressed/minified CSS
// 6) if sass finds a syntax error it logs it in the terminal, then pipes into...
// 7) autoprefixer: adds in vendor prefixes, then pipes into...
// 8) sourcemaps: writes sourcemaps for source file, then pipes into...
// 9) destination: public/styles/ which then pipes into...
// 10) browsersync: injects CSS into the browser without full page reload
gulp.task("style", () => {
	return gulp.src("dev/styles/*.scss")
		.pipe(plumber({
			errorHandler: notify.onError("Style Error: <%= error.message %>")
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

// script Task
// 1) source: all JS from dev/scripts/ pipes into...
// 2) plumber: prevents gulp pipe from stopping on error and calls notify if an error is found
// 3) notify: shows tray notification listing error message and line number, then pipes into...
// 4) sourcemaps: initializes sourcemaps for source file, then pipes into...
// 5) babel: transpiles ES6 to ES5 using the ES2015 preset, compacts and minifies code, then pipes into...
// 6) sourcemaps: writes sourcemaps for source file, then pipes into...
// 7) destination: public/scripts/ which then pipes into...
// 8) browsersync: reload the page with the updated script
gulp.task("script", () => {
	return gulp.src("dev/scripts/*.js")
		.pipe(plumber({
			errorHandler: notify.onError("Script Error: <%= error.message %>")
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

// devWebserver task
gulp.task("devWebserver", () => {
	browsersync.init({
		port: 4000, // static port assigned to devWebserver
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

// readmeTOC task
// 1) source: readme.md file pipes into...
// 2) doctoc: generates TOC, then pipes into...
// 3) destination: same as source (contents of readme.md TOC are automatically overwritten/updated)
gulp.task("readmeTOC", () => {
	return gulp.src("readme.md")
		.pipe(doctoc())
		.pipe(gulp.dest(""));
});

// watch task
gulp.task("watch", () => {
	// files to watch and tasks to run
	gulp.watch("dev/**/*.pug", ["markup"]);
	gulp.watch("dev/styles/*.scss", ["style"]);
	gulp.watch("dev/scripts/*.js", ["script"]);
	gulp.watch("readme.md", ["readmeTOC"]);
});