# DiscordBotBase

GlitchでDiscordBotを作るためのベースです。

## 詳細

[誰でも作れる！Discord Bot（基礎編）](https://note.com/exteoi/n/nf1c37cb26c41)をお読みください。

# 注意

watch.jsonで変更検知を制御してます。
いまのところ1分おきに反映です。login APIのrate limitsは1日1000回っぽいので、再起動は1000回までに止めたい。1.44分おきに1回まで許されるので、1分おきにしました。
再起動対象のファイルは拡張子で制御してますが、includeのパターンを追加すれば他のファイルも扱えます。
