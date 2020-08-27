export type Entry = { [key: string]: string };
export type Dictionary = Entry[];

export class AnswerTalker {
  dictionary: Dictionary;
  keyword: string;
  answer: string;
  answerConverter?: (query: string) => string;

  constructor(
    dictionary: Dictionary,
    keyword: string,
    answer: string,
    answerConverter?: (query: string) => string
  ) {
    this.dictionary = dictionary; // e.g. [{ tag: 'a', url: 'hoge'}, ...]
    this.keyword = keyword; // e.g. 'tag'
    this.answer = answer; // e.g. 'url'
    this.answerConverter = (a) => a;
    if (answerConverter !== undefined) {
      this.answerConverter = answerConverter;
    }
  }

  getKeywords(): string {
    return ['```', ...this.dictionary.map((o) => o[this.keyword]), '```'].join(
      '\n'
    );
  }

  getAnswer(arg: string): string {
    const defaultAnswer = ':thinking: なんのこと？';
    if (!arg) {
      return defaultAnswer;
    }

    if (arg.length < 2) {
      return ':thinking: もうちょっとヒントちょうだい (2文字以上欲しがっています)';
    }

    // keywordと完全一致検索する
    const exact = this.exact_match(arg);
    if (exact !== undefined) {
      return this.answerConverter(exact[this.answer]);
    }

    // keywordと部分一致検索する
    const choice = this.partial_match(arg);
    if (choice.length === 1) {
      const keyword = choice[0][this.keyword];
      const answer = choice[0][this.answer];
      const suggested = this.answerConverter(answer);

      if (answer === arg) {
        return suggested;
      } else {
        return [
          ':bulb: もしかして、これ？',
          '```',
          keyword,
          '```',
          suggested,
        ].join('\n');
      }
    }

    if (choice.length > 0) {
      return [
        ':thinking: 複数あるよ。聞き直してね。',
        '```',
        ...choice.map((o) => o[this.keyword]),
        '```',
      ].join('\n');
    }

    return defaultAnswer;
  }

  exact_match(arg: string): Entry {
    return this.dictionary.find((o) => o[this.keyword] === arg);
  }

  partial_match(arg: string): Entry[] {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    return this.dictionary.filter((o) => o[this.keyword].match(arg));
  }
}
