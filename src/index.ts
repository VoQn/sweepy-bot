import express from 'express';
import querystring from 'querystring';
import Discord from 'discord.js';
import { SweepyDock } from './sweepy-dock';

const client = new Discord.Client();
const dock = new SweepyDock(client);

if (process.env) {
  const TOKEN = process.env.DISCORD_BOT_TOKEN;
  if (TOKEN == null || TOKEN.length < 1) {
    console.log('DISCORD_BOT_TOKENが設定されていません。');
    process.exit(0);
  }
  dock.start(TOKEN);
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
    console.log('post:' + dataObject.type);
    if (dataObject.type === 'wake') {
      console.log('Woke up in post');
      if (client.readyTimestamp) {
        console.log('yay, and I\'m alive since:' + client.readyTimestamp);
      } else {
        console.log('but I\'m dead');
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
