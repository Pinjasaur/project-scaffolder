module.exports = (plugins, root, version, pkg) => {
  return {
    autoprefixer: {
      browsers: [
        "last 2 versions",
        "> 1%"
      ]
    },
    banners: {
      xml: `\n<!-- v${version} built <%= new Date() %> on ${process.platform} ${process.arch} -->`,
      clike: `\n/* v${version} built <%= new Date() %> on ${process.platform} ${process.arch} */`
    },
    browserSync: {
      server: {
        baseDir: root,
        routes: {
          "/components": "app/components"
        }
      },
      notify: false,
      // Create a tunnel (if using `--tunnel`) with a subdomain of:
      // 1. the first "chunk" of the package.json `name`
      // 2. a random 6-character string appended to it
      // Note: needs to be lowercased alphanumerics
      tunnel: plugins.util.env.tunnel ?
      (pkg.name.trim().toLowerCase().split(/[^a-zA-Z0-9]/g)[0] + // [1]
      Math.random().toString(36).substr(2, 6)) :                 // [2]
      false,
    },
    csso: {
      comments: false
    },
    htmlmin: {
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    },
    imagemin: {
      verbose: true
    },
    jshint: {
      esversion: 6
    }
  }
};
