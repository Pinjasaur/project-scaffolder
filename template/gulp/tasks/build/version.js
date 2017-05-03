module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.dist}/**/*.+(html|css|js)`)
      .pipe(plugins.if("*.html",
        plugins.footer(config.banners.xml)
      ))
      .pipe(plugins.if("*.css",
        plugins.footer(config.banners.clike)
      ))
      .pipe(plugins.if("*.js",
        plugins.footer(config.banners.clike)
      ))
      .pipe(gulp.dest(paths.dist));
  };
};
