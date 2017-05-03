module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    gulp.watch(`scss/**/*.scss`, {
      cwd: `${paths.src}/`
    }, ["build:css"]);

    gulp.watch(`js/**/*.js`, {
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

    gulp.watch(`*.html`, {
      cwd: `${paths.src}/`
    }, ["build:html"]);
  };
};
