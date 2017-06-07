module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    gulp.watch(`${paths.css.src}/**/*.scss`, {
      cwd: `${paths.src}/`
    }, ["build:sass"]);

    gulp.watch(`${paths.js.src}/**/*.js`, {
      cwd: `${paths.src}/`
    }, ["build:js"]);

    gulp.watch(`img/**`, {
      cwd: `${paths.src}/`
    }, ["build:img"]);

    gulp.watch(`icons/**`, {
      cwd: `${paths.src}/`
    }, ["build:svg"]);

    gulp.watch(`fonts/**`, {
      cwd: `${paths.src}/`
    }, ["build:fonts"]);

    gulp.watch(`*.+(njk|html|nunjucks)`, {
      cwd: `${paths.src}/`
    }, ["build:nunjucks"]);
  };
};
