'use strict';

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../lib');
var dynamo = require('../lib/dynamo');

// Lambda Handler
module.exports.handler = function(event, context) {
  var params = lib.formParams(event.data);
  var site = {"name": params['name'], "url": params['site']};
  console.log(site);
  dynamo.createSite(site).then(function(result){
    console.log(result);
    context.succeed({location: "/" + event.stage + "/sites/"});
  });
};