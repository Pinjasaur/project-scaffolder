module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.src}/fonts/**/*.+(eot|woff2|woff|ttf|svg)`)
      .pipe(plugins.if(production, gulp.dest(`${paths.tmp}/fonts`), gulp.dest(`${paths.www}/fonts`)));
  };
};
