import { AnswerTalker } from '../answer-talker';
import { Response } from '../types';
import { Command, CommandCategory } from './command';
import cheatsheets from '../../data/cheatsheet.json';
import { Client } from 'discord.js';

const answerTalker = new AnswerTalker(Object.values(cheatsheets), 'name', 'url');

export const CheatsheetCommand: Command = Command.register({
  category: CommandCategory.ONI,
  name: 'Cheatsheet',
  help: {
    summery: '_キーワードにマッチしたチートシート出すよ。何も指定してなかったらとりあえず一覧リストを出すよ_\n' +
      '```!cheatsheet 液体の比重```',
  },
  exec: (args: string, _client: Client): Response => {
    if (!args) {
      // チートシート一覧
      return { content: answerTalker.getKeywords() };
    } else {
      // チートシートの返答
      return { content: answerTalker.getAnswer(args) };
    }
  },
});
