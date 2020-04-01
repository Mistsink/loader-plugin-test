const path = require('path')
const CopyrightPlugin = require('./plugins/CopyrightPlugin.js')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'str-loader.js',
                options: {
                    targetstr: 'redrock',
                    newstr: 'REDROCK'
                }
            }]
        }]
    },
    plugins: [
        new CopyrightPlugin({
            filename: 'README.md'
        }),
    ]
}