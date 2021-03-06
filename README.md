# DiscordBotBase

![Test](https://github.com/VoQn/sweepy-bot/workflows/Test/badge.svg)

Heroku で DiscordBot を作るためのベースです。

## 詳細

- [誰でも作れる！Discord Bot（基礎編）](https://note.com/exteoi/n/nf1c37cb26c41)をお読みください。
- [Discord.js で embed (埋め込みメッセージ) を扱う - Qiita](https://qiita.com/nedew/items/4e0c20c1a89e983a6992)

## 開発する時は

### use yarn with nodenv

- ローカル環境では [yarn](https://classic.yarnpkg.com/ja/) をパッケージマネージャに使用してください。
- [nodenv](https://github.com/nodenv/nodenv) と併用するのを推奨します

### 「yarn 持ってません」

#### nodeenv-yarn-install (Recommended)

- [nodenv-yarn-install](https://github.com/pine/nodenv-yarn-install) を使うなど

#### standalone install

使わない場合は

```sh
# インストール
npm install -g yarn
# nodenv 使ってるならこの後にこれも
nodenv rehash
which yarn # path が出てきたら成功
```

### 「git clone したけどどうすればいいんだべ」

```sh
yarn #依存関係インストール
yarn clean # dist とかクリア
yarn lint:fix # 修正できる所は自動的にフォーマットされる。出来なかったものだけコンソールに出る
yarn build # ビルド
yarn test # テスト
```

一応、 `git commit` した時と `git push` した時にそれぞれ `pre-commit` と `pre-push` が走りますが、開発中は適宜自分でリンターやテストを動かして確認することをおすすめします。

## ほんちゃん WANTS!

### 基盤

- [x] typescript 化
- [x] Jest で、メッセージ処理はテストできるように
- [x] コマンド別にソース分けて追加を容易にしておく
- [x] heroku で動くように
- [ ] Logger の作成
  - 実行環境では console.error や console.info を直に使うな (by VoQn)
  - process.env とかを読んで 基本 .log ファイルに書き込みはしつつ、ロガーが 「 console に出すべきかどうか決める」

### 機能

#### [x] welcome message 機能。

- dyno より可愛さをアピール
- welcome で自己紹介した人にのみ「認証済み」ロールを付ける

#### コマンド機能

- [ ] `!cheetsheet` チートシートを返すコマンド。
  - [x] `!cheetsheet` のみの場合は呼び出せる一覧。
  - [ ] できれば `!cheetsheet 作物 温度` とかでフルパスなしで絞り込みできるように
- [ ] `!液体 [温度]` 液体の比重を軽い順のリストを返す。その温度で液体の物質のみで返す。温度が指定されなかったら、25℃ で。
- [ ] `!気体` 気体の比重を(ry)
- [x] `!emojinate [アルファベット + ! + ?]` EMOJI にしてくれる。一部の記号も使える。
- [ ] `!role` 可能なら自己申告で「配信者」とか「Modder」のロールを付与
- [x]`!critter [日本語名/英語名]` 生き物の細かい生存条件等
  - 日本語名の場合、かたかな・カタカナどっちでも検索できるようにするべきか？
- [ ] `!plant [https://gyazo.com/40046ca4b7ad9e395cc43a74ce85ae0d日本語名/英語名]` 作物の細かい生育条件等
- [ ] `!refinery-temp [製錬対象] [冷却液]` 精錬する金属と冷却液の組み合わせで、一回で何度冷却液の温度が上がるか
- [ ] `!aquatuner [物質名]` 14℃ で何 DTU 変わるか (10kg _ SHC _ 14K)を返す。
- [ ] `!regulator [気体名]` -１４ K で何 DTU 変わるか (1kg _ SHC _ 14K)を返す。
- [ ] `!weezewhote [気体名]` -5K で何 DTU 変わるか （1kg _ SHC _ 5K）を返す
- [ ] `!turbine [温度]@[intake]` タービンの諸元を返す
  - 水蒸気から除去した熱量: (入力水蒸気温度-95)[K] _ 水 SHC _ 0.4kg \* intake
  - 発熱量: 4kDTU + 水蒸気から除去した熱量 \* 0.1
  - 熱消去量: 水蒸気から除去した熱量 - 発熱量
  - 最大発電量時の熱消去量: {(200-95) _ 水 SHC _ 2kg} = 877.59kDTU
  - 発電量: 水蒸気から除去した熱量 / 最大発電量時の熱消去量 \* 850W
- [ ] `!turbine [温度]` 最適な intake 数を返す？ (1 個～ 5 個)
  - 発電量が 850W 上限になる、最大の intake 数
  - 発電量が 850W 以下の、最小の intake 数 (↑ と 1 個差になるはずなので、こっちだけ返すのでも良いかも)

#### (自分の)おはようからおやすみまで暮らしを見つめる機能

- heroku のダウンタイムに合わせて、おはようとおやすみのメッセージを投稿する
- かわいい

#### 自動配信告知

- ボイス ch で配信がはじまったら、#配信告知で何か言う

#### ゲームの update 情報 RSS を自動投稿

- https://store.steampowered.com/feeds/newshub/app/457140/?cc=JP&l=japanese&snr=1_2108_9__1601

#### その他 TODO

- [ ] 英語日本語翻訳辞書を持っときたい
  - 各 commands で利用できる形の辞書がほしい
  - debug name も出してほしい
    - サンドボックスモードだと名前が違ったりするのを教えてほしい
      - 天然ガスでも Natural Gas でもなく Methane でないと出てこないとか
      - これのことですか？ [内部データで名前が違う動植物一覧 - OxygenNotIncluded Advanced Notes](https://scrapbox.io/OxygenNotIncluded/%E5%86%85%E9%83%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%81%A7%E5%90%8D%E5%89%8D%E3%81%8C%E9%81%95%E3%81%86%E5%8B%95%E6%A4%8D%E7%89%A9%E4%B8%80%E8%A6%A7)
    - ↑ それ
