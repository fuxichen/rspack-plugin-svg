# rsbuild-plugin-svg

Rsbuild plugin to load SVG files as Vue components, using SVGO for optimization.

Fork by [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)

<p>
  <a href="https://npmjs.com/package/rsbuild-plugin-svg">
   <img src="https://img.shields.io/npm/v/rsbuild-plugin-svg?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/rsbuild-plugin-svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/rsbuild-plugin-svg?minimal=true"><img src="https://img.shields.io/npm/dm/rsbuild-plugin-example.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Usage

Install:

```bash
npm add rsbuild-plugin-svg -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginSvg } from "rsbuild-plugin-svg";

export default {
  plugins: [pluginSvg()],
};
```

## Import params

### URL

SVGs can be imported as URLs using the `?url` suffix:

```js
import iconUrl from './my-icon.svg?url'
// 'data:image/svg+xml...'
```

### Raw

SVGs can be imported as strings using the `?raw` suffix:

```js
import iconRaw from './my-icon.svg?raw'
// '<?xml version="1.0"?>...'
```

### Component

SVGs can be explicitly imported as Vue components using the `?component` suffix:

```js
import IconComponent from './my-icon.svg?component'
// <IconComponent />
```

## Options

### Default import config

When no explicit params are provided SVGs will be imported as Vue components by default.
This can be changed using the `defaultImport` config setting,
such that SVGs without params will be imported as URLs (or raw strings) instead.

## defaultImport

```js
svgLoader({
  defaultImport: 'url' // or 'raw' default: 'component'
})
```

### SVGO Configuration

#### `vite.config.js`

```js
svgLoader({
  svgoConfig: {
    multipass: true
  }
})
```

### Disable SVGO

#### `vite.config.js`

```js
svgLoader({
  svgo: false
})
```

### Skip SVGO for a single file

SVGO can be explicitly disabled for one file by adding the `?skipsvgo` suffix:

```js
import IconWithoutOptimizer from './my-icon.svg?skipsvgo'
// <IconWithoutOptimizer />
```

### Use with TypeScript

If you use the loader in a Typescript project, you'll need to reference the type definitions inside `vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
```

## License

[MIT](./LICENSE).
