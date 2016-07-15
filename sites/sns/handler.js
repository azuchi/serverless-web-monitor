'use strict';

// Require Logic
var sns = require('../lib/sns');

// Lambda Handler
module.exports.handler = function(event, context) {
  console.log(event.data);
  var params = event.data;
  var msg = {
    "Subject": "[" + params['state'] + "] " + params['name'],
    "Message": params['state'] + ": " + params['name'] + "\n URL: " + params['url'] + "\n Reason: " + params['reason']
  }
  sns.postSNS(msg);
  return context.done;
}
