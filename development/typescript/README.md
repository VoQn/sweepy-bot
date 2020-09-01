# `@sweepy-bot/typescript`

## これなに？

**Transpiler: [Typescript](https://www.typescriptlang.org/)** の共通コンパイル設定など

## Install

### `lerna add --scope` を使う場合 (Recommend)

```sh
# ${your_package_name} はインストール先のパッケージの名前
npx lerna add @sweepy-bot/typescript --scope ${your_package_name}
```

### または `yarn add --dev`

上の `lerna add` で入れない場合はこう

```sh
cd ${your_package_root_dir}
yarn add --dev @sweepy-bot/typescript
```

### あるいは `package.json` に `devDependencies` として追加

#### `package.json`

```json
{
  "devDependencies": {
    "@sweepy-bot/typescript": ">=0"
  }
}
```

## Usage

### パッケージのルートディレクトリに `tsconfig.json` ファイルを追加

#### `tsconfig.json`

これだけ

```json
{
  "extends": "@sweepy-bot/typescript"
}
```

### パッケージ独自の設定を追加したい時

例えばこういう場合

- ビルドした時のコンパイルディレクトリを `lib` にしたい
- コンパイルターゲットを web 用の `es5` にしたい
- [Storybook](https://storybook.js.org/) でのビジュアルテストもやりたい

#### `tsconfig.json`

```json
{
  "extends": "@sweepy-bot/typescript",
  "compilerOptions": {
    "module": "es5",
    "lib": ["dom", "es2020"],
    "rootDir": "./src",
    "outDir": "./lib",
    "declarationDir": "./lib/types"
  },
  "include": ["./src/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

#### `tsconfig.build.json`

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "**/*.stories.tsx", "**/*.stories.ts"]
}
```
