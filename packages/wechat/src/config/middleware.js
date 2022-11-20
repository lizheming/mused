const wechat = require('think-wechat');
const isDev = think.env === 'development';

const { WECHAT_TOKEN, WECHAT_APPID, WECHAT_ENCODEING_AES_KEY, WECHAT_CHECK_SIGNATURE } = process.env;
module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: true,
      contentType: () => 'json',
      error(err, ctx) {
        if (/favicon.ico$/.test(ctx.url)) {
          return;
        }
        if (think.isPrevent(err)) {
          return false;
        }

        console.error(err);
      }
    }
  },
  {
    handle: wechat,
    match: '/wechat',
    options: {
      token: WECHAT_TOKEN,
      appid: WECHAT_APPID,
      encodingAESKey: WECHAT_ENCODEING_AES_KEY,
      checkSignature: WECHAT_CHECK_SIGNATURE && WECHAT_CHECK_SIGNATURE !== 'false'
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
