# `@sweepy-bot/jest`

## これなに？

**Test Runner : [jest](https://jestjs.io/ja/)** の基本設定など

## Install

### `lerna add --scope` を使う場合 (Recommend)

```sh
# ${your_package_name} はインストール先のパッケージの名前
npx lerna add @sweepy-bot/jest --scope ${your_package_name}
```

### または `yarn add --dev`

上の `lerna add` で入れない場合はこう

```sh
cd ${your_package_root_dir}
yarn add --dev @sweepy-bot/jest
```

### あるいは `package.json` に `devDependencies` として追加

#### `package.json`

```json
{
  "devDependencies": {
    "@sweepy-bot/jest": ">=0"
  }
}
```

## Usage

### パッケージのルートディレクトリに `jest.config.js` ファイルを追加

これだけ

```js
module.exports = {
  preset: '@sweepy-bot/jest',
  // 上書きや追加したい項目は ↓ に書く
  name: 'my-package',
  displayName: 'my-package',
  // ...
};
```

### `package.json` に `npm script` としてテストコマンドを追加

前提としてビルドを必要とする場合

```json
{
  "scripts": {
    "pretest": "npm build",
    "test": "jest --"
  }
}
```
