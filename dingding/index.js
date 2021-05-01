const https = require('https');

exports.handler = main;

async function main(event, context, callback) {
  // 调试代码时使用
  // const weiboUrl = 'https://api.tianapi.com/txapi/weibohot/index?key=******'; // 微博实时热搜榜API接口
  // const dingHookLinks = [
  //   {
  //     url: 'https://oapi.dingtalk.com/robot/send?access_token=******', // Webhook地址
  //     title: '帅呆了@手机号' // 关键词：帅呆了；@手机号 是钉钉机器人发送时需要 at 的人员，不 at 可以忽略，也可以写在 content 里面 
  //   },
  //   {
  //     url: 'https://oapi.dingtalk.com/robot/send?access_token=******',
  //     title: '每日微博热搜：@手机号'
  //   },
  // ];
  const { weiboUrl, dingHookLinks } = JSON.parse(JSON.parse(event.toString()).payload);

  const { newslist } = JSON.parse(await requestGet(weiboUrl));

  // 字符限制，建议显示 35 条
  const content = newslist.slice(0, 35).map(({ hotword }, index) => `${index + 1}. [${hotword}](https://s.weibo.com/weibo?q=${encodeURI(hotword)}&Refer=top)`).join('\n');

  for (const { url, title } of dingHookLinks) {
    await requestPost(url, title, content);
  }

  callback(null, ''); // 函数计算语法，算是终止符，callback 之后程序会被冻结，之后代码不会被执行
}

function requestPost(url, title, text) {
  const requestData = JSON.stringify({
    msgtype: 'markdown',
    markdown: {
      title,
      text,
    },
    at: { // 如果不 at 某人可以注释，和上面 title 对映
      atMobiles: [
        '手机号'
      ]
      // isAtAll: true // 是否 at 所有人
    }
  });
  const param = {
    method: 'POST',
    port: 443,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((reslove, reject) => {
    const req = https.request(
      url,
      param,
      res => res.on('data', d => reslove(d.toString())),
    );
    req.on('error', (error) => reject(error));
    req.write(requestData);
    req.end();
  });
};

function requestGet(url) {
  const param = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((reslove, reject) => {
    const req = https.request(
      url,
      param,
      res => res.on('data', d => reslove(d.toString())),
    );
    req.on('error', (error) => reject(error));
    req.end();
  });
}