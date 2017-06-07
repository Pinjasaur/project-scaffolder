module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src([
        `${paths.tmp}/**`,
        `!${paths.tmp}/**/*.map`
      ])
      .pipe(plugins.revAll.revision({
        dontRenameFile: [
          /\.html/g,
          /favicon.ico/g
        ]
      }))
      .pipe(gulp.dest(paths.dist));
  };
};
