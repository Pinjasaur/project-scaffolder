var async = require("async");
var Metalsmith = require("metalsmith");
var prompt = require("cli-prompt");
var render = require("consolidate").handlebars.render;

/**
 * Build.
 */
var metalsmith = Metalsmith(__dirname)
  .source("template")
  .destination("scaffold")
  .use(ask)
  .use(template)
  .build(function(err){
    if (err) throw err;
  });

/**
 * Prompt plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
function ask(files, metalsmith, done){
  var prompts = ["name", "owner", "author", "description", "private", "license"];
  var hints = {
    "name": "project/repo",
    "owner": "GitHub user/org",
    "author": "your name",
    "description": "short 'n sweet",
    "private": "package managers",
    "license": "MIT, ISC, etc."
  };
  var metadata = metalsmith.metadata();

  async.eachSeries(prompts, run, done);

  function run(key, done){
    prompt(`${key} (${hints[key]}): `, function(val){
      // Treat 'private' as a boolean
      if (key === "private") {
        val = /^((t(rue)?|y(es)?))$/i.test(val);
      }
      metadata[key] = val;
      done();
    });
  }
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
function template(files, metalsmith, done){
  var keys = Object.keys(files);
  var metadata = metalsmith.metadata();

  async.each(keys, run, done);

  function run(file, done){
    var str = files[file].contents.toString();
    render(str, metadata, function(err, res){
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}
