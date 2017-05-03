module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    return gulp.src(`${paths.src}/fonts/**`)
      .pipe(gulp.dest(`${paths.tmp}/fonts`))
      .pipe(plugins.if(!production, server.stream()));
  };
};
