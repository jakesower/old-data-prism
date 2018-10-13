module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './data-prism.js'
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      // { test: /\.(t|j)s$/, use: { loader: 'awesome-typescript-loader' } },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
  },
  devtool: "source-map"
}
