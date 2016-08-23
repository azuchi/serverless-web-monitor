'use strict';

const rp = require('request-promise');
const errors = require('request-promise/errors');

module.exports.handler = function(event, context, cb) {
  rp({uri: event.url, resolveWithFullResponse: true}).then(function(response) {
    const array = {
      Date: response.headers.date,
      Code: response.statusCode,
      Message: response.statusMessage
    };
    console.log(array);
    return cb(null, array);
  }).catch(errors.StatusCodeError, function(error){
    const array = {
      Date: error.response.headers.date,
      Code: error.statusCode,
      Msg: error.error
    };
    console.log(array);
    return cb(null, array);
  }).catch(errors.RequestError, function(error){
    const now = new Date().toUTCString();
    const array = {
      Date: now,
      Code: error.error.code,
      Msg: error.message
    };
    console.log(array);
    return cb(null, array);
  });
};
