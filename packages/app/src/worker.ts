import { SweepyDock } from '@sweepy-bot/sweepy-dock';
import Discord from 'discord.js';

const client = new Discord.Client();
const dock = new SweepyDock(client);

let TOKEN = '';
if (process?.env) {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (token == null || token.length < 1) {
    console.log('DISCORD_BOT_TOKENが設定されていません。');
    process.exit(0);
  } else {
    TOKEN = token;
  }
}

dock.start(TOKEN).catch((reason) => {
  console.group('ログインに問題がありました');
  console.info(reason);
  console.groupEnd();
  process.exit(0);
});
