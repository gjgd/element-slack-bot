# Overview

A Slack bot for [Element DID](https://github.com/decentralized-identity/element), the Ethereum implementation of the [Sidetree](https://github.com/decentralized-identity/sidetree) protocol

This bot parses Slack messages in order to extract transaction hashes from Element transactions, and then posts links to the [Element Block Explorer](https://medium.com/transmute-techtalk/element-block-explorer-bb6d2c712664) to provide richer context about the transaction.

# Tech stack

We use AWS Lambda for the webhooks and AWS DynamoDB to store Oauth2 tokens.

We use the [Serverless framework](https://github.com/serverless/serverless) to build and deploy

# Deployment

1) Setup Serverless with AWS: https://github.com/serverless/serverless#quick-start
2) Setup the Slack app
- https://api.slack.com/apps
- Create New APP
- Get your CLIENT_ID and CLIENT_SECRET
3) Create a `secret.dev.yml` file:
```
CLIENT_ID: 'YOUR_CLIENT_ID'
CLIENT_SECRET: 'YOUR_CLIENT_SECRET'
```
We use https://github.com/serverless/serverless-secrets-plugin to encrypt the secrets
4) Deploy the hooks:
```
serverless deploy
```
5) In your Slack dashboard, setup
- [Incoming Webhook](https://api.slack.com/messaging/webhooks) service to allow the bot to post messages
- [Event Subscription](https://api.slack.com/events-api) with the `message.channels` permissions using your `webhook` Lambda as the `Request URL`
- [Oauth 2.0](https://api.slack.com/docs/oauth) using your `redirectUrl` Lambda as the Redirect URL
