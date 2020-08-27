import { AnswerTalker } from '../answer-talker';
import { Response } from '../types';
import { Command, CommandCategory } from './command';
import cheatsheets from '../data/cheatsheet.json';

const answerTalker = new AnswerTalker(
  Object.values(cheatsheets),
  'name',
  'url'
);

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
    if (!args) {
      // チートシート一覧
      return { content: answerTalker.getKeywords() };
    } else {
      // チートシートの返答
      return { content: answerTalker.getAnswer(args) };
    }
  },
});
