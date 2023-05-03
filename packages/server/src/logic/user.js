const Base = require('./base');

module.exports = class extends Base {
  /**
   * @api {POST} /api/user user register
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiBody  {String}  display_name  user nick name
   * @apiBody  {String}  email user email
   * @apiBody  {String}  password user password
   * @apiBody  {String}  url user link
   * @apiParam  {String}  lang  language
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  postAction() {
  }

  /**
   * @api {PUT} /api/user?type=token regenerate open api token
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  lang  language
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object}  data 
   * @apiSuccess  (200) {String}  data.token
   */

  /**
   * @api {PUT} /api/user update user profile
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiBody  {String}  [display_name]  user new nick name
   * @apiBody  {String}  [url] user new link
   * @apiBody  {String}  [password] user new password
   * @apiBody  {String}  [github] user github account name
   * @apiParam  {String}  lang  language
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  putAction() {
    // you need login to update yourself profile
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.fail();
    }

    // you should be a administrator to update otherself info
    if (this.id && userInfo.type !== 'administrator') {
      return this.fail();
    }
  }
};