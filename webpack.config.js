module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: './build/main.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  }
}
