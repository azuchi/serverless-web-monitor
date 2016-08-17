'use strict';

// Require Logic
var lib = require('../lib');

// Lambda Handler
module.exports.handler = function(event, context, cb) {

  lib.respond(event, function(error, response) {
    return cb(error, response);
  });
};
