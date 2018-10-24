
## References

* https://medium.freecodecamp.org/server-side-rendering-your-react-app-in-three-simple-steps-7a82b95db82e
* https://github.com/taboca/doc-js-babel-react-less

## Starting with Webpack

* Ref https://github.com/taboca/doc-js-babel-react-less

```
npm install webpack webpack-cli  -D
```
## Babel-based for React dev using ES6 and ESM (check this wording)

```
npm install babel-loader -D
npm install @babel/core -D
npm install @babel/preset-env -D
npm install @babel/preset-react -D

```  

In addition, now we will need to use Babel cli, as we will compile scripts aiming compatibility for running the server render React code:

```
npm install @babel/cli -D
```

## .babel.rc

```
{
  "presets": ["@babel/env", "@babel/react"]
}
```

Babel cli will be used from the scripts from package.json later (see "babel" script).

## Webpack.config.js  

```
const path = require('path');
module.exports = {
  entry: {
    appClient: './src/appClient.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
 }
}
```

## Scripts for static processing

Within package.json
```
"scripts": {
  "start": "node index.js",
  "pack": "webpack --config webpack.config.js",
  "babel": "babel src -d views",
  "build": "npm run pack && npm run babel",
  "test": "echo \"Error: no test specified\" && exit 1"
},

```

## Server side rendering for the initial load  

```
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

```

Notice that "./views" doesn't exist - this is the result of your "babel" script (see package.json).

## Looking at templateServer and the React rendered as string

The HTML that is sent to the browser is a bit different in comparison with the standard approach used in client-only React apps.

First, it overrides the window.__STATE__.

In addition, notice that HTML will be statically served after being rendered by the ssr function.

```
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

```

### The server React renderer

Notice the use of React's renderToString functionality.

```
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './components/app'

module.exports = function render(initialState) {  // Configure the store with the initial state provided
  const store = configureStore(initialState)

  let content = renderToString(
    <Provider store={store} >
       <App />
    </Provider>
  );

  // Get a copy of store data to create the same store on client side
  const preloadedState = store.getState()

  return {content, preloadedState};
}

```

## Enabling the initial static and connecting it with hydrate

If you see the above initial HTML it also brought the appClient.js

This makes the brige instead of using the standard ReactDOM.render

```
// This is the client-side companion

import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import App from './components/app'

const state = window.__STATE__;
delete window.__STATE__;

const store = configureStore(state);

hydrate(
  <Provider store={store} >
     <App />
  </Provider>,
  document.querySelector('#app')
);

```
