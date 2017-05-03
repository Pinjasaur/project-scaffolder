module.exports = (params) => {
  return (done) => {
    const {gulp, plugins, config, paths, production, root, server} = params;

    if (production) {
      plugins.runSequence(
        [
          "build:css",
          "build:js",
          "build:img",
          "build:svg",
          "build:fonts"
        ],
        "build:html",
        "build:rev",
        "build:version",
        "build:size",
        done
      );
    } else {
      plugins.runSequence(
        [
          "build:html",
          "build:css",
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
