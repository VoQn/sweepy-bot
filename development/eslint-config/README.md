# `@sweepy-bot/eslint-config`

## これなに？

**Linter : [eslint](https://eslint.org/)** 用のプリセット

## Install

### `lerna add --scope` を使う場合 (Recommend)

```sh
# ${your_package_name} はインストール先のパッケージの名前
npx lerna add @sweepy-bot/eslint-config --scope ${your_package_name}
```

### または `yarn add --dev`

上の `lerna add` で入れない場合はこう

```sh
cd ${your_package_root_dir}
yarn add --dev @sweepy-bot/eslint-config
```

### あるいは `package.json` に `devDependencies` として追加

#### package.json

```json
"devDependencies": {
  "@sweepy-bot/eslint-config": ">=0"
}
```

## Usage

### パッケージのルートディレクトリに `.eslintrc` ファイルを追加

これだけ

```yaml
# .eslintrc.yaml
extends: '@sweepy-bot'
```

### `npm script` として `yarn lint` を追加

このようなモノを `package.json` に追加する

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.ts,.json src"
  }
}
```

これで `@sweepy-bot` プロジェクト全体での `precommit` 時に自動的に lint がかかる
`eslint` が自動的に修正できるモノは `yarn lint --fix` で OK

### パッケージ独自のルールを追加したい時

```yaml
# .eslintrc.yaml
extends: '@sweepy-bot'

# 追加、上書きする設定を下に列記
# lint の対象にしないファイルパターンマッチ
ignorePatterns:
  - '**/temp/*'
  - '**/vender/*'

# 上書きしたい lint ルール
rules:
  - array-element-newline:
      - error
      - multiline: true
        minItems: 3
```
