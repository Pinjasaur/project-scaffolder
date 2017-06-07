module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.www}/*.html`)
      .pipe(plugins.useref({
        searchPath: [
          paths.src,
          paths.www
        ]
      }))
      .pipe(plugins.if("*.css",
        plugins.csso(config.csso)
      ))
      .pipe(plugins.if("*.js",
        plugins.uglify()
      ))
      .pipe(plugins.if("*.html",
        plugins.htmlmin(config.htmlmin)
      ))
      .pipe(gulp.dest(paths.tmp));
  };
};
