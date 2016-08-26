'use strict';

// Require Logic
const sns = require('../lib/sns');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
  console.log(event.data);
  const params = event.data;
  const msg = {
    "Subject": "[" + params['state'] + "] " + params['name'],
    "Message": params['state'] + ": " + params['name'] + "\n URL: " + params['url'] + "\n Reason: " + params['reason']
  }
  sns.postSNS(msg);

  return cb(null, {
    message: "SNS function executed!"
  });
}
