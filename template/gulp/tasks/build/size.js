module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    const size = plugins.size();

    return gulp.src(`${paths.dist}/**`)
    .pipe(size)
    .pipe(plugins.notify({
      onLast: true,
      message: () => `Total size: ${size.prettySize}`
    }));
  };
};
