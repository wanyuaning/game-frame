const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  // examples目录下每个demo目录: app.ts 作为webpack构建的入口文件  entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件  entries 对象key为目录名
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  }, {}),

  // 根据不同的目录名称，打包生成目标 js，名称和目录名一致
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/',

    library: 'ewan',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {test: /\.ts$/, enforce: 'pre', use: [{loader: 'tslint-loader'}]},
      {test: /\.tsx?$/, use: [{loader: 'ts-loader', options: {transpileOnly: true}}]}
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}