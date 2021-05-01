# Serverless 之百行代码实现钉钉机器人每日推送微博热搜

> 示例全白嫖：
>
> 机器人：免费
>
> 微博接口：每天免费可以调用100次
>
> 函数计算[收费规则](https://help.aliyun.com/document_detail/54301.html?spm=a2c4g.11186623.6.544.274e398eE0EcPw#title-ef2-h1s-jaf)

1. [添加自定义机器人](https://www.dingtalk.com/qidian/help-detail-20781541.html)

   1. 安全设置添加自定义关键词
   2. 记录关键词和机器人的Webhook地址
2. [微博实时热搜榜API接口](https://www.tianapi.com/apiview/100)，记录请求地址和参数
3. 需要一点点的函数计算的知识：[事件函数](https://help.aliyun.com/document_detail/156876.html?spm=a2c4g.11174283.6.568.2068521202l7v1)、、[定时触发器 event 格式说明](https://help.aliyun.com/document_detail/171747.htm#title-5yp-f9v-jap)
4. 创建一个[事件函数](https://help.aliyun.com/document_detail/73338.html)
5. 并在此函数下创建一个[定时触发器](https://help.aliyun.com/document_detail/68172.html)

   1. Cron表达式配置，示例：0 0 1 * * * 【早上九点】
   2. 触发消息：{"weiboUrl":"第二步记录请求地址和参数","dingHookLinks":[{"url":"机器人的Webhook地址","title":"关键词"}]}
6. 修改函数代码
