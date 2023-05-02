const Dittorm = require('dittorm');
const {
  LEAN_ID,
  LEAN_KEY,
  LEAN_MASTER_KEY,
  LEAN_SERVER,

  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

const MODEL_ADAPTER = {
  leancloud: {
    appId: LEAN_ID,
    appKey: LEAN_KEY,
    masterKey: LEAN_MASTER_KEY,
    serverURL: LEAN_SERVER,
  },
  postgresql: {
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    port: POSTGRES_PORT || 5432,
    host: POSTGRES_HOST,
    ssl: true,
  }
};

module.exports = function(modelName) {
  const storage = think.config('storage');
  if (!MODEL_ADAPTER[storage]) {
    throw new Error('Storage does not support right now!');
  }

  return Dittorm(storage)(modelName, MODEL_ADAPTER[storage]);
};