'use strict';

// Require Logic
const lib = require('../lib');
const dynamo = require('../lib/dynamo');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
  const params = lib.formParams(event.data);
  const site = {"name": params['name'], "url": params['site']};
  console.log(site);
  dynamo.createSite(site).then(function(result){
    return cb(null, {
      location: "./"
    });
  });
};
