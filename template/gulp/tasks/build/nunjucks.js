module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    return gulp.src(`${paths.src}/*.+(njk|html|nunjucks)`)
      .pipe(plugins.nunjucksRender({
        path: ["app/templates"]
      }))
      .pipe(gulp.dest(paths.www))
      .pipe(plugins.if(!production, server.stream()));
  };
};
