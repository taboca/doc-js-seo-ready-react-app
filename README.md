
## References

* https://medium.freecodecamp.org/server-side-rendering-your-react-app-in-three-simple-steps-7a82b95db82e
* https://github.com/taboca/doc-js-babel-react-less

## Starting with Webpack

* Ref https://github.com/taboca/doc-js-babel-react-less

```
npm install webpack webpack-cli --save-dev
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
