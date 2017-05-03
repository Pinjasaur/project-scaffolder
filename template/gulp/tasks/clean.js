module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src([
        paths.dist,
        paths.tmp
      ], {
        read: false
      })
      .pipe(plugins.clean({ force: true }));
  };
};
