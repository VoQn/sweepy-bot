# `@sweepy-bot/babel`

## これなに？

**`.js` を [babel](https://babeljs.io/)** でよしなに解釈する用のやつ

## Install

### `lerna add --scope` を使う場合 (Recommend)

```sh
# ${your_package_name} はインストール先のパッケージの名前
npx lerna add @sweepy-bot/babel --scope ${your_package_name}
```

### または `yarn add --dev`

上の `lerna add` で入れない場合はこう

```sh
cd ${your_package_root_dir}
yarn add --dev @sweepy-bot/babel
```

### あるいは `package.json` に `devDependencies` として追加

#### `package.json`

```json
{
  "devDependencies": {
    "@sweepy-bot/babel": ">=0"
  }
}
```

## Usage

### パッケージのルートディレクトリに `babel.config.js` ファイルを追加

これだけ

```js
// babel.config.js
module.exports = {
  presets: ['module:@sweepy-bot/babel'],
};
```
