'use strict';

// Require Logic
var lib = require('../lib');
var dynamo = require('../lib/dynamo');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
  dynamo.getSites().then(function (sites) {
    console.log(sites);
    var html = lib.renderTemplate("index/index.html", {stage: event.stage, sites: sites});
    return cb(null, html);
  });
};
