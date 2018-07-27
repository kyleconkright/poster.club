let path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, './../dist');
var SRC_DIR = path.resolve(__dirname, './../src');

var config = {
    entry: SRC_DIR + '/index.tsx',
    output: {
        path: DIST_DIR + '/app',
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss']
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({ template: './../index.html' }),
        new Dotenv({
            path: `./${process.env.NODE_ENV}/.env`,
            systemvars: true
        })
        
    ],
    node: {
        fs: 'empty'
    }
}

module.exports = config;