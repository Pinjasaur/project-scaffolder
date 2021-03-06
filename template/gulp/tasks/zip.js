module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.dist}/**`)
      .pipe(plugins.zip(`${pkg.name}_www.zip`))
      .pipe(gulp.dest("."));
  };
};
