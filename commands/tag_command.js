module.export = class TagCommand {
  constructor(dictionary, keyword, answer) {
    this.dictionary = dictionary;
    this.keyword = keyword;
    this.answer = answer;
  }
  
  getMessage(arg) {
    if (!arg) {
      return 'なんのこと？'
    }

    if (arg.length < 2) {
      return 'もうちょっとヒントちょうだい (2文字以上欲しがっています)';
    }
    
    // tagと完全一致検索する
    for(const entry of this.dictionary) {
      if (e == arg) {
        return url;
      }
    }

    // 逆に、tagの部分文字列にマッチする。
    const choice = this.dictionary.filter(o => o.tag.match(arg))
    if (choice.length === 1) {
      const suggestedURL = choice[0].url;
      return ["もしかして、これ？", "```", ...choice.map(o => o.tag), "```", suggestedURL].join("\n");
    }
    if (choice.length > 0) {
      return ["複数あるよ。聞き直してね。", "```", ...choice.map(o => o.tag), "```"].join("\n");
    }

    return 'なんのこと？';
  }
}
