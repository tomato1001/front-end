"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');


// global css
loaders.push({
	test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
	loaders: [
		'style?sourceMap',
		'css'
	]
});
// local scss modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.scss/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
		'sass'
	]
});

// local css modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.css/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
	]
});

module.exports = {
		entry: [
			'webpack-hot-middleware/client?reload=true',
			path.join(__dirname, 'src/index.jsx') // Your appʼs entry point
		],
		devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
		output: {
			path: path.join(__dirname, '/public/'),
			filename: 'bundle.js',
			publicPath: '/'
		},
		resolve: {
			extensions: ['', '.js', '.jsx']
		},
		module: {
			loaders
		},
		plugins: [
			new webpack.NoErrorsPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"development"'
				}
			}),
			new HtmlWebpackPlugin({
					template: './src/template.html',
					filename: 'index.html',
					title: 'Dashboard'
				})
		]
};
		
		