module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    let useref = plugins.lazypipe()
          .pipe(plugins.useref)
          .pipe(() => {
            // Minify CSS
            return plugins.if("*.css",
              plugins.csso(config.csso)
            )
          })
          .pipe(() => {
            // Minify JS
            return plugins.if("*.js",
              plugins.uglify()
            )
          })
          .pipe(() => {
            // Minify HTML
            return plugins.if("*.html",
              plugins.htmlmin(config.htmlmin)
            )
          });

    return gulp.src(`${paths.src}/*.html`)
      .pipe(plugins.if(production, useref()))
      .pipe(gulp.dest(paths.tmp))
      .pipe(plugins.if(!production, server.stream()));
  };
};
