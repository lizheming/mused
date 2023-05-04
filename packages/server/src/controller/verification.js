const BaseRest = require('./rest');
const Model = require('dittorm/dist/src/utils/model').default;

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = Model('user');
  }

  async getAction() {
    const { token, email } = this.get();
    const users = await this.modelInstance.select({ email });

    if (think.isEmpty(users)) {
      return this.fail(this.locale('USER_NOT_EXIST'));
    }

    const user = users[0];
    const match = user.type.match(/^verify:(\d{4}):(\d+)$/i);

    if (!match) {
      return this.fail(this.locale('USER_REGISTED'));
    }

    if (token === match[1] && Date.now() < parseInt(match[2])) {
      await this.modelInstance.update({ type: 'guest' }, { email });

      return this.redirect('/login');
    }

    return this.fail(this.locale('TOKEN_EXPIRED'));
  }
};
