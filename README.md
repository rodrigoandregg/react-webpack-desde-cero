# Iniciar proyecto en **React** desde cero con Webpack 5 y Babel

## Instalar dependencias:

### de forma Regular

**React:**

- react
- react-dom

### de Desarrollo (`--save-dev` || `-D`)

**React:**

- react-refresh

**Webpack:**

- webpack
- webpack-cli
- webpack-dev-server
- webpack-merge

**Babel:**

- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader

**Styles:**

- style-loader
- css-loader
- sass
- sass-loader

**Plugins:**

- html-webpack-plugin
- @pmmmwh/react-refresh-webpack-plugin
- mini-css-extract-plugin

### de Producción

- core-js

---

### Scripts en `package.json`

```json
"scripts": {
    "build": "webpack --config config/webpack.prod.js",
    "start": "webpack serve --config config/webpack.dev.js"
  },
```

## Listado de navegadores en `package.json`

```js
/* soporte a navegadores que tengan más de 0,25% de  cuota de mercado */
/* que no estén muertos, que actualizaciones desde  hace 2 años hasta hoy */
/* excluir Internet Explorer 11 xD */
"browserslist": "> 0.25%, not dead, not ie 11"
```

---

## Configurar Webpack

### Archivos

- **en directiorio `config/`:**
- - `webpack.common.js`
- - `webpack.prod.js`
- - `webpack.dev.js`
- **en directio raiz:**
- - `babel.config.json` (no es lo mismo que `.babelrc`)

### Archivo Configuración en común de Webpack

**carpeta config**

`config/webpack.common.js`

```js
/* importar módulo resolve de node */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/* para el auto completado xD */
/** @type {import('webpack').Configuration} */

module.exports = {
  /* punto de entrada */
  entry: "./src/index.jsx",
  /* punto de salida */
  output: {
    /* dirección absoluta del archivo de salida */
    path: path.resolve(__dirname, "../dist"),
    /* nombre del empaqutado generado */
    filename: "[name].[contenthash].js",
    /* directorio público */
    /* al dejar un las comillas vacias indicamos que el direcctorio publico es donde indica el output */
    publicPath: "",
    clean: true,
  },

  /* configurar los loaders */
  module: {
    rules: [
      {
        /* nombre del loader */
        use: "babel-loader",
        /* extensiones de archivos que utilizarán el loader */
        test: /.(js|jsx)$/,
        /* excluir directorio dependencias */
        exclude: /node_modules/,
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|jpeg|gif)%/i,
      },
    ],
  },
  resolve: {
    /* evita tener que definir extensiones en importaciones */
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    /* automatiza el cambio de nombre en la importación del js dentro de index.html */
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

/* para el auto completado xD */
/** @type {import('webpack').Configuration} */

const prodConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    /* el empaquetado nuestro y el de dependencias externas se separan para mejorar tiempos de carga */
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        /* siempre respetar este orden: style, css, sass */
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
    ],
  },
};

/* webpack-merge mezcla los archivos de configuración */
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

/* para el auto completado xD */
/** @type {import('webpack').Configuration} */

const devConfig = {
  mode: "development",
  devServer: {
    allowedHosts: path.join(__dirname, "../dist"),
    port: 3000,
    /*open: "google-chrome", */
    hot: true,
  },
  /* target: "web", */
  plugins: [
    /* evita que se recargue la página, impidiendo que  se pierdan los estados de react */
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  /* permite tener los source maps como no  empaquetados para poder debuguear de pana */
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        /* siempre respetar este orden: style, css, sass */
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },
    ],
  },
};

/* webpack-merge mezcla los archivos de configuración */
module.exports = merge(common, devConfig);
```

---

## Configurar Babel

### Archivo configuración de Babel

**directorio raíz**

`babel.config.json`

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        /* incluir polyfills en archivos JS de salida para soportar nuevas características de JS */
        "corejs": 3.29,
        /* inyecta los polyfills solo si la nuevas características del lenguaje se están usando */
        "useBuiltIns": "usage"
      }
    ],
    [
      "@babel/preset-react",
      {
        /* evita tener que importar React desde "react" */
        "runtime": "automatic"
      }
    ]
  ]
}
```

---

## Agregar React al proyecto

### Archivos:

- en directorio `public/`
- - `index.html`
- en directorio `src/`
- - `index.jsx` || `main.jsx`
- - `App.jsx`
- - `App.css` || `App.scss`

### **Pasos importantes**:

### Preparar archivo **`index.html`**:

- Importar **`index.jsx`** o **`main.jsx`**:
  ```html
  <script type="module" src="../src/index.jsx"><script>
  ```

### Preparar archivo `index.jsx` o `main.jsx`:

- Importar **ReactDOM** desde "react-dom/client"
  ```jsx
  import * as ReactDOM from "react-dom/client";
  ```
- Importar componente **App** desde **`App.jsx`**

  ```jsx
  import App from "./App";
  ```

- Acceder al elemento con `id="root"` del **`index.html`** y renderizar nuestro componente **`App`** dentro de este

  ```jsx
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(<App />);
  ```

### Archivo **`index.jsx`** o **`main.jsx`**:

```jsx
import * as ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /* el StricMode puede provocar que en veamos resultados dobles en consola (por ejemplo: console.log()'s y errores repetidos) pero se recomienda su uso para evitar problemas futuros*/
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### Preparar archivo `App.jsx`:

- Crear componente **`App`** usando la sintaxis de función de flecha (_arrow function_)

  ```jsx
  const App = () => {};
  ```

- Retornar lo que necesitemos (en este caso el clásico ¡Hola Mundo!)

  ```jsx
  const App = () => {
    return (
      <div className="App">
        <h1>¡Hola Mundo!</h1>
      </div>
    );
  };
  ```

- Exportar el componente **`App`**

  ```jsx
  export default App;
  ```

- Importar el archivo de estilos `Css` o `Scss`
  ```jsx
  import "./App.scss";
  ```

### Archivo **`App.jsx`**:

```jsx
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <h1>¡Hola Mundo!</h1>
    </div>
  );
};

export default App;
```

**Happy Hacking!**
