require('dotenv').config()
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const globImporter = require('node-sass-glob-importer')

const MODE = process.env.MODE || 'development'
const enabledSourceMap = (MODE === 'development')

const js = {
    mode: MODE,
    entry: `${ __dirname }/src/scripts/app.js`,
    output: {
        path: `${ __dirname }/public/scripts`,
        filename: 'app.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tag$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'riot-tag-loader',
                        options: {
                            type: 'es6',
                            hot: true
                        }
                    }
                ]
            }
        ]
    }
}

const css = {
    mode: MODE,
    entry: `${ __dirname }/src/scss/app.scss`,
    output: {
        path: `${ __dirname }/public/stylesheets`,
        filename: 'app.css'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: enabledSourceMap,
                                minimize: !enabledSourceMap,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                importer: globImporter(),
                                sourceMap: enabledSourceMap
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css')
    ]
}

module.exports = [js, css]