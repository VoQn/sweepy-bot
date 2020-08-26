import { Command, CommandCategory } from './command';
import { emojinate } from '../emojinate';

export const EmojiCommand = Command.register({
  category: CommandCategory.Misc,
  name: 'Emojinate',
  help: {
    summery:
      `_出来るだけ_ ${emojinate('emoji')} _に変換するよ_\n` +
      '```!emojinate 今からliveやります!```',
  },
  exec: (args, _client) => ({
    content: emojinate(args),
    options: {},
  }),
});
