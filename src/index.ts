import http from 'http';
import querystring from 'querystring';
import { Client, ChannelResolvable, TextChannel, Message, MessageOptions, GuildChannel, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import { AnswerTalker, Dictionary, Entry } from './answer_talker';
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

  const { content, options } = getMessage(message.content);
  // 空メッセージを送らないようにする
  if (content && content.length > 0) {
    sendMsg(message.channel.id, content, options);
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
    const critter = Critter.findByName(critterName.groups.arg);
    if (critter == null) {
      const sadEmoji = client.emojis.cache.find(c => c.name === 'sadsweepy');
      return { content: `${sadEmoji} まだその動物は知らないや……`, options: {} };
    }
    const emoji = client.emojis.cache.find(c => critter.emojiName === c.name);
    const emojiDeco = client.emojis.cache.find(c => 'decord' === c.name);
    const emojiCal = client.emojis.cache.find(c => 'calories' === c.name);
    const embedData: MessageEmbedOptions = {
      author: {
        name: 'Critter Details',
        iconURL: critter.imageURL,
      },
      title: `**${critter.name.ja}** _${critter.name.en}_`,
      url: `https://oni-db.com/details/${critter.id}`,
      color: 0x0099FF,
      thumbnail: { url: critter.imageURL },
      description: `:point_up: 詳細は[oni-db.com](https://oni-db.com/details/${critter.id})を見てね`,
      fields: [
        { name: `:secret: 内部名`, value: `\`${critter.id}\``, inline: true },
        { name: `${emoji} Emoji Code`, value: `\`${critter.emojiCode}\``, inline: true },
        { name: ':thermometer: Livable Temp', value: `**${critter.livableTemp.lower} 〜 ${critter.livableTemp.upper}**_(℃)`, inline: true },
        { name: `${emojiDeco} 装飾値`, value: `**${critter.decor.value}** _(半径 ${critter.decor.radius})_`, inline: true },
        { name: `${emojiCal} カロリー消費`, value: `**${critter.caloriesNeeded}** _(cal/s)_`, inline: true },
        { name: ':heart: HP', value: `**${critter.hitPoint}**`, inline: true },
        { name: ':u6e80: 過密判定', value: critter.spaceRequired != null ? `**${critter.spaceRequired}** _タイル_` : 'N/A', inline: true },
      ],
      footer: {
        text: 'Sweepy Bot',
        iconURL: client.user.avatarURL(),
      },
      timestamp: new Date(),
    };
    return { content: `${critter.name.ja} は知ってるよ`, options: { embed: embedData } };
  }
}

function sendReply(message: Message, content: string): void {
  message
    .reply(content)
    .then((_result: Message) => {
      const stringfiedContent = (typeof content === 'string') ? content : JSON.stringify(content);
      console.log('リプライ送信: ' + stringfiedContent);
    })
    .catch(console.error);
}

function sendMsg(channelId: ChannelResolvable, content: string, options: MessageOptions = {}): void {
  (client.channels
    .resolve(channelId) as TextChannel)
    .send(content, options)
    .then((_result: Message) => {
      const stringfiedContent = (typeof content === 'string') ? content : JSON.stringify(content);
      console.log('メッセージ送信: ' + stringfiedContent + JSON.stringify(options));
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
