const AWS = require('aws-sdk');
require('dotenv').config();

const createSignedPostURL = ({ key }) => {
  return new Promise(function (resolve, reject) {
    const S3 = new AWS.S3({ signatureVersion: 'v4' });

    S3.createPresignedPost(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Expires: +process.env.PRE_SIGN_EXPIRY_TIME * 60,
        Fields: {
          Key: key,
        },
        Conditions: [
          ['content-length-range'].concat([0, process.env.MAX_SIZE_LENGTH]),
        ],
      },
      function (err, data) {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
};

const getSignedUrl = ({ key }) => {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
  });
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Expires: +process.env.PRE_SIGN_EXPIRY_TIME * 60,
  });
};

const uploadToS3 = async ({ key, body }) => {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
  });
  return s3
    .putObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: body,
    })
    .promise();
};

const getS3Object = async ({ key }) => {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
  });
  return s3
    .getObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    })
    .promise();
};

// api key etc will be take from .env
AWS.config.update({ region: process.env.AWS_REGION });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const pushToQueue = (message) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage(
      {
        MessageBody: JSON.stringify(message),
        QueueUrl: process.env.CREATED_ORDERS_QUEUE,
      },
      function (err, data) {
        if (err) reject(err);
        else if (data) resolve(data);
      }
    );
  });
};

module.exports = {
  createSignedPostURL,
  getSignedUrl,
  uploadToS3,
  getS3Object,
  pushToQueue,
};
