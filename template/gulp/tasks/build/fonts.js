module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    return gulp.src(`${paths.src}/fonts/**/*.+(eot|woff2|woff|ttf|svg)`)
      .pipe(gulp.dest(`${paths.tmp}/fonts`))
      .pipe(plugins.if(!production, server.stream()));
  };
};
