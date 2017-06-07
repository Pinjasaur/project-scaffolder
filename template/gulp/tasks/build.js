module.exports = (params) => {
  return (done) => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    if (production) {
      plugins.runSequence(
        [
          "build:sass",
          "build:js",
          "build:nunjucks"
        ],
        [
          "build:useref",
          "build:img",
          "build:svg",
          "build:fonts",
          "build:humans.txt"
        ],
        "build:rev",
        "build:version",
        "build:size",
        done
      );
    } else {
      plugins.runSequence(
        [
          "build:nunjucks",
          "build:sass",
          "build:js",
          "build:img",
          "build:svg",
          "build:fonts"
        ],
        done
      );
    }
  };
};
