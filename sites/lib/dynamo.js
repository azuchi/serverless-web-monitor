const Promise = require('bluebird');
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};
const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const sitesTable = projectName + '-sites-' + stage;

module.exports.createSite = function(site) {
  return new Promise(function(resolve, reject) {
    site['id'] = uuid.v1();
    var params = {
      TableName: sitesTable,
      Item: site
    };
    docClient.put(params, function(err, data) {
      if (err) return reject(err);
      return resolve(site);
    });
  });
};

module.exports.getSites = function() {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: sitesTable,
      AttributesToGet: [
        'name',
        'url'
      ]
    };
    docClient.scan(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
};
