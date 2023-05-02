const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  getAction() {
    this.ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="theme-color" content="#f6f5f4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>Mused</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" crossorigin src="/static/mused-ui.mjs"></script>
      </body>
    </html>
    `;
  }
}