'use strict';

// Require Logic
const lib = require('../lib');

// Lambda Handler
module.exports.handler = function(event, context, cb) {

  lib.respond(event, function(error, response) {
    return cb(error, response);
  });
};
