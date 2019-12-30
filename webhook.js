const fetch = require('node-fetch');
// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.webhook = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);
  const ev = body.event;
  if (ev && ev.text && ev.text.includes('New alert from element')) {
    // Get the Slack hook URL
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: body.team_id,
      },
    };
    const record = await dynamoDb.get(params).promise();
    const { url } = record.Item.incoming_webhook;
    // Get the element URL from the Tenderly notif
    const field = ev.blocks[1].fields[2];
    const regex = /ropsten\/(.*)\?/;
    const txHash = regex.exec(field.text)[1];
    const elementUrl = `https://element-did.com/server/transactions/${txHash}`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        text: elementUrl,
      }),
    });
  }
  return {
    statusCode: 200,
    body: event.body,
  };
};