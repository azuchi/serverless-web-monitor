'use strict';

// Require Logic
const lib = require('../lib');
const dynamo = require('../lib/dynamo');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
  dynamo.getSites().then(function (sites) {
    console.log(sites);
    var html = lib.renderTemplate("delete/delete.html", {stage: event.stage, sites: sites});
      return cb(null, html);
  });
};
