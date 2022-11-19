const Dittorm = require('dittorm');
const {
  LEAN_ID,
  LEAN_KEY,
  LEAN_MASTER_KEY,
  LEAN_SERVER,
} = process.env;

const MODEL_ADAPTER = {
  leancloud: {
    appId: LEAN_ID,
    appKey: LEAN_KEY,
    masterKey: LEAN_MASTER_KEY,
    serverURL: LEAN_SERVER,
  }
};

module.exports = function(modelName) {
  const storage = think.config('storage');
  if (!MODEL_ADAPTER[storage]) {
    throw new Error('Storage does not support right now!');
  }

  return Dittorm(storage)(modelName, MODEL_ADAPTER[storage]);
};