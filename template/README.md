# {{name}}

  {{description}}


## Development

### Setup
Please install the following:

- [EditorConfig][editorconfig] plugin for your text editor/IDE
- [Node.js][nodejs]
- [Yarn][yarn]
- Gulp and Bower (`npm install -g gulp-cli bower`)

1. `git clone` the repo.
2. `cd` to the root of the repo.
3. Run `yarn` to grab dependencies.
4. Run `gulp` to spin up a local server with live-reloading.
    - **Tip:** `gulp --tunnel` will provide a publicly shareable URL.
5. Code away.

### Gulp Tasks
There are several `gulp` tasks that can be useful when developing:

  - `serve` spins up a local server (is the `default` task)
    - `--prod` to serve the production assets (mimics production site)
    - `--tunnel` to create a temporary URL via localtunnel.me (to share with someone)
  - `build` builds the assets
    - `--prod` builds for production (minify, optimize, etc.)
  - `clean` wipes the build directory
  - `zip` builds production assets and zips them up
  - `bump` bumps the version in `VERSION` according to [semver][semver]
    - you must pass `--major`, `--minor`, or `--patch` to specify the type


## License

  {{license}}

[nodejs]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/en/docs/install
[editorconfig]: http://editorconfig.org/#download
[semver]: http://semver.org/
