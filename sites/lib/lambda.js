'use strict';

const request = require('request');
const AWS = require('aws-sdk');

const projectName = process.env.SERVERLESS_PROJECT;

const lambdaConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
}

const lambda = new AWS.Lambda();

module.exports.checkSite = function(site) {
  return new Promise(function(resolve, reject) {
    const params = {
      FunctionName: projectName + '-probe',
      InvocationType: 'Event',
      LogType: 'Tail',
      Payload: JSON.stringify(site)
    }
    console.log(params);
    lambda.invoke(params, function(err, data) {
      if(err) console.log(err, err.stack);
      else console.log(site['name'] + " checked");
    });
    return resolve('ok');
  });
};
