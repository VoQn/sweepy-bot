import { Command, CommandCategory } from './command';
import { Client } from 'discord.js';
import { Response } from '../types';
import bookmarks from '../../data/bookmark.json';

export const BookmarkCommand = Command.register({
  category: CommandCategory.ONI,
  name: 'Bookmark',
  help: {
    summery: 'ONI のゲームプレイで便利なサイトを紹介するよ',
  },
  exec: (_args: string, _client?: Client): Response => {
    const links: string[] = [];
    for (const siteInfo of Object.values(bookmarks)) {
      links.push(`:link:[${siteInfo.name}](${siteInfo.url})`);
    }
    return {
      content: links.join('\n'),
    };
  },
});
