const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

// para el auto completado xD
/** @type {import('webpack').Configuration} */

const devConfig = {
  mode: "development",
  devServer: {
    allowedHosts: path.join(__dirname, "../dist"),
    port: 3000,
    //open: "google-chrome",
    hot: true,
  },
  // target: "web",
  plugins: [
    // evita que se recargue la página, impidiendo que se pierdan los estados de react
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  // permite tener los source maps como no empaquetados para poder debuguear de pana
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        // siempre respetar este orden: style, css, sass
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
    ],
  },
};

// webpack-merge mezcla los archivos de configuración
module.exports = merge(common, devConfig);
