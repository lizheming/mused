const Model = require('dittorm/dist/src/utils/model').default;

module.exports = function(modelName) {
  return Model(modelName);
};