module.exports = (params) => {
  return (done) => {
    const {gulp, plugins, config, paths, production, root, server, version, pkg} = params;

    server.reload();
    done();
  }
};
