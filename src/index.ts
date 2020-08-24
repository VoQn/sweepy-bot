import http from 'http';
import querystring from 'querystring';
// tslint:disable-next-line: max-line-length
import { Client, ChannelResolvable, TextChannel, Message, MessageOptions, GuildChannel, MessageEmbedOptions, Collection, GuildEmoji, Emoji } from 'discord.js';
import { AnswerTalker, Dictionary } from './answer_talker';
import { emojinate } from './emojinate';
import cheetsheets from '../data/cheetsheet.json';
import emojis from '../data/emoji.json';
import { Critter } from './critter';

const client = new Client();

const commands = [
  {
    command: '!help',
    help: '`!help` _応えられるコマンド一覧を出すよ_',
  },
  {
    command: '!cheetsheets',
    help: '`!cheetsheets` _チートシート一覧を出すよ_',
  },
  {
    command: '!cheetsheet',
    help: '`!cheetsheet <スペース> <キーワード>` _あったらチートシート出すよ_',
  },
  {
    command: '!critter',
    help: '`!critter <スペース> <動物の名前>` _知ってる動物の詳細を教えるよ_',
  },
  {
    command: '!emoji',
    help: '`!emoji <スペース> <絵文字>` _あるなら絵文字コード答えるよ_',
  },
  {
    command: '!emoji-echo',
    help: `\`!emoji-echo <スペース> <アルファベット>\` ${emojinate('emoji')} _に変換するよ_`,
  },
];

const cheetsheetCommand = new AnswerTalker(Object.values(cheetsheets), 'name', 'url');

const emojis2 = Object.entries(emojis).map(([code, name]) => {
  return { name, code };
});

const emojiCommand = new AnswerTalker(
  emojis2 as Dictionary,
  'name',
  'code',
  getCustomEmojiMessage,
);

const getCustomEmoji = (cache: Collection<string, GuildEmoji>, name: string): Emoji => {
  return cache.find(v => v.name === name);
};

function getCustomEmojiMessage(code: string): string {
  const emoji = client.emojis.cache.find(e => e.name === code);
  if (emoji) {
    return `${emoji} \`:${code}:\``;
  }
  return '';
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
  if (msg == null) {
    return;
  }
  if (msg.content && msg.content.length > 0) {
    sendMsg(message.channel.id, msg.content, msg.options);
  }

  return;
});

type Response = {
  content: string;
  options?: MessageOptions;
};

function getMessage(context: string): Response {
  // ヘルプタグ
  if (context.match(/^\!help/)) {
    let msg = `${emojinate('About')}\n`;
    commands.forEach(c => {
      msg += `${c.help}\n`;
    });
    return { content: msg, options: {} };
  }

  // タグ一覧
  if (context.match(/^\!cheetsheets/)) {
    return { content: cheetsheetCommand.getKeywords(), options: {} };
  }

  // タグの返答
  const m = context.match(/^\!cheetsheet\s+(?<arg>\S+)/);
  if (m) {
    return { content: cheetsheetCommand.getAnswer(m.groups.arg), options: {} };
  }

  // 絵文字一覧
  if (context.match(/^\!emoji$/)) {
    return { content: emojiCommand.getKeywords(), options: {} };
  }

  // 絵文字の返答
  const e = context.match(/^\!emoji\s+(?<arg>\S+)/);
  if (e) {
    return { content: emojiCommand.getAnswer(e.groups.arg), options: {} };
  }

  // emoji-echo
  const test = context.match(/^\!emoji-echo\s+(?<arg>.+)$/);
  if (test) {
    return { content: emojinate(test.groups.arg), options: {} };
  }

  const critterName = context.match(/^\!critter\s+(?<arg>.+)$/);
  if (critterName) {
    const findEmoji = (name: string) => {
      return getCustomEmoji(client.emojis.cache, name);
    };
    const critter = Critter.findByName(critterName.groups.arg);
    if (critter == null) {
      return {
        content: `${findEmoji('sadsweepy')} _まだその動物は知らないや……_`,
        options: {},
      };
    }
    const fields = [
      {
        name: 'DataBase Link (_oni-db.com_)',
        value: `:point_up: 詳細は[oni-db.com](https://oni-db.com/details/${critter.id})を見てね`,
      },
      {
        name: `:secret: 内部名`,
        value: `\`${critter.id}\``,
        inline: true,
      },
      {
        name: `${findEmoji(critter.emojiName)} Emoji`,
        value: `\`${critter.emojiCode}\``,
        inline: true,
      },
      {
        name: `${findEmoji('oni_thermometer')} 生存可能体温`,
        value: `**${critter.livableTemp.lower} 〜 ${critter.livableTemp.upper}** _(℃)_`,
        inline: true,
      },
      {
        name: `${findEmoji('decord')} 装飾値`,
        value: `**${critter.decor.value}** _(半径 **${critter.decor.radius}** タイル)_`,
        inline: true,
      },
      {
        name: `${findEmoji('calories')} カロリー消費`,
        value: `**${critter.caloriesNeeded}** _(cal/s)_`,
        inline: true,
      },
      {
        name: ':heart: HP',
        value: `**${critter.hitPoint}**`,
        inline: true,
      },
    ];
    if (critter.spaceRequired != null) {
      fields.push({
        name: ':u6e80: 過密判定',
        value: critter.spaceRequired != null ? `**${critter.spaceRequired}** _タイル_` : 'N/A',
        inline: true,
      });
    }
    const embedData: MessageEmbedOptions = {
      author: {
        name: critter.name.ja,
        iconURL: critter.imageURL,
      },
      title: `_${critter.name.en}_`,
      url: `https://oni-db.com/details/${critter.id}`,
      color: 0x0099FF,
      thumbnail: { url: critter.imageURL },
      description: `_${critter.flavorText.ja || critter.flavorText.en}_`,
      fields,
      footer: {
        text: 'Sweepy Bot',
        iconURL: client.user.avatarURL(),
      },
      timestamp: new Date(),
    };
    return { content: `:bulb: _**${critter.name.ja}** は知ってるよ_`, options: { embed: embedData } };
  }
}

function sendReply(message: Message, content: string): void {
  message
    .reply(content)
    .then((_result: Message) => {
      console.log('リプライ送信: ' + content);
    })
    .catch(console.error);
}

function sendMsg(channelId: ChannelResolvable, content: string, options: MessageOptions = {}): void {
  (client.channels
    .resolve(channelId) as TextChannel)
    .send(content, options)
    .then((_result: Message) => {
      console.log('メッセージ送信: ' + content + ' ' + JSON.stringify(options));
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
