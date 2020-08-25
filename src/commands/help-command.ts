import { CommandCategory, Command } from './command';
import { getCustomEmoji } from '../utils';
import { MessageEmbedOptions } from 'discord.js';
import { emojinate } from '../emojinate';

export const HelpCommand = Command.register({
  category: CommandCategory.General,
  name: 'Help',
  help: {
    summery: '_このコマンドだよ。応えられるコマンド一覧を出すよ_\n' +
      '```!help```',
  },
  // tslint:disable-next-line: no-shadowed-variable
  exec: (args, client) => {
    const emoji = (emojiName: string) => getCustomEmoji(emojiName, client);
    const isNoneArgs = args == null || args.length < 1;
    const sweepyEmoji = emoji('sweepy');
    const sweepyIcon = client.user.avatarURL();
    let title = emojinate('about');
    const author = {
      name: 'Sweepy Not',
      iconURL: sweepyIcon,
    };
    const footer = {
      text: 'Sweepy Bot',
      iconURL: sweepyIcon,
    };
    const color = 0xfc6600;
    if (isNoneArgs) {
      const fields = Command.sortedAllCommands.map(c => {
        return {
          name: `:arrow_forward: ${c.name}`,
          value: c.help.summery,
        };
      });

      const embed: MessageEmbedOptions = {
        author,
        color,
        title,
        thumbnail: { url: sweepyIcon },
        description: '_テキストチャットのログを読んで、行頭の_ `!` _で始まる各コマンドに応答します。_',
        fields,
        footer,
        timestamp: new Date(),
      };

      return {
        content: `:information_source:  ${sweepyEmoji} _が答えるよ_`,
        options: { embed },
      };
    }
  },
});
