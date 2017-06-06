module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.src}/${paths.css.src}/${paths.css.entry}`)
      .pipe(plugins.plumber())
      // Need to use sass.sync() for `plumber` to work correctly and not hang
      // https://github.com/floatdrop/gulp-plumber/issues/32#issuecomment-106589180
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass.sync())
      .pipe(plugins.autoprefixer(config.autoprefixer))
      .pipe(plugins.sourcemaps.write("./"))
      .pipe(plugins.plumber.stop())
      .pipe(plugins.if(production, gulp.dest(`${paths.src}/${paths.css.dist}`), gulp.dest(`${paths.tmp}/${paths.css.dist}`)))
      .pipe(plugins.if(!production, server.stream({ match: "**/*.css"})));
  };
};
