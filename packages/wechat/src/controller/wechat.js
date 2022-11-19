const Base = require('./base');

module.exports = class extends Base {
  indexAction() {
    this.body = this.get('echostr');
  }

  async textAction() {
    // const { Content } = this.post();
  }

  eventAction() {
    const message = this.post();

    this.success(JSON.stringify(message));
  }

  __call() {
    this.success('功能正在开发中~');
  }
};
