'use strict';

// Require Logic
const dynamo = require('../lib/dynamo');
const lambda = require('../lib/lambda');

// Lambda Handler
module.exports.handler = function(event, context, cb) {

  dynamo.getSites().then(function (sites) {
    sites.forEach(function (site) {
      console.log(site);
      lambda.checkSite(site);
    });
    return cb(null, {
      message: "Site monitoring executed!"
    });
  });
};
