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
const root       = (production) ? paths.dist : paths.tmp;
const config     = require("./gulp/config")(plugins, root, version);
const params     = {
  gulp: gulp,
  plugins: plugins,
  config: config,
  paths: paths,
  production: production,
  root: root,
  server: server,
  version: version
};

function task(task) {
  return require(`./gulp/tasks/${task.replace(/:/g, "/")}`)(params);
}

// "Build" HTML files: optimize JS, CSS, HTML,
gulp.task("build:html", task("build:html"));

// Build the SCSS (Autoprefixer, Sourcemaps)
gulp.task("build:css", task("build:css"));

// Build the JS (lint)
gulp.task("build:js", task("build:js"));

// Build (optimize) images
gulp.task("build:img", task("build:img"));

// Pack SVG icons into a single SVG file
gulp.task("build:svg", task("build:svg"));

// Copy fonts
gulp.task("build:fonts", task("build:fonts"));

// Revision assets
gulp.task("build:rev", task("build:rev"));

// Append build version and info to files
gulp.task("build:version", task("build:version"));

// Show total build size
gulp.task("build:size", task("build:size"));

// Build task
gulp.task("build", ["clean"], task("build"));

// Zip up production build
gulp.task("zip", ["build"], task("zip"));

// Spins up local server
gulp.task("server", ["build"], task("server"));

// Build assets and spin up server
gulp.task("serve", ["server"], task("serve"));

// Clean the dist directory
gulp.task("clean", task("clean"));

// Bump the version
gulp.task("bump", task("bump"));

// Default task
gulp.task("default", ["serve"]);
