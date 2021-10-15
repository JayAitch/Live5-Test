const path = require("path");

// Library output details
var FILE_NAME = "game";

// Build, source, etc paths
var PATHS = {
  entryPoint: path.resolve(__dirname, 'root/src/ts/index.ts'),
  dist: path.resolve(__dirname, 'root/public/')
}

// Webpack config
module.exports = {
  mode: "production",
  devtool: 'none',
  entry: {
    [FILE_NAME]: [PATHS.entryPoint]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    modules: [ path.join(__dirname, 'node_modules') ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
            'babel-loader',
            {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: 'tsconfig.json'
                }
            }
        ],
        exclude: [/node_modules/, /\.(spec)\.ts$/]
      }

    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js')
    ]
  }
}