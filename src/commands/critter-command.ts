import { Command, CommandCategory } from './command';
import { Client } from 'discord.js';
import { Response } from '../types';
import { Critter } from '../critter';
import { getCustomEmoji } from '../utils';

export const CritterCommand = Command.register({
  category: CommandCategory.ONI,
  name: 'Critter',
  help: {
    summery: '_知ってる動物の詳細を教えるよ_\n' + '```!critter プリンス```',
    description:
      '_知ってる動物の詳細を教えるよ。_\n' +
      '```!critter ハッチ```\n' +
      '_名前が部分的でも2文字以上なら連想できるモノを探すよ_\n' +
      '```!critter ふさふさ```',
  },
  exec: (args: string, client: Client): Response => {
    const emoji = (emojiName: string) => getCustomEmoji(emojiName, client);
    const sadSweepyEmoji = emoji('sadsweepy');
    if (args.length < 2) {
      return {
        content: `${sadSweepyEmoji} _**2文字以上で聞いてね**_`,
        options: {},
      };
    }
    const critter = Critter.findByName(args);
    if (critter == null) {
      return {
        content: `${sadSweepyEmoji} _まだその動物は知らないや……_`,
        options: {},
      };
    }
    return critter.detailEmbed(client);
  },
});
