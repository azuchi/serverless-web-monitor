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
var dynamo = require('../lib/dynamo');
var probe = require('../lib/lambda');

// Lambda Handler
module.exports.handler = function(event, context) {

  dynamo.getSites().then(function (sites) {
    sites.forEach(function (site) {
      console.log(site);
      lambda.checkSite(site);
    });
    var response = {
      message: "Site monitoring executed!"
    };
    return context.done(null, response);
  });
};
