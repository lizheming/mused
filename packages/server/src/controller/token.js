const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const helper = require('think-helper');
const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');
const Model = require('dittorm/dist/src/utils/model').default;

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = Model('user');
  }

  getAction() {
    return this.success(this.ctx.state.userInfo);
  }

  async postAction() {
    const { email, password, code } = this.post();
    const user = await this.modelInstance.select({ email });

    if (think.isEmpty(user) || /^verify:/i.test(user[0].type)) {
      return this.fail();
    }

    const checkPassword = new PasswordHash().checkPassword(
      password,
      user[0].password
    );

    if (!checkPassword) {
      return this.fail();
    }

    const twoFactorAuthSecret = user[0]['2fa'];

    if (twoFactorAuthSecret) {
      const verified = speakeasy.totp.verify({
        secret: twoFactorAuthSecret,
        encoding: 'base32',
        token: code,
        window: 2,
      });

      if (!verified) {
        return this.fail();
      }
    }

    return this.success({
      ...user[0],
      password: null,
      token: jwt.sign(user[0].email, this.config('jwtKey')),
    });
  }

  deleteAction() {}
};