import { Response } from '../types';
import { Command, CommandCategory } from './command';

import cheatsheet_data from '../data/cheatsheet.json';
const cheatsheets = Object.values(cheatsheet_data);
type Cheatsheet = { name: string, url: string }

function getKeywords() {
  return ['```', ...cheatsheets.map((o) => o.name), '```'].join('\n')
}

const defaultAnswer = ':thinking: なんのこと？';

function getAnswer(arg: string): string {
  // keywordと完全一致検索する
  const exact: Cheatsheet = exact_match(arg);
  if (exact !== null) {
    return exact.url;
  }

  // keywordと部分一致検索する
  const choice: Array<Cheatsheet> = partial_match(arg);
  if (choice.length === 1) {
    const name = choice[0].name;
    const url = choice[0].url;

    return [
      ':bulb: もしかして、これ？',
      '```',
      name,
      '```',
      url,
    ].join('\n');
  }

  if (choice.length > 1) {
    return [
      ':thinking: 複数あるよ。聞き直してね。',
      '```',
      ...choice.map((o) => o.name),
      '```',
    ].join('\n');
  }

  return defaultAnswer;
}

function exact_match(arg: string): Cheatsheet | null {
  return cheatsheets.find((o) => o.name === arg);
}

function partial_match(arg: string): Array < Cheatsheet > {
  return cheatsheets.filter((o) => o.name.includes(arg));
}

export const CheatsheetCommand: Command = Command.register({
  category: CommandCategory.ONI,
  name: 'Cheatsheet',
  help: {
    summery: [
      '_キーワードにマッチしたチートシート出すよ。何も指定してなかったらとりあえず一覧リストを出すよ_',
      '```!cheatsheet 液体の比重```',
    ].join('\n'),
    description: [
      '_キーワードにマッチしたチートシート出すよ。_',
      '```!cheatsheet 液体の比重```',
      '_何も指定してなかったらとりあえず一覧リストを出すよ_',
      '```!cheatsheet```',
      '_ぱっと思いつかなかったらあいまいなキーワードでもそれっぽいのは出せるよ_',
      '```!cheatsheet 比重```',
    ].join('\n'),
  },

  exec: (args: string): Response => {
    if (!args || args.length == 0) {
      // チートシート一覧
      return { content: getKeywords() };
    } else if (args.length < 2) {
      return { content: ':thinking: もうちょっとヒントちょうだい (2文字以上欲しがっています)' };
    } else {
      // チートシートの返答
      return { content: getAnswer(args) };
    }
  }
});
