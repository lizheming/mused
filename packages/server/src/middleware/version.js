const pkg = require('../../package.json');

module.exports = () => async (ctx, next) => {
  ctx.set('x-server-version', pkg.version);
  return next();
};