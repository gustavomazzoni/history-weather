var webpack = require('webpack');
var path = require('path');
module.exports = {  
    entry: [
      "./app.js"
    ],
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};