// importar módulo resolve de node
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// para el auto completado xD
/** @type {import('webpack').Configuration} */

module.exports = {
  // punto de entrada
  entry: "./src/index.jsx",
  // punto de salida
  output: {
    // dirección absoluta del archivo de salida
    path: path.resolve(__dirname, "dist"),
    // nombre del empaqutado generado
    filename: "[name].[contenthash].js",
    // directorio público
    publicPath: "",
    clean: true,
  },
  mode: "production",
  // configurar los loaders
  module: {
    rules: [
      {
        // nombre del loader
        use: "babel-loader",
        // extensiones de archivos que utilizarán el loader
        test: /.(js|jsx)$/,
        // excluir directorio dependencias
        exclude: /node_modules/,
      },
      {
        // siempre respetar este orden: style, css, sass
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|jpege|gif)%/i,
      },
    ],
  },
  resolve: {
    // evita tener que definir extensiones en importaciones
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    // automatiza el cambio de nombre en la importación del js dentro de index.html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
