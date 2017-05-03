module.exports = (params) => {
  return () => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    let env = plugins.util.env,
        colors = plugins.util.colors,
        bump = (env.major) ? "major" :
                 (env.minor) ? "minor" :
                   (env.patch) ? "patch" :
                     null;

    if (bump === null) {
      plugins.util.log(`Must specify bump type: ${colors.red("--major")}, ${colors.red("--minor")}, or ${colors.red("--patch")}`);
      return;
    } else {
      let bumped = plugins.semver.inc(version, bump);

      return gulp.src("./VERSION")
        .pipe(plugins.prompt.prompt({
          type: "input",
          name: "answer",
          message: `Confirm you'd like to bump version (${bump})? [y/n]`
        }, (response) =>  {
          return /^y(es)?$/i.test(response.answer);
        }))
        .pipe(plugins.replace(/.*/, bumped))
        .pipe(plugins.notify(`Bumped ${version} to ${bumped}!`))
        .pipe(gulp.dest("./"));
    }
  };
};
