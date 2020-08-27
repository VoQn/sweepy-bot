import { Command, CommandCategory } from './command';
import { emojinate } from '../emojinate';

export const EmojiCommand = Command.register({
  category: CommandCategory.Misc,
  name: 'Emojinate',
  help: {
    summery: [
      `_出来るだけ_ ${emojinate('emoji')} _に変換するよ_` +
        '```!emojinate 今からliveやります!```',
    ].join('\n'),
  },
  exec: (args) => ({
    content: emojinate(args),
    options: {},
  }),
});
