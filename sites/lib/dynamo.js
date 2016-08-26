'use strict';

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
    const params = {
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
    const params = {
      TableName: sitesTable,
      AttributesToGet: [
        'id',
        'name',
        'url',
        'code'
      ]
    };
    docClient.scan(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
};

module.exports.updateSiteState = function(site) {
  return new Promise(function(resolve, reject) {
    const params = {
      TableName: sitesTable,
      Key: {
        "id": site.site.id
      },
      UpdateExpression: "set code = :code",
      ExpressionAttributeValues: {
        ":code":site.code
      },
      ReturnValues:"UPDATED_NEW"
    };
    console.log("Updating site statusCode...");
    docClient.update(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
