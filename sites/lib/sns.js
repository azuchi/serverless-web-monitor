'use strict';

const AWS = require('aws-sdk');

const snsConfig = {
  sessionToken:   process.env.AWS_SESSION_TOKEN,
  region:         process.env.AWS_REGION,
}
const projectName = process.env.SERVERLESS_PROJECT;
const stage = process.env.SERVERLESS_STAGE;
const sns = new AWS.SNS(snsConfig);
const snsTopicArn = process.env.SNS_TOPIC_ARN;

module.exports.postSNS = function(msg) {
  return new Promise(function(resolve, reject) {
    console.log(msg.Subject);
    console.log(msg.Message);
    const params = {
      Message: msg.Message,
      Subject: msg.Subject,
      TopicArn: snsTopicArn
    };
    sns.publish(params, function(err, data){
      console.log(data);
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
