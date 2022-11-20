const Base = require('./base');

module.exports = class extends Base {
  indexAction() {
    this.body = this.get('echostr');
  }

  textAction() {
    const {Content} = this.post();
    think.logger.debug('debug info:');
    think.logger.debug(this.post());
    return this.success('你发送给我的是:' + Content.trim());
  }

  eventAction() {
    const message = this.post();

    return this.success(JSON.stringify(message));
  }

  __call() {
    return this.success('功能正在开发中~');
  }
};
