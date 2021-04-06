const express = require('express')
const app = express()
const port = 3002

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const WebpackConfig = require('./webpack.config')
const compiler = webpack(WebpackConfig)
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.listen(port, ()=>{
    console.log('Server listen ' + port);
    
})