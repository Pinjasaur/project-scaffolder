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
  var prompts = ["name", "owner", "description", "private [y/n]", "license"];
  var metadata = metalsmith.metadata();

  async.eachSeries(prompts, run, done);

  function run(key, done){
    prompt(`${key}: `, function(val){
      // Treat 'private' as a boolean
      if (key === "private [y/n]") {
        val = /^y(es)?$/i.test(val);
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
