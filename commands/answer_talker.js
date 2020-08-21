class AnswerTalker {
  constructor(dictionary, keyword, answer, answerConverter) {
    this.dictionary = dictionary; // e.g. [{ tag: 'a', url: 'hoge'}, ...]
    this.keyword = keyword; // e.g. 'tag'
    this.answer = answer; // e.g. 'url'
    this.answerConverter = a => a;
    if (answerConverter !== undefined) {
      this.answerConverter = answerConverter;
    }
  }
  
  getKeywords() {
     return ["```", ...this.dictionary.map(o => o[this.keyword]) ,"```"].join("\n");
  }
  
  getAnswer(arg) {
    if (!arg) {
      return 'なんのこと？'
    }

    if (arg.length < 2) {
      return 'もうちょっとヒントちょうだい (2文字以上欲しがっています)';
    }
    
    // tagと完全一致検索する
    const exact = this.exact_match(arg);
    if (exact !== undefined) {
      return this.answerConverter(exact[this.answer]);
    }

    // 逆に、tagの部分文字列にマッチする。
    const choice = this.partial_match(arg)
    if (choice.length === 1) {
      const answer = choice[0][this.answer];
      const suggested = this.answerConverter(answer);
      if(answer === arg){
        return suggested;
      } else {
        return ["もしかして、これ？", "```", ...choice.map(o => o[this.keyword]), "```", suggested].join("\n");
      }
    }

    if (choice.length > 0) {
      return ["複数あるよ。聞き直してね。", "```", ...choice.map(o => o[this.keyword]), "```"].join("\n");
    }
    
    return 'なんのこと？'
  }

  exact_match(arg) {
    return this.dictionary.find(o => o[this.keyword] === arg);
  }

  partial_match(arg) {
    return this.dictionary.filter(o => o[this.keyword].match(arg));
  }
  
  choice_to_keyword(choice) {
    
  }
}
module.exports = AnswerTalker;
