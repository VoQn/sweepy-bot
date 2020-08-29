import { Client, Emoji } from 'discord.js';

export const getCustomEmoji = (
  name: string,
  client?: Client,
): string | Emoji => {
  if (client == null) {
    return `:${name}:`;
  }
  const result = client.emojis.cache.find((v) => v.name === name);
  if (result == null) {
    return '';
  }
  return result;
};
