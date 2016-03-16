/**
 * Lib
 */

module.exports.respond = function(event, cb) {
  var response = {
    message: "Your Serverless function ran successfully!"
  };

  return cb(null, response);
};

const path = require('path'),
  q = require('q'),
  request = require('request-promise'),
  fs = require('fs'),
  qs = require('qs'),
  http = require('http'),
  ejs = require('ejs');

module.exports.renderTemplate = function(template, params){
  var filePath = path.join(__dirname, '../', template);
  var html = fs.readFileSync(filePath, 'UTF-8');
  return ejs.render(html, params)
};

module.exports.formParams = function(paramStr) {
  return qs.parse(paramStr);
};

module.exports.checkSites = function(sites) {
  var promises = [];
  sites.forEach(function (site) {
    console.log(site);
    promises.push(request({url: site.url}));
  });
  return q.all(promises);
};