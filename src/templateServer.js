function template(title, initialState = {}, content = "") {

  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      ${content}
                   </div>
                </div>
                <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="assets/appClient.js"></script>
              </body>
              `;

  return page;
}

module.exports = template;
