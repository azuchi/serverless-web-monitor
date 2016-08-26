'use strict';

// Require Logic
const sns = require('../lib/sns');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
  console.log(event);
  const params = event;
  const site = event.site;

  const msg = {
    "Subject": "Status changed to " + params['state'] + " - " + site['name'],
    "Message": "Date: " + params['date'] + "\n" + "Current Status: " + params['state'] + "\n Name: " + site['name'] + "\n URL: " + site['url'] + "\n Response: " + params['code'] + " " + params['message']
  }
  sns.postSNS(msg);

  return cb(null, {
    message: "SNS function executed!"
  });
}
