const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  cli: {
    devtool: 'none',
  },
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        ENV_TYPE: process.env.NODE_ENV,
      }),
      new HardSourceWebpackPlugin({
        environmentHash: {
          root: __dirname,
          directories: [],
          files: ['package-lock.json'],
        },
        cachePrune: {
          // 缓存的存在时间，默认为两天
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // 缓存的最大容量，默认为 50 MB
          sizeThreshold: 50 * 1024 * 1024,
        },
      }),
    ],
  },
}
