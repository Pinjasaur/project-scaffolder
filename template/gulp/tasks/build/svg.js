module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    return gulp.src(`${paths.src}/icons/**/*.svg`)
      .pipe(plugins.imagemin([
        plugins.imagemin.svgo({
          plugins: [{
            cleanIDs: true
          }, {
            convertStyleToAttrs: true
          }, {
            removeStyleElement: true
          }, {
            removeUselessDefs: true
          }, {
            removeAttrs: {
              attrs: ["class"]
            }
          }]
        })
      ], config.imagemin))
      .pipe(plugins.rename({ prefix: "icon-" }))
      .pipe(plugins.svgstore())
      .pipe(plugins.rename({ basename: "map" }))
      .pipe(gulp.dest(paths.tmp))
      .pipe(plugins.if(!production, server.stream()));
  };
};
