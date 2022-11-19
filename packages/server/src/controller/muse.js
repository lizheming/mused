const BaseRest = require('./rest');
const Model = require('../service/model');

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = new Model('muse');
  }

  async getAction() {
    const data = await this.modelInstance.select();
    return this.success(data);
  }

  async postAction() {
    const { content, origin, status, sticky } = this.post();
    const resp = await this.modelInstance.add({
      content,
      origin,
      status,
      sticky,
      create_time: Date.now(),
      update_time: Date.now(),
    });
    
    return this.success(resp);
  }

  putAction() {
  }

  deleteAction() {

  }
}