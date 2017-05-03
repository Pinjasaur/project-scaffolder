module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    return gulp.src(`${paths.tmp}/**`)
      .pipe(plugins.revAll.revision({
        dontRenameFile: [
          /\.html/g,
          /favicon.ico/g
        ]
      }))
      .pipe(gulp.dest(paths.dist));
  };
};
