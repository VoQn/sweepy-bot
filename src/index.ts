import http from 'http';
import querystring from 'querystring';
import { Client, ChannelResolvable, TextChannel, Message, MessageOptions, GuildChannel } from 'discord.js';
import { AnswerTalker, Dictionary, Entry } from './answer_talker';
import { emojinate } from './emojinate';
import cheetsheets from '../data/cheetsheet.json';
import emoji from '../data/emoji.json';

const client = new Client();

const commands = [
  {
    command: '!help',
    get help(): string {
      return `\`${this.command}\` _応えられるコマンド一覧を出すよ_`;
    },
  },
  {
    command: '!cheetsheets',
    get help(): string {
      return `\`${this.command}\` _チートシート一覧を出すよ_`;
    },
  },
  {
    command: '!cheetsheet',
    get help(): string {
      return `\`${this.command} <スペース> <キーワード> \` _応えられる範囲で答えるよ_`;
    },
  },
  {
    command: '!emoji',
    get help(): string {
      return `\`${this.command} <スペース> <絵文字>\` _あるなら絵文字コード答えるよ_`;
    },
  },
  {
    command: '!emoji-echo',
    get help(): string {
      return `\`${this.command} <スペース> <アルファベット>\` ${emojinate(
        'emoji',
      )} _に変換するよ_`;
    },
  },
];

const cheetsheetCommand = new AnswerTalker(Object.values(cheetsheets), 'name', 'url');

const emojis = Object.entries(emoji).map(([code, name]) => {
  return { name, code };
});

const emojiCommand = new AnswerTalker(
  emojis as Dictionary,
  'name',
  'code',
  getCustomEmojiMessage,
);

function getCustomEmojiMessage(code: string): string {
  return (
    client.emojis.cache.find(emoji => emoji.name === code).toString() +
    ' ' +
    `\`:${code}:\``
  );
}

http
  .createServer((req, res) => {
    if (req.method === 'POST') {
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
    } else if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Discord Bot is active now\n');
    }
  })
  .listen(3000);

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
  const channel: GuildChannel = member.guild.channels.cache.find(
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

  (channel as TextChannel)
    .send(text)
    .then(() => {
      console.log('メッセージ送信: ' + text + JSON.stringify({}));
    })
    .catch(console.error);
});

client.on('message', message => {
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

  const msg = getMessage(message.content);
  // 空メッセージを送らないようにする
  if (msg && msg.length > 0) {
    sendMsg(message.channel.id, msg);
  }
  return;
});

function getMessage(context: string): string {
  // ヘルプタグ
  if (context.match(/^\!help/)) {
    let msg = `${emojinate('About')}\n`;
    commands.forEach(c => {
      msg += `${c.help}\n`;
    });
    return msg;
  }

  // タグ一覧
  if (context.match(/^\!cheetsheets/)) {
    return cheetsheetCommand.getKeywords();
  }

  // タグの返答
  const m = context.match(/^\!cheetsheet\s+(?<arg>\S+)/);
  if (m) {
    return cheetsheetCommand.getAnswer(m.groups.arg);
  }

  // 絵文字一覧
  if (context.match(/^\!emoji$/)) {
    return emojiCommand.getKeywords();
  }

  // 絵文字の返答
  const e = context.match(/^\!emoji\s+(?<arg>\S+)/);
  if (e) {
    return emojiCommand.getAnswer(e.groups.arg);
  }

  // emoji-echo
  const test = context.match(/^\!emoji-echo\s+(?<arg>.+)$/);
  if (test) {
    return emojinate(test.groups.arg);
  }
}

function sendReply(message: Message, text: string): void {
  message
    .reply(text)
    .then((_result: Message) => {
      console.log('リプライ送信: ' + text);
    })
    .catch(console.error);
}

function sendMsg(channelId: ChannelResolvable, text: string, option: MessageOptions = {}): void {
  (client.channels
    .resolve(channelId) as TextChannel)
    .send(text, option)
    .then((_result: Message) => {
      console.log('メッセージ送信: ' + text + JSON.stringify(option));
    })
    .catch(console.error);
}

// ログインしてこなくなったら確認する
// client.on("debug", d => {
//   console.debug(d);
// });

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
