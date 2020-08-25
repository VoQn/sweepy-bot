import { CommandCategory, Command } from './command';
import { getCustomEmoji } from '../utils';
import { MessageEmbedOptions, EmbedFieldData } from 'discord.js';
import { emojinate } from '../emojinate';

export const HelpCommand = Command.register({
  category: CommandCategory.General,
  name: 'Help',
  help: {
    summery: '_このコマンドだよ。応えられるコマンド一覧を出すよ_\n' +
      '```!help```',
    description: '_このコマンドだよ。応えられるコマンド一覧を出すよ_\n' +
      '```!help```\n' +
      '_特定のコマンドの詳しい説明も出せるよ_\n' +
      '```!help !critter```',
  },
  exec: (args, client) => {
    const emoji = (emojiName: string) => getCustomEmoji(emojiName, client);

    const sweepyEmoji = emoji('sweepy');
    const dupethink = emoji('dupethink');

    let title = emojinate('about');
    let content = `:information_source:  ${sweepyEmoji} _が答えるよ_`;
    let description = '_テキストチャットのログを読んで、行頭の_ `!` _で始まる各コマンドに応答します。_';
    const fields: EmbedFieldData[] = [];
    const cmdName = args.replace(/^\!/, '');

    let viewAllHelp = true;
    if (args) {
      if (!Command.has(cmdName)) {
        // 引数としてコマンドは渡されているけど、そんなコマンドは未実装って場合
        content = `${dupethink} \`!${cmdName}\` _そのコマンドは無いよ……?_`;
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
      Command.sortedAllCommands.forEach(c => {
        fields.push({
          name: `:arrow_forward: ${c.name}`,
          value: c.help.summery,
        });
      });
    }

    const sweepyIcon = client.user.avatarURL();

    const author = {
      name: 'Sweepy Not',
      iconURL: sweepyIcon,
    };
    const footer = {
      text: 'Sweepy Bot',
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

    return {
      content,
      options: { embed },
    };
  },
});
