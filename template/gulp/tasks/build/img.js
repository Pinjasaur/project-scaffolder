module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.src}/img/**/*.+(jpg|jpeg|gif|png|svg)`)
      .pipe(plugins.imagemin(config.imagemin))
      .pipe(gulp.dest(`${paths.tmp}/img`))
      .pipe(plugins.if(!production, server.stream()));
  };
};
