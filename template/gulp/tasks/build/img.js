module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.src}/img/**/*.+(jpg|jpeg|gif|png|svg)`)
      .pipe(plugins.imagemin(config.imagemin))
      .pipe(plugins.if(production, gulp.dest(`${paths.tmp}/img`), gulp.dest(`${paths.www}/img`)))
      .pipe(plugins.if(!production, server.stream()));
  };
};
