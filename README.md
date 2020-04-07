# Javascript Memory Game

[![Dependabot badge](https://flat.badgen.net/dependabot/wbkd/webpack-starter?icon=dependabot)](https://dependabot.com/)

Webpack based, Javascript ES6/ES7 small game.


### Installation

```
npm i
yarn
```

### Start Dev Server

```
npm run serve
yarn serve
```

### Build Prod Version

```
npm run build
yarn build
```

### Unit testing with Jest

```
npm run unit
yarn unit
npm run unit:only
yarn unit:only
npm run unit:watch
yarn unit:watch
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader) with standard config extend.

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
