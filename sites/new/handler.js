'use strict';

// Require Logic
const lib = require('../lib');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
  const html = lib.renderTemplate("new/new.html", {stage: event.stage});
  return cb(null, html);
};
