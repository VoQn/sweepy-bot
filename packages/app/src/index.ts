import { SweepyDock } from '@sweepy-bot/sweepy-dock';
import Discord from 'discord.js';
import express from 'express';
import querystring from 'querystring';

const client = new Discord.Client();
const dock = new SweepyDock(client);

const TOKEN = process.env.DISCORD_BOT_TOKEN;

if (process.env) {
  if (TOKEN == null || TOKEN.length < 1) {
    console.log('DISCORD_BOT_TOKENが設定されていません。');
    process.exit(0);
  }
}

const app = express();
const PORT = 3000;

app.get('/', (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Discord Bot is active now\n');
});

app.post('/', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    if (!data) {
      res.end('No post data');
      return;
    }
    const dataObject = querystring.parse(data);
    console.group('Server Requested');
    console.log('post:' + dataObject.type.toLocaleString());
    if (dataObject.type === 'wake') {
      console.log('Woke up in post');
      if (client.readyTimestamp) {
        console.log(`yay, and I'm alive since: ${client.readyTimestamp}`);
      } else {
        console.log("but I'm dead");
      }
      res.end();
    } else {
      res.end();
    }
    console.groupEnd();
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
dock.start(TOKEN).catch((reason) => {
  console.group('ログインに問題がありました');
  console.info(reason);
  console.groupEnd();
  process.exit(0);
});
