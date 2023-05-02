const {
  JWT_TOKEN,
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD,
  SQLITE_PATH,
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  MONGO_DB,
  MONGO_PASSWORD,
  TCB_ENV,
  TENCENTCLOUD_SECRETKEY,
  TCB_KEY,
  SECURE_DOMAINS,
  GITHUB_TOKEN,
  DETA_PROJECT_KEY,
  OAUTH_URL,
} = process.env;

let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;

if (LEAN_KEY) {
  storage = 'leancloud';
} else if (MONGO_DB) {
  storage = 'mongodb';
  jwtKey = jwtKey || MONGO_PASSWORD;
} else if (POSTGRES_DATABASE) {
  storage = 'postgresql';
  jwtKey = jwtKey || POSTGRES_PASSWORD;
} else if (SQLITE_PATH) {
  storage = 'sqlite';
} else if (MYSQL_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || MYSQL_PASSWORD;
} else if (GITHUB_TOKEN) {
  storage = 'github';
  jwtKey = jwtKey || GITHUB_TOKEN;
} else if (think.env === 'cloudbase' || TCB_ENV) {
  storage = 'cloudbase';
  jwtKey = jwtKey || TENCENTCLOUD_SECRETKEY || TCB_KEY || TCB_ENV;
} else if (DETA_PROJECT_KEY) {
  storage = 'deta';
  jwtKey = jwtKey || DETA_PROJECT_KEY;
}

if (think.env === 'cloudbase' && storage === 'sqlite') {
  throw new Error("You can't use SQLite in CloudBase platform.");
}

const oauthUrl = OAUTH_URL || 'https://oauth.lithub.cc';

module.exports = {
  workers: 1,
  storage,
  jwtKey,
  secureDomains: SECURE_DOMAINS ? SECURE_DOMAINS.split(/\s*,\s*/) : undefined,
  oauthUrl,
};