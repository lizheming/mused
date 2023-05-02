const BaseRest = require('./rest');
const Model = require('../service/model');

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = new Model('muse');
  }

  async getAction() {
    const { page, pageSize } = this.get();

    const where = {};
    const totalCount = await this.modelInstance.count(where);
    const data = await this.modelInstance.select(where, {
      desc: 'time',
      limit: pageSize,
      offset: Math.max((page - 1) * pageSize, 0),
    });
    return this.success({
      page,
      totalPages: Math.ceil(totalCount / pageSize),
      pageSize,
      data
    });
  }

  async postAction() {
    const { content, origin, status, sticky } = this.post();
    const resp = await this.modelInstance.add({
      content,
      origin,
      status,
      sticky,
      time: Date.now(),
    });
    
    return this.success(resp);
  }

  putAction() {
  }

  deleteAction() {
  }
}