const mused = require('mused');
const app = mused({});

require('http').createServer(app).listen(process.env.PORT || 3000);