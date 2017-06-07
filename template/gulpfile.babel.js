const gulp        = require("gulp");
const plugins     = require("gulp-load-plugins")({
        // Extend pattern matching
        pattern: [
          "babelify",
          "browser-sync",
          "browserify",
          "lazypipe",
          "run-sequence",
          "semver",
          "vinyl-buffer",
          "vinyl-source-stream"
        ],
        // Don't override default patterns
        overridePattern: false
      });
const server     = plugins.browserSync.create();
const pkg        = require("./package.json");
const version    = require("fs").readFileSync("./VERSION").toString();
const production = (plugins.util.env.prod || plugins.util.env.production) ? true : false;
const paths      = require("./gulp/paths");
const root       = (production) ? paths.dist : paths.www;
const config     = require("./gulp/config")(plugins, root, version, pkg);
const params     = {gulp, plugins, config, paths, production, root, server, version, pkg};

function task(task) {
  return require(`./gulp/tasks/${task.replace(/:/g, "/")}`)(params);
}


/**
 * Build-related tasks.
 */

// "Build" HTML files: optimize JS, CSS, HTML
gulp.task("build:useref", task("build:useref"));

// Compile Nunjucks templates
gulp.task("build:nunjucks", task("build:nunjucks"));

// Build the SCSS (Autoprefixer, Sourcemaps)
gulp.task("build:sass", task("build:sass"));

// Build the JS (lint)
gulp.task("build:js", task("build:js"));

// Build (optimize) images
gulp.task("build:img", task("build:img"));

// Pack SVG icons into a single SVG file
gulp.task("build:svg", task("build:svg"));

// Copy fonts
gulp.task("build:fonts", task("build:fonts"));

// Copy humans.txt
gulp.task("build:humans.txt", task("build:humans.txt"));

// Revision assets
gulp.task("build:rev", task("build:rev"));

// Append build version and info to files
gulp.task("build:version", task("build:version"));

// Show total build size
gulp.task("build:size", task("build:size"));

// Build task
gulp.task("build", ["clean"], task("build"));


/**
 * Watch-related tasks.
 */

// Reloads browser after build:nunjucks
gulp.task("watch:nunjucks", ["build:nunjucks"], task("watch:nunjucks"));

// Reloads browser after build:js
gulp.task("watch:js", ["build:js"], task("watch:js"));

// Reloads browser after build:img
gulp.task("watch:img", ["build:img"], task("watch:img"));

// Reloads browser after build:svg
gulp.task("watch:svg", ["build:svg"], task("watch:svg"));

// Reloads browser after build:fonts
gulp.task("watch:fonts", ["build:fonts"], task("watch:fonts"));


/**
 * Standalone tasks.
 */

// Zip up production build
gulp.task("zip", task("zip"));

// Spins up local server
gulp.task("server", ["build"], task("server"));

// Build assets and spin up server
gulp.task("serve", ["server"], task("serve"));

// Clean directories that are built
gulp.task("clean", task("clean"));

// Bump the version
gulp.task("bump", task("bump"));

// Default task
gulp.task("default", ["serve"]);
