import { Response } from '../types';
import { Command, CommandCategory } from './command';

import cheatsheet_data from '../data/cheatsheet.json';
const cheatsheets = Object.values(cheatsheet_data);
type Cheatsheet = { name: string, url: string, keywords: Array<string> }

function getNames() {
  return ['```', ...cheatsheets.map((o) => o.name), '```'].join('\n')
}

const defaultAnswer = ':thinking: なんのこと？';

function aimaiAnswer(choice :Array<Cheatsheet>) {
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
  return null;
}

function getAnswer(arg: string): string {
  // argとnameを完全一致検索する
  const exact: Cheatsheet | null = exactMatch(arg);
  if (exact) {
    return exact.url;
  }

  // argを分解してkeyword検索する
  const choice: Array<Cheatsheet> = keywordMatch(arg);
  const answer = aimaiAnswer(choice);
  if(answer) {
    return answer;
  }

  // argとnameを部分一致検索する
  const choice2: Array<Cheatsheet> = partialMatch(arg);
  const answer2 = aimaiAnswer(choice2);
  if (answer2) {
    return answer2;
  }

  return defaultAnswer;
}

function exactMatch(arg: string): Cheatsheet | null {
  return cheatsheets.find((o) => o.name === arg);
}

function partialMatch(arg: string): Array < Cheatsheet > {
  return cheatsheets.filter((o) => o.name.includes(arg));
}

function keywordMatch(arg: string): Array < Cheatsheet > {
  const keywords: string[] = arg.split(/\s/);
  let result = cheatsheets.slice();
  for(const keyword of keywords) {
    result = result.filter(o => o.keywords.some(k => k.includes(keyword)))
  }

  return result;
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
      return { content: getNames() };
    } else if (args.length < 2) {
      return { content: ':thinking: もうちょっとヒントちょうだい (2文字以上欲しがっています)' };
    } else {
      // チートシートの返答
      return { content: getAnswer(args) };
    }
  }
});
