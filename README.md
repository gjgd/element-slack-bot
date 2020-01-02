# Overview

A Slack bot for [Element DID](https://github.com/decentralized-identity/element), the Ethereum implementation of the [Sidetree](https://github.com/decentralized-identity/sidetree) protocol

This bot parses Slack messages in order to extract transaction hashes from Element transactions, and then posts links to the [Element Block Explorer](https://medium.com/transmute-techtalk/element-block-explorer-bb6d2c712664) to provide richer context about the transaction.

# Tech stack

- AWS Lambda for the webhooks
- AWS DynamoDB to store Oauth 2.0 tokens
- [Serverless framework](https://github.com/serverless/serverless) to build and deploy

# Deployment

1) Setup Serverless with AWS: https://github.com/serverless/serverless#quick-start
2) Create a new Slack app https://api.slack.com/apps and get your CLIENT_ID and CLIENT_SECRET
3) Create a `secret.dev.yml` file to store the values:
```
CLIENT_ID: 'YOUR_CLIENT_ID'
CLIENT_SECRET: 'YOUR_CLIENT_SECRET'
```
We use https://github.com/serverless/serverless-secrets-plugin to encrypt the secrets for our Bot

4) Deploy the hooks `serverless deploy`
5) In the Slack dashboard, setup
- The [Incoming Webhook](https://api.slack.com/messaging/webhooks) service to allow the bot to post messages
- The [Event Subscription](https://api.slack.com/events-api) service with the `message.channels` permissions using your `webhook` Lambda as the `Request URL`
- The [Oauth 2.0](https://api.slack.com/docs/oauth) service using your `redirectUrl` Lambda as the Redirect URL