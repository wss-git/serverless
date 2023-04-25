'use strict';
const { default: DingTalk } = require('@serverless-cd/ding-talk');
const { getNeedWork } = require('./utile');

exports.handler = async (event, context, callback) => {
  const needWork = getNeedWork();
  console.log('needWork: ', needWork);
  if (!needWork) {
    return callback();
  }
  const { payload: content } = JSON.parse(event.toString());
  const webhook = process.env.webhook;

  const dingTalk = new DingTalk({
    webhook,
    msgtype: 'text',
    at: { isAtAll: true },
    secret: process.env.secret,
    payload: { content }
  });

  await dingTalk.send();
  callback(null, content);
}
