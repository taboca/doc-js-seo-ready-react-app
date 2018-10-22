const express = require('express'),
          app = express(),
     template = require('./views/templateServer')
         path = require('path');

app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.listen(process.env.PORT || 3000);

const data = require('./assets/data.json');

let initialState = {
  sections: data
}

const ssr = require('./views/appServer');

app.get('/', (req, res) => {
  const { preloadedState, content}  = ssr(initialState)
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});
