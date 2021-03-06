import { Client, EmbedFieldData, MessageEmbedOptions } from 'discord.js';

import bookmarks from '../data/bookmark.json';
import { Response } from '../interfaces';
import { Command, CommandCategory } from './command';

interface Bookmark {
  name: string;
  alias: string;
  url: string;
  keywords: string[];
}

export const BookmarkCommand = Command.register({
  category: CommandCategory.ONI,
  name: 'Bookmark',
  help: {
    summery: [
      'ONI のゲームプレイで便利なサイトを紹介するよ',
      '```!bookmark```',
    ].join('\n'),
  },
  exec: (_args: string, client?: Client): Response => {
    const color = 0xfcfc00;
    const fields: EmbedFieldData[] = [];

    for (const siteInfo of Object.values<Bookmark>(bookmarks)) {
      fields.push({
        name: siteInfo.name,
        value: `:link: _${siteInfo.url}_`,
      });
    }
    const embed: MessageEmbedOptions = {
      color,
      title: ':bookmark: Bookmarks',
      fields,
      timestamp: new Date(),
    };
    if (client) {
      const sweepyIcon = client.user.avatarURL();
      embed.author = {
        name: 'Sweepy Bot',
        iconURL: sweepyIcon,
      };
      embed.footer = {
        text: 'Sweepy Bot',
        iconURL: sweepyIcon,
      };
    }
    return {
      content: ':bookmark: _ブックマークしているサイトだよ_',
      options: { embed },
    };
  },
});
