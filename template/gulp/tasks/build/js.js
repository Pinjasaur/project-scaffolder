module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    // Ignore JS in the js/vendor directory since we didn't author it
    gulp.src([
        `${paths.src}/${paths.js.src}/**/*.js`,
        `!${paths.src}/${paths.js.src}/{vendor,vendor/**}`
      ])
      .pipe(plugins.jshint(config.jshint))
      .pipe(plugins.jshint.reporter("jshint-stylish"));

    let bundler = plugins.browserify({
      entries: `${paths.src}/${paths.js.src}/${paths.js.entry}`,
      debug: true
    });

    bundler.transform(plugins.babelify);

    return bundler.bundle()
      .on("error", function(err) {
        plugins.util.log(err.message);
        this.emit("end");
      })
      .pipe(plugins.vinylSourceStream(paths.js.entry))
      .pipe(plugins.vinylBuffer())
      .pipe(plugins.sourcemaps.init({ loadMaps: true }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(`${paths.tmp}/${paths.js.dist}`))
      .pipe(plugins.if(!production, server.stream()));
  };
};
