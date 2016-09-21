'use strict';

// Require Logic
const lib = require('../lib');
const dynamo = require('../lib/dynamo');

module.exports.handler = function(event, context, cb) {
  const params = lib.formParams(event.data);
  const site = {"id": params['id']};
  console.log(site);
  dynamo.removeSite(site).then(function(result){
    return cb(null, {
      location: "../delete/"
    });
  });
};
