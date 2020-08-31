# @sweepy-bot/eslint-config

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
