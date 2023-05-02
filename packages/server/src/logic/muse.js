const Base = require('./base');

/**
 * muse
 * // id, content, user_id, origin, status, sticky, create_time
 * resources
 * // id, muse_id, filename, type, size, create_time
 */

module.exports = class extends Base {
  /**
   * @api {GET} /api/muse Get muse list for client
   * @apiGroup Muse
   * @apiVersion  0.0.1
   * @apiHeader {String} Authorization user login token
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bear 1234"
   *     }
   * 
   * @apiParam  {String}  page  page
   * @apiParam  {String}  pageSize  page size
   *
   * 
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object}  data
   * @apiSuccess  (200) {Number}  data.page muse list current page
   * @apiSuccess  (200) {Number}  data.pageSize muse list page size
   * @apiSuccess  (200) {Number}  data.totalPages muse list total pages
   * @apiSuccess  (200) {Object[]}  data.data muse list data
   * @apiSuccess  (200) {String}  data.data.content muse content
   * @apiSuccess  (200) {Boolean} data.data.sticky  muse sticky status
   * @apiSuccess  (200) {Number}  data.data.status  muse status
   * @apiSuccess  (200) {String}  data.data.origin  muse from
   * @apiSuccess  (200) {Number}  data.data.time  muse time
   * @apiSuccess  (200) {String}  data.data.id  muse id
   */
  getAction() {
    this.rules = {
      page: {
        int: true,
        default: 1,
      },
      pageSize: {
        int: {
          max: 100
        },
        default: 20,
      }
    }
  }

  /**
   * @api {POST} /api/muse post muse
   * @apiGroup Muse
   * @apiVersion  0.0.1
   * @apiHeader {String} Authorization user login token
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bear 1234"
   *     }
   *
   * @apiBody  (200) {String}  content muse content
   * @apiBody  (200) {Boolean} sticky  muse sticky status
   * @apiBody  (200) {Number}  status  muse status
   * @apiBody  (200) {String}  origin  muse from
   * 
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object}  data muse list data
   * @apiSuccess  (200) {String}  data.content muse content
   * @apiSuccess  (200) {Boolean} data.sticky  muse sticky status
   * @apiSuccess  (200) {Number}  data.status  muse status
   * @apiSuccess  (200) {String}  data.origin  muse from
   * @apiSuccess  (200) {Number}  data.time  muse time
   * @apiSuccess  (200) {String}  data.id  muse id
   */
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