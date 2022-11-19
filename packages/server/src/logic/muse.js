const Base = require('./base');

/**
 * muse
 * // id, content, user_id, origin, status, sticky, create_time
 * resources
 * // id, muse_id, filename, type, size, create_time
 */

module.exports = class extends Base {
  getAction() {
     
  }

  postAction() {
    const { userInfo } = this.ctx.state;
    if (think.isEmpty(userInfo)) {
      return this.fail(401);
    }

    this.rules = {
      content: {
        required: true,
        string: true,
      },
      origin: {
        string: true,
        default: 'Web',
      },
      sticky: {
        boolean: true,
        default: false,
      },
      status: {
        int: true,
        default: 0,
      },
    };
  }
}