# `@sweepy-bot/prettier`

## これなに？

**File Formatter: [prettier](https://prettier.io/)** の共通設定やらプラグインやら

## Install

### `lerna add --scope` を使う場合 (Recommend)

```sh
# ${your_package_name} はインストール先のパッケージの名前
npx lerna add @sweepy-bot/prettier --scope ${your_package_name}
```

### または `yarn add --dev`

上の `lerna add` で入れない場合はこう

```sh
cd ${your_package_root_dir}
yarn add --dev @sweepy-bot/prettier
```

### あるいは `package.json` に `devDependencies` として追加

#### package.json

```json
{
  "devDependencies": {
    "@sweepy-bot/prettier": ">=0"
  }
}
```

## Usage

### `package.json` に書いておしまい

これだけ

```json
{
  "scripts": {
    "format": "prettier -w src"
  },
  "prettier": "@sweepy-bot/prettier"
}
```
