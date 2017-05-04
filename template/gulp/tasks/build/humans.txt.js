module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`./humans.txt`)
      .pipe(plugins.updateHumanstxtDate())
      .pipe(gulp.dest(paths.dist));
  };
};
