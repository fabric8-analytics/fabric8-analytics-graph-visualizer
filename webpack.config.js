const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: [
        "./main.js",
        "./index.html",
        "./main.scss"
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }, {
                test: /\.html$/,
                use: {
                    loader: 'raw-loader'
                }
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }, {
                test: /\.svg$/,
                loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.woff$/,
                loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.eot$/,
                loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
            }
        ]
    },
    stats: {
        colors: true
    },
    watch: false,
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            chunksSortMode: 'dependency',
            inject: 'head'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new ExtractTextPlugin('dist.css'),
        new CopyWebpackPlugin([{
            from: './app/**/*.tpl.html',
            to: 'template'
        }, {
            from: '../node_modules/vis/dist',
            to: '3rd/vis'
        }, {
            from: './data',
            to: 'data'
        }])
    ]
};