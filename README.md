# DiscordBotBase

GlitchでDiscordBotを作るためのベースです。

## 詳細

[誰でも作れる！Discord Bot（基礎編）](https://note.com/exteoi/n/nf1c37cb26c41)をお読みください。

## ほんちゃん TODO

- 基盤
  - typescript化
  - Jestで、メッセージ処理はテストできるように
  - herokuで動くように
- 機能
  - welcome message機能。
    - dynoより可愛さをアピール
  - welcomeで自己紹介した人にのみ「認証済み」ロールを付ける
  - コマンド別にソース分けて追加を容易にしておく
  - コマンド機能
    - `!cheetsheet` チートシートを返すコマンド。 
      - `!cheetsheet` のみの場合は呼び出せる一覧。 
      - できれば `!cheetsheet 作物 温度` とかでフルパスなしで絞り込みできるように
    - `!液体 [温度]` 液体の比重を軽い順のリストを返す。その温度で液体の物質のみで返す。温度が指定されなかったら、25℃で。
    - `!気体` 気体の比重を(ry)
    - `!emojinate [アルファベット + ! + ?]` EMOJIにしてくれる。一部の記号も使える。
    - `!role` 可能なら自己申告で「配信者」とか「Modder」のロールを付与
  - (自分の)おはようからおやすみまで暮らしを見つめる機能
    - herokuのダウンタイムに合わせて、おはようとおやすみのメッセージを投稿する
  - ボイスchで配信がはじまったら、#配信告知で何か言う
  - ゲームのupdate情報 RSSを自動投稿
    - https://store.steampowered.com/feeds/newshub/app/457140/?cc=JP&l=japanese&snr=1_2108_9__1601
  - embedメッセージに対応して、見た目を超リッチに。
    - https://qiita.com/nedew/items/4e0c20c1a89e983a6992

# 注意

watch.jsonで変更検知を制御してます。
いまのところ1分おきに反映です。login APIのrate limitsは1日1000回っぽいので、再起動は1000回までに止めたい。1.44分おきに1回まで許されるので、1分おきにしました。
再起動対象のファイルは拡張子で制御してますが、includeのパターンを追加すれば他のファイルも扱えます。
