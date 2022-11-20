const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  getAction() {
    return this.success('Welcome to use mused!');
  }
}