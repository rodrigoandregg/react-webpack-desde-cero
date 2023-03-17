# Iniciar proyeto en **React** desde cero con Webpack 5 y Babel

## Instalar dependencias:

### Regular

**React:**

- react
- react-dom

### Desarrollo

**React:**

- react-refresh

**Webpack:**

- webpack
- webpack/cli
- webpack-dev-server
- webpack-merge

**Babel:**

- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader

**Styles:**

- sass
- sass-loader
- style-loader
- css-loader

**Plugins:**

- html-webpack-plugin
- @pmmmwh/react-refresh-webpack-plugin
- mini-css-extract-plugin

### Producción

- core-js

---

## Scripts en `package.json`

```json
"scripts": {
    "build": "webpack --config config/webpack.prod.js",
    "start": "webpack serve --config config/webpack.dev.js"
  },
```

## Listado de navegadores en `package.json`

```json
// soporte a navegadores que tengan más de 0,25% de cuota de mercado
// que no estén muertos, que actualizaciones desde hace 2 años hasta hoy
// excluir Internet Explorer 11 xD
"browserslist": "> 0.25%, not dead, not ie 11"
```

---

## Archivo Configuración en común de Webpack

**carpeta config**

`config/webpack.common.js`

```js
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
    path: path.resolve(__dirname, "../dist"),
    // nombre del empaqutado generado
    filename: "[name].[contenthash].js",
    // directorio público
    publicPath: "",
    clean: true,
  },

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
```

### Archivo de configuracion de Webpack para producción

`config/webpack.prod.js`

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

// para el auto completado xD
/** @type {import('webpack').Configuration} */

const prodConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    // el empaquetado nuestro y el de dependencias externas se separan para mejorar tiempos de carga
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        // siempre respetar este orden: style, css, sass
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
    ],
  },
};

// webpack-merge mezcla los archivos de configuración
module.exports = merge(common, prodConfig);
```

### Archivo de configuración de Webpack para desarrollo

`config/webpack.dev.js`

```js
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
```

---

## Archivo configuración de Babel

**directorio raíz**

`babel.config.json`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // incluir polyfills en archivos JS de salida para soportar nuevas características de JS
        "corejs": 3.29,
        // inyecta los polyfills solo si la nuevas características del lenguaje se están usando
        "useBuiltIns": "usage"
      }
    ],
    [
      "@babel/preset-react",
      {
        // evita tener que importar React desde "react"
        "runtime": "automatic"
      }
    ]
  ]
}
```
