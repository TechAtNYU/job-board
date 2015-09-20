// compiler.js
'use strict';

var fs = require('fs')
  , path = require('path')
  , _ = require('underscore');

var cache = {};

exports.getTemplate = function(templateId, cb) {
  // Use your extension here
  var file = path.join(__dirname, templateId + ".md");
  fs.stat(file, function(err, stat) {
    if (err) return cb(err);
    // Try to get it from cache
    var cached = cache[templateId];
    if (cached && cached.mtime >= stat.mtime)
      return cb(null, cached.template);
    // Read it from file
    fs.readFile(file, { encoding: 'utf-8' }, function(err, data) {
      if (err) return cb(err);
      // Compile it
      var template = _.template(data);
      // Cache it
      cache[templateId] = {
        mtime: stat.mtime,
        template: template
      };
      // Return it
      return cb(null, template);
    });
  });
};

exports.compile = function(templateId, data, cb) {
  exports.getTemplate(templateId, function(err, template) {
    if (err) return cb(err);
    try {
      return cb(null, template(data));
    } catch (e) {
      return cb(e);
    }
  });
}
