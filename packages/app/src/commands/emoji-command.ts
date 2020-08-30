import { Client } from 'discord.js';

import { emojinate } from '../emojinate';
import { Command, CommandCategory } from './command';
import { HelpCommand } from './help-command';

export const EmojiCommand = Command.register({
  category: CommandCategory.Misc,
  name: 'Emoji',
  help: {
    summery: [
      `_出来るだけ_ ${emojinate('emoji')} _に変換するよ_` +
        '```!emoji 今からliveやります!```',
    ].join('\n'),
  },
  exec: (args: string, client?: Client) => {
    if (args) {
      return { content: emojinate(args) };
    }
    // 引数が無かったら使い方を返す
    return HelpCommand.exec('emoji', client);
  },
});
