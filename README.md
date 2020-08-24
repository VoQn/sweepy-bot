# DiscordBotBase

Glitch で DiscordBot を作るためのベースです。

## 詳細

[誰でも作れる！Discord Bot（基礎編）](https://note.com/exteoi/n/nf1c37cb26c41)をお読みください。

## 開発する時は

ローカル環境では `pnpm` をパッケージマネージャに使用してください。

#### 「pnpm 持ってません」
```sh
npm install -g pnpm
# nodenv 使ってるならこの後にこれも
nodenv rehash
```

#### 「git クローンしたけどどうすればいいんだべ」
```
pnpm i #依存関係インストール
pnpm clean # dist とかクリア
pnpx tslint --fix --project . # コミットする前にリントしてな
pnpm test # テスト
```

## ほんちゃん WANTS!

- 基盤
  - typescript 化
  - Jest で、メッセージ処理はテストできるように
  - heroku で動くように
- 機能

  - welcome message 機能。
    - dyno より可愛さをアピール
  - welcome で自己紹介した人にのみ「認証済み」ロールを付ける
  - コマンド別にソース分けて追加を容易にしておく
  - コマンド機能

    - `!cheetsheet` チートシートを返すコマンド。
      - `!cheetsheet` のみの場合は呼び出せる一覧。
      - できれば `!cheetsheet 作物 温度` とかでフルパスなしで絞り込みできるように
    - `!液体 [温度]` 液体の比重を軽い順のリストを返す。その温度で液体の物質のみで返す。温度が指定されなかったら、25℃ で。
    - `!気体` 気体の比重を(ry)
    - `!emojinate [アルファベット + ! + ?]` EMOJI にしてくれる。一部の記号も使える。
    - `!role` 可能なら自己申告で「配信者」とか「Modder」のロールを付与
    - `!critter [日本語名/英語名]` 生き物の細かい生存条件等
      - 日本語名の場合、かたかな・カタカナどっちでも検索できるようにするべきか？
    - `!plant [https://gyazo.com/40046ca4b7ad9e395cc43a74ce85ae0d日本語名/英語名]` 作物の細かい生育条件等
    - `!refinery-temp [製錬対象] [冷却液]` 精錬する金属と冷却液の組み合わせで、一回で何度冷却液の温度が上がるか
    - `!aquatuner [物質名]` 14℃ で何 DTU 変わるか (10kg _ SHC _ 14K)を返す。
    - `!regulator [気体名]` -１４ K で何 DTU 変わるか (1kg _ SHC _ 14K)を返す。
    - `!weezewhote [気体名]` -5K で何 DTU 変わるか （1kg _ SHC _ 5K）を返す
    - `!turbine [温度]@[intake]` タービンの諸元を返す
      - 水蒸気から除去した熱量: (入力水蒸気温度-95)[K] _ 水 SHC _ 0.4kg \* intake
      - 発熱量: 4kDTU + 水蒸気から除去した熱量 \* 0.1
      - 熱消去量: 水蒸気から除去した熱量 - 発熱量
      - 最大発電量時の熱消去量: {(200-95) _ 水 SHC _ 2kg} = 877.59kDTU
      - 発電量: 水蒸気から除去した熱量 / 最大発電量時の熱消去量 \* 850W
    - `!turbine [温度]` 最適な intake 数を返す？ (1 個～ 5 個)
      - 発電量が 850W 上限になる、最大の intake 数
      - 発電量が 850W 以下の、最小の intake 数 (↑ と 1 個差になるはずなので、こっちだけ返すのでも良いかも)

  - (自分の)おはようからおやすみまで暮らしを見つめる機能
    - heroku のダウンタイムに合わせて、おはようとおやすみのメッセージを投稿する
    - かわいい
  - ボイス ch で配信がはじまったら、#配信告知で何か言う
  - ゲームの update 情報 RSS を自動投稿
    - https://store.steampowered.com/feeds/newshub/app/457140/?cc=JP&l=japanese&snr=1_2108_9__1601
  - embed メッセージに対応して、見た目を超リッチに。
    - [Discord.js で embed (埋め込みメッセージ) を扱う - Qiita](https://qiita.com/nedew/items/4e0c20c1a89e983a6992)
  - 英語日本語翻訳辞書を持っときたい
    - 各 commands で利用できる形の辞書がほしい
    - debug name も出してほしい
      - サンドボックスモードだと名前が違ったりするのを教えてほしい
        - 天然ガスでも Natural Gas でもなく Methane でないと出てこないとか
        - これのことですか？ [内部データで名前が違う動植物一覧 - OxygenNotIncluded Advanced Notes](https://scrapbox.io/OxygenNotIncluded/%E5%86%85%E9%83%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%81%A7%E5%90%8D%E5%89%8D%E3%81%8C%E9%81%95%E3%81%86%E5%8B%95%E6%A4%8D%E7%89%A9%E4%B8%80%E8%A6%A7)

# 注意

watch.json で変更検知を制御してます。
いまのところ 1 分おきに反映です。login API の rate limits は 1 日 1000 回っぽいので、再起動は 1000 回までに止めたい。1.44 分おきに 1 回まで許されるので、1 分おきにしました。
再起動対象のファイルは拡張子で制御してますが、include のパターンを追加すれば他のファイルも扱えます。
