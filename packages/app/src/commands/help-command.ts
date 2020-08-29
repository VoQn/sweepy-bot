import { EmbedFieldData, MessageEmbedOptions } from 'discord.js';

import { emojinate, getCustomEmoji } from '../emojinate';
import { Command, CommandCategory } from './command';

export const HelpCommand = Command.register({
  category: CommandCategory.General,
  name: 'Help',
  help: {
    summery: [
      '_このコマンドだよ。応えられるコマンド一覧を出すよ_',
      '```!help```',
    ].join('\n'),
    description: [
      '_このコマンドだよ。応えられるコマンド一覧を出すよ_',
      '```!help```',
      '_特定のコマンドの詳しい説明も出せるよ_',
      '```!help !critter```',
    ].join('\n'),
  },
  exec: (args, client) => {
    const emoji = (emojiName: string): string => {
      const e = getCustomEmoji(emojiName, client);
      return typeof e === 'string' ? e : e.toString();
    };
    const getSweepyIcon = () => (client == null ? '' : client.user.avatarURL());
    const sweepyEmoji = emoji('sweepy');
    const thinkdupe = emoji('thinkdupe');

    let title = emojinate('about');
    const authorName = 'Sweepy Bot';
    let content = `:information_source:  ${sweepyEmoji} _が答えるよ_`;
    let description =
      '_テキストチャットのログを読んで、行頭の_ `!` _で始まる各コマンドに応答します。_';
    const fields: EmbedFieldData[] = [];
    const cmdName = args.replace(/^!/, '');

    let viewAllHelp = true;
    if (args) {
      if (!Command.has(cmdName)) {
        // 引数としてコマンドは渡されているけど、そんなコマンドは未実装って場合
        content = `${thinkdupe} \`!${cmdName}\` _そのコマンドは無いよ……?_`;
      } else {
        const command = Command.find(cmdName);
        // 引数として使えるコマンドを指定しているので、その詳細のみ Embed で返す
        viewAllHelp = false;
        content = `\`!${cmdName}\` _コマンドの詳しいヘルプだよ_`;
        title = `:arrow_forward: ${command.name}`;
        description = command.help.description || command.help.summery;
      }
    }
    if (viewAllHelp) {
      // 特定のコマンドのヘルプではないので全てフィールドへ追加する
      Command.sortedAllCommands.forEach((c) => {
        fields.push({
          name: `:arrow_forward: ${c.name}`,
          value: c.help.summery,
        });
      });
    }

    const sweepyIcon = getSweepyIcon();

    const author = {
      name: authorName,
      iconURL: sweepyIcon,
    };
    const footer = {
      text: authorName,
      iconURL: sweepyIcon,
    };
    const color = 0xfc6600;

    const embed: MessageEmbedOptions = {
      author,
      color,
      title,
      thumbnail: { url: sweepyIcon },
      description,
      fields,
      footer,
      timestamp: new Date(),
    };

    return { content, options: { embed } };
  },
});
