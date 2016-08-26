'use strict';

const rp = require('request-promise');
const errors = require('request-promise/errors');
const dynamo = require('../lib/dynamo');
const lambda = require('../lib/lambda');

module.exports.handler = function(event, context, cb) {
  return new Promise(function(resolve, reject) {
    rp({uri: event.url, resolveWithFullResponse: true}).then(function(response) {
      const statusCode = response.statusCode.toString(10);
      const array = {
        site: event,
        date: response.headers.date,
        state: "OK",
        code: statusCode,
        message: response.statusMessage
      };
      return resolve(array);
    }).catch(errors.StatusCodeError, function(error){
      const statusCode = error.statusCode.toString(10);
      const array = {
        site: event,
        date: error.response.headers.date,
        state: "Fail",
        code: statusCode,
        message: error.error
      };
      return resolve(array);
    }).catch(errors.RequestError, function(error){
      const now = new Date().toUTCString();
      const array = {
        site: event,
        date: now,
        state: "Fail",
        code: error.error.code,
        message: error.message
      };
      return resolve(array);
    });
  }).then(function(array) {
    console.log(array);
    if (event.code == undefined || event.code != array.code) {
      console.log("Accessing DynamoDB...");
      dynamo.updateSiteState(array);
      lambda.callSNS(array);
    }
    return resolve(null, array);
  });
};
