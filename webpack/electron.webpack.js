const path = require('path')

const rootPath = path.resolve(__dirname, '..')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  entry: {
    // splashScreen: path.resolve(rootPath, 'build', 'splashScreen.html'),
    app: path.resolve(rootPath, 'electron', 'main.ts')
  },
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js'
  },
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
}
