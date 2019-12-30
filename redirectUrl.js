const fetch = require('node-fetch');
// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.redirectUrl = async (event) => {
  console.log(event);
  const { code, state } = event.queryStringParameters;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  let url = 'https://slack.com/api/oauth.access';
  url += `?client_id=${CLIENT_ID}`;
  url += `&client_secret=${CLIENT_SECRET}`;
  url += `&code=${code}`;
  url += `&state=${state}`;
  const item = await fetch(url, { method: 'GET' })
    .then((res) => res.json());
  console.log(item);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: item.team_id,
      ...item,
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: { ok: true },
  };
};
