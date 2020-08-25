import express from 'express';
import querystring from 'querystring';
import Discord, { Client } from 'discord.js';
import { AnswerTalker } from './answer_talker';
import { emojinate } from './emojinate';
import cheatsheets from '../data/cheatsheet.json';
import { Critter } from './critter';
import { Response } from './types';
import { getCustomEmoji } from './utils';
import { SweepyDock } from './sweepy-dock';

const client = new Discord.Client();

const commands = [
  {
    command: 'Help',
    help: '_このコマンドだよ。応えられるコマンド一覧を出すよ_\n' +
      '```!help```',
  },
  {
    command: 'CheatSheet',
    help: '_キーワードにマッチしたチートシート出すよ。何も指定してなかったらとりあえず一覧リストを出すよ_\n' +
      '```!cheatsheet 液体の比重```',
  },
  {
    command: 'Critter',
    help: '_知ってる動物の詳細を教えるよ。部分的でも連想は出来るよ_\n' +
      '```!critter プリンス```',
  },
  {
    command: 'Emojinate',
    help: `_出来るだけ_ ${emojinate('emoji')} _に変換するよ_\n` +
      '```!emojinate 今からliveやります!```',
  },
];

const cheatsheetCommand = new AnswerTalker(Object.values(cheatsheets), 'name', 'url');

client.on('ready', () => {
  console.log(`Bot準備完了`);
  client.user.setPresence({
    activity: { name: '皆さんからの !help ', type: 'WATCHING' },
    status: 'online',
  });
});

// 新しく誰かがサーバーに入った時に挨拶する
client.on('guildMemberAdd', member => {
  // send the message to a designated channel on a server:
  const channel: Discord.GuildChannel = member.guild.channels.cache.find(
    ch => ch.name === 'welcome',
  );
  // do nothing if the channel wasn't found on this server
  if (!channel || channel.type !== 'text') {
    return;
  }

  const text = `${emojinate('welcome')}
ようこそ ${member} 非公式日本語ディスコードサーバーへ！
まずはこの #welcome チャンネルで自己紹介してみてね！
${emojinate('caution')}
**サーバーに入りたての時は、まだ色んなチャンネルを見ることは出来ません。**
_'承認済み' のロールが与えられたら、インフォメーション以外のカテゴリも読めるようになります。_`;

  (channel as Discord.TextChannel)
    .send(text)
    .then(() => {
      console.log('メッセージ送信: ' + text + JSON.stringify({}));
    })
    .catch(console.error);
});

const dock = new SweepyDock(null);

client.on('message', async message => {
  if (message.author.id === client.user.id || message.author.bot) {
    return;
  }
  if (
    message.mentions.has(client.user, {
      ignoreRoles: true,
      ignoreEveryone: true,
    })
  ) {
    sendReply(message, '人生を満喫中さ、わかるだろ？');
    return;
  }

  try {
    await dock.onMessage(message);
  } catch(e) {
    const msg = getMessage(client, message.content);
    // 空メッセージを送らないようにする
    if (msg == null) {
      return;
    }
    if (msg.content && msg.content.length > 0) {
      sendMsg(message.channel.id, msg.content, msg.options);
    }
  }
  return;
});

// tslint:disable-next-line: no-shadowed-variable
const critterInfoEmbed = (client: Client, name: string): Response => {
  const emoji = (emojiName: string) => getCustomEmoji(client, emojiName);
  const sadSweepyEmoji = emoji('sadsweepy');
  if (name.length < 2) {
    return {
      content: `${sadSweepyEmoji} _**2文字以上で聞いてね**_`,
      options: {},
    };
  }
  const critter = Critter.findByName(name);
  if (critter == null) {
    return {
      content: `${sadSweepyEmoji} _まだその動物は知らないや……_`,
      options: {},
    };
  }
  return critter.detailEmbed(client);
};

// tslint:disable-next-line: no-shadowed-variable
const helpInfoEmbed = (client: Client): Response => {
  const emoji = (emojiName: string) => getCustomEmoji(client, emojiName);
  const sweepyEmoji = emoji('sweepy');
  const sweepyIcon = client.user.avatarURL();
  const fields = commands.map(c => {
    return {
      name: `:arrow_forward: ${c.command}`,
      value: c.help,
    };
  });

  const embed: Discord.MessageEmbedOptions = {
    author: {
      name: 'Sweepy Not',
      iconURL: sweepyIcon,
    },
    color: 0xfc6600,
    title: emojinate('about'),
    thumbnail: { url: sweepyIcon },
    description: '_テキストチャットのログを読んで、行頭の_ `!` _で始まる各コマンドに応答します。_',
    fields,
    footer: {
      text: 'Sweepy Bot',
      iconURL: sweepyIcon,
    },
    timestamp: new Date(),
  };

  return {
    content: `:information_source:  ${sweepyEmoji} _が答えるよ_`,
    options: { embed },
  };
};

// tslint:disable-next-line: no-shadowed-variable
const getMessage = (client: Client, context: string): Response => {
  // ヘルプタグ
  if (context.match(/^\!help/)) {
    return helpInfoEmbed(client);
  }

  // チートシートの返答
  const cheatsheetName = context.match(/^\!cheatsheet\s+(?<arg>\S+)/);
  if (cheatsheetName) {
    return {
      content: cheatsheetCommand.getAnswer(cheatsheetName.groups.arg),
      options: {},
    };
  }

  // emojinate
  const emojinateText = context.match(/^\!emojinate\s+(?<arg>.+)$/ms);
  if (emojinateText) {
    return {
      content: emojinate(emojinateText.groups.arg),
      options: {},
    };
  }

  // critter
  const critterName = context.match(/^\!critter\s+(?<arg>.+)$/);
  if (critterName) {
    return critterInfoEmbed(client, critterName.groups.arg);
  }
};

const sendReply = (message: Discord.Message, content: string): void => {
  message
    .reply(content)
    .then((_result: Discord.Message) => {
      console.log('リプライ送信: ' + content);
    })
    .catch(console.error);
};

const sendMsg = (channelId: Discord.ChannelResolvable, content: string, options: Discord.MessageOptions = {}): void => {
  (client.channels
    .resolve(channelId) as Discord.TextChannel)
    .send(content, options)
    .then((_result: Discord.Message) => {
      console.log('メッセージ送信: ' + content + ' ' + JSON.stringify(options));
    })
    .catch(console.error);
};

if (process.env) {
  const TOKEN = process.env.DISCORD_BOT_TOKEN;
  if (TOKEN == null || TOKEN.length < 1) {
    console.log('DISCORD_BOT_TOKENが設定されていません。');
    process.exit(0);
  }

  console.log('Discord クライアントをログインさせます...');

  client.login(TOKEN).catch((e) => {
    console.log(e);
  });
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
