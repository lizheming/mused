const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');
const Model = require('dittorm/dist/src/utils/model').default;

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = Model('user');
  }

  async postAction() {
    const data = this.post();
    const resp = await this.modelInstance.select({
      email: data.email,
    });

    if (
      !think.isEmpty(resp) &&
      ['administrator', 'guest'].includes(resp[0].type)
    ) {
      return this.fail(this.locale('USER_EXIST'));
    }

    const count = await this.modelInstance.count();

    const {
      SMTP_HOST,
      SMTP_SERVICE,
      SENDER_EMAIL,
      SENDER_NAME,
      SMTP_USER,
      SITE_NAME,
    } = process.env;
    const hasMailServie = SMTP_HOST || SMTP_SERVICE;

    const token = Array.from({ length: 4 }, () =>
      Math.round(Math.random() * 9)
    ).join('');
    const normalType = hasMailServie
      ? `verify:${token}:${Date.now() + 1 * 60 * 60 * 1000}`
      : 'guest';

    data.password = new PasswordHash().hashPassword(data.password);
    data.type = think.isEmpty(count) ? 'administrator' : normalType;

    if (think.isEmpty(resp)) {
      await this.modelInstance.add(data);
    } else {
      await this.modelInstance.update(data, { email: data.email });
    }

    if (!/^verify:/i.test(data.type)) {
      return this.success();
    }

    try {
      const notify = this.service('notify', this);
      const apiUrl =
        this.ctx.serverURL +
        '/verification?' +
        new URLSearchParams({ token, email: data.email }).toString();

      await notify.transporter.sendMail({
        from:
          SENDER_EMAIL && SENDER_NAME
            ? `"${SENDER_NAME}" <${SENDER_EMAIL}>`
            : SMTP_USER,
        to: data.email,
        subject: this.locale('[{{name | safe}}] Registration Confirm Mail', {
          name: SITE_NAME || 'Mused',
        }),
        html: this.locale(
          'Please click <a href="{{url}}">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.',
          { url: apiUrl }
        ),
      });
    } catch (e) {
      console.log(e);

      return this.fail(
        this.locale(
          'Registeration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.',
          { isAdmin: think.isEmpty(count) }
        )
      );
    }

    return this.success({ verify: true });
  }

  async putAction() {
    const { type } = this.get();
    const { userInfo } = this.ctx.state;

    switch(type) {
      case 'open_id':
        const openId = think.uuid();
        await this.modelInstance.update({open_id: openId}, { email: userInfo.email });
        return this.success({open_id: openId});
    }
  }
};