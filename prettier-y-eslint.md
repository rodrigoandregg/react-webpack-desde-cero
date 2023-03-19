# Instalación y configuración de **Prettier** y **ESLint**

## **ESLint**

- Instalar **ESLint**:

  ```
  npm i -D eslint
  ```

- Iniciar configuración de **ESLint**:

  ```
  npx eslint --init
  ```

  Esto iniciará un asistente de configuración

**(la flecha --> marca la opción que yo recomiendo)**

- Usaremos **ESLint** para checkear sintaxis, encontrar problemas y asegurarnos un estilo al escribir código:

  ```
  How would you like to use ESLint?
      To check syntax only
      To check syntax and find problems
  --> To check syntax, find problems, and enforce code style
  ```

- Usaremos los módulos `import`/`export`:

  ```
  What type of modules does your project use?
  --> JavaScript modules (import/export)
      Common (require/export)
      None of these
  ```

- Usaremos **React** como framework:

  ```
  Whitch framework does your project use?
  --> React
      Vue.js
      None of these
  ```

- No estamos usando TypeScript:

  ```
  Does you project use TypeScript?
  --> No
      Yes
  ```

- Nuestro código se ejecutará solo en el navegador:
  (las opciones se marcan o desmarcan con la tecla **ESPACIO**)

  ```
  Where does your code run?
  --> Browser
      Node
  ```

- Usaremos una guía de estilos popular:

  ```
  How would you like to define a style for your project?
  --> Use a popular style guide
      Answer question about you style
  ```

- Seguiremos la guía de estilos **Standard**:

  ```
  Whitch style guide do you want to follow?
      Airbnb: hhtps://github.com/airbnb/javascript
  --> Standard: hhtps://github.com/standard/standard
      Google: hhtps://github.com/google/eslint-config-google
      XO: hhtps://github.com/eslint-config-xo
  ```

- Nuestro archivo de configuración será de formato **JavaScript**:

  ```
  What format do you want to follow?
  --> JavaScript
      YAML
      JSON
  ```

- Aceptaremos un _downgrade_ si es necesario (esta opción no debería aparecer si las versiones de la guía que elegimos y la de **ESLint** coinciden, todo depende del equipo que desarrolla **ESLint**):

  ```
  The style guide "standard" requires eslint@^7.12.1. You are cunrrently usin eslint@8.9.0. Do you want to downgrade?
      No
  --> Yes
  ```

- Aceptaremos la instalación con **npm** (a veces puede preguntar solo si queremos instalar y a veces con qué queremos instalar, en el segundo caso dará varias opciones pero en nuestro caso elegiremos **npm**):

  ```
  Would you like to install then now with npm?
      No
  --> Yes
  ```

  si todo salió bien se habrá creado un archivo de configuración `.eslintrc.js`

- Descanse, soldado! buen trabajo

El archivo de configuración recién creado debería verse asi:

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
```

Un comando para que **ESLint** nos marque los errores es:

```
npx eslint <archivo-a-corregir.extensión>
```

Y para que **ESLint** arregle esos errores:

```
npx eslint <archivo.extensión> --fix
```

Para que **ESLint** nos marque nuestros errores en tiempo real, y ver de qué se tratan al pasar el puntero sobre ellos, instalaremos la extensión **ESLint** (verificada por _**Microsoft**_)

ESLint, por defecto, nos marcará como error no tener la línea que importa React desde "react":

```jsx
import React from "react";
```

para solucionarlo correctamente añadiremos el plugin `plugin:react/jsx-runtime` en el archivo de configuración de **ESLint**, en el array de `extends: []`.

Quedando asi junto a lo que ya teníamos:

```js
extends: [
    'plugin:react/recommended',
	'plugin:react/jsx-runtime',
	'standard',
  ]
```

Si no consideramos las variables "inicializadas pero nunca usadas" como errores, podemos configurarlas como advertencias con la siguente regla:

```js
rules: {
  'no-unused-vars': 'warn'
}
```

---

## **Prettier**

- Instalar **Prettier**:
  ```
  npm i -D prettier
  ```

Si usamos el comando `npx prettier <archivo-a-formatear>` solo obtendremos por consola el texto final para copiarlo y usarlo. Pero eso no tiene ninguna gracia.

Si queremos que **Prettier** realmente nos formatee un archivo podemos usar el comando

```
npx prettier <archivo> --write
```

### **Problema**:

**Prettier** nos da un formato y **ESLint** lo toma todo como errores

### **Solución**:

Configurar **Prettier**

- Creamos un archivo de configuración llamado `.prettierrc`
- Si **ESLint** nos marca errores en nuestro nuevo archivo puede ser porque **VSCode** reconoce el formato de este como **JS** y deberemos cambiarlo manualmente a **JSON** en la barra inferior del editor (es lo que a mi me funcióno, pero también podríamos "ignorar" este archivo más adelante).

Siguiendo la guía de opciones o propiedades de la [documentación de **Prettier**](https://prettier.io/docs/en/options.html) podemos saber qué es lo que debemos añadir a nuestro archivo de configuración.

Lo que yo necesité cambiar fue lo siguiente:

- Los guapos JS devs usamos **tabulaciones** para medir la identación en vez de **espacios** asi que habilitaremos el uso de Tabs:

  ```json
  "useTabs": true,
  ```

- Gracias al **_Automatic Semicolon Insertion_** el uso de "punto y coma" (_semicolon_) **no es necesario** en **JavaScript**, algunos incluso lo consideran mala práctica, pero ya vendría siendo cosa de gustos. Para desabilitarlo ponemos (yo si lo uso pero aquí está):

  ```json
  "semi": false,
  ```

- Para que **Prettier** nos covierta las comillas dobles en simples lo habilitamos (en mi caso es porque dada la distribución de mi teclado y del hecho de que soy zurdo me queda **más cómodo y rápido** hacer las comillas dobles con `shift + 2`):

  ```json
  "singleQuote": true,
  ```

- Lo mismo pero para los archivos con formato `JSX`:

  ```json
  "jsxSingleQuote": true,
  ```

- Evitar que **Prettier** nos ponga paréntesis en las funciones de flecha (_arrow functions_) cuando no sea necesario:
  ```json
  "arrowParens": "avoid",
  ```

Lo demás quedará como venga por defecto.

Nuestro achivo `.pretierrc` tendría que verse asi:

```json
{
  "useTabs": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "arrowParens": "avoid"
}
```

Para poder formatear nuestros textos de manera eficiente y aprovechar al máximo estas configuraciones instalaremos la extensión **Prettier** (verificada por **_Prettier_**) y lo seleccionaremos como formateador por defecto en la opción (_Configure default formater_).

En configuraciones del editor buscaremos la opción "format on save" y la habilitaremos para que el texto se formatee cada vez que guardemos.

Y en "format on save mode" elegiremos "file" para que se le de formato a todo el texto del archivo.

### **Problema** (si, otro):

**Prettier** nos agrega "punto y coma" (_semicolon_) y **ESLint** nos marca nos los marca como errores.

### **Solución**:

Instalar `eslint-config-prettier` con el siguiente comando:

```
npm i -D eslint-config-prettier
```

Y agregarlo a la configuración de eslint en el archivo `.eslint.js` junto a los demás:

```js
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'eslint-config-prettier',
	],
```

Lo que hará esto es, cuando haya conflictos entre **ESLint** y **Prettier** ganará la configuración del formateador y no habrá problemas, por ejemplo, con los "punto y coma".

El archivo `.eslint.js` final se vería asi:

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  setings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "standard",
    "eslint-config-prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
```

## Scripts

En el archivo `package.json`:

- para el formateador **Prettier**:

  ```json
  "format": "prettier --write ."
  ```

- para el linter **ESLint**:
  ```json
  "lint": "eslint --fix . --ext .js,.jsx"
  ```

### **Problema** (xD?):

El script "lint" marcará errores, y el script "format" podría, y lo hará si no lo evitamos, formatear los archivos ya empaquetados del directorio o carpeta `dist/` y el intocable archivo `package-lock.json` del directorio raíz.

### **Solución**:

Necesitaremos 2 archivos para ignorar algunas cosas:

- Creamos el archivo `.eslintignore` en el que le indicaremos a **ESLint** que ignore la carpeta o directorio `dist/`

  el archivo se veria asi:

  ```ignore
  dist
  ```

  si, solo asi jajaja

- Creamos el archivo `.prettierignore` en el que le indicaremos a **Prettier** que ignore la carpeta `dist/` y el archivo `package-lock.json`

```ignore
dist
package-lock.json
```

No necesitamos ignorar la carpeta `node_modules/` ya que es ignorada por defecto.

![Hunnigan modo diosa](https://media1.giphy.com/media/6bc7L8ecOIhi4Ghypb/giphy.gif?cid=ecf05e4734ghka0a3xvwp82eamcngcj6mh1q2xz32asj7i6r&rid=giphy.gif&ct=g)
