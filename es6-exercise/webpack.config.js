"use strict";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    }
};