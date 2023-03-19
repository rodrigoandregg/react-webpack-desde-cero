const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

// para el auto completado xD
/** @type {import('webpack').Configuration} */

const prodConfig = {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		// el empaquetado nuestro y el de dependencias externas se separan para mejorar tiempos de carga
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				// siempre respetar este orden: style, css, sass
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				test: /.(css|sass|scss)$/,
			},
		],
	},
};

// webpack-merge mezcla los archivos de configuración
module.exports = merge(common, prodConfig);
