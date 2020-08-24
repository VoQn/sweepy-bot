import http from 'http';
import querystring from 'querystring';
// tslint:disable-next-line: max-line-length
import { Client, ChannelResolvable, TextChannel, Message, MessageOptions, GuildChannel, MessageEmbedOptions, Collection, GuildEmoji, Emoji, MessageEmbed } from 'discord.js';
import { AnswerTalker } from './answer_talker';
import { emojinate } from './emojinate';
import cheatsheets from '../data/cheatsheet.json';
import { Critter } from './critter';

const client = new Client();

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

const getCustomEmoji = (cache: Collection<string, GuildEmoji>, name: string): Emoji => {
  return cache.find(v => v.name === name);
};

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

const findEmoji = (name: string) => {
  return getCustomEmoji(client.emojis.cache, name);
};

function getMessage(context: string): Response {
  // ヘルプタグ
  if (context.match(/^\!help/)) {
    const content = `:information_source:  ${findEmoji('sweepy')} _が答えるよ_`;
    const sweepyIcon = client.user.avatarURL();
    const fields = commands.map(c => {
      return {
        name: `:arrow_forward: ${c.command}`,
        value: c.help,
      };
    });
    let embed = new MessageEmbed()
      .setColor(0xfc6600)
      .setAuthor('Sweepy Bot', sweepyIcon)
      .setTitle(emojinate('about'))
      .setThumbnail(sweepyIcon)
      .setDescription('_テキストチャットのログを読んで、行頭の_ `!` _で始まる各コマンドに応答します。_')
      .addFields(fields)
      .setFooter('Sweepy Bot', sweepyIcon)
      .setTimestamp();
    return { content, options: { embed } };
  }

  // チートシート一覧
  if (context.match(/^\!cheatsheet\s?$/)) {
    return { content: cheatsheetCommand.getKeywords(), options: {} };
  }

  // チートシートの返答
  const m = context.match(/^\!cheatsheet\s+(?<arg>\S+)/);
  if (m) {
    return { content: cheatsheetCommand.getAnswer(m.groups.arg), options: {} };
  }

  // emoji-echo
  const test = context.match(/^\!emojinate\s+(?<arg>.+)$/ms);
  if (test) {
    return { content: emojinate(test.groups.arg), options: {} };
  }

  const critterName = context.match(/^\!critter\s+(?<arg>.+)$/);
  if (critterName) {
    const matched = critterName.groups.arg;
    if (matched.length < 2) {
      return {
        content: `${findEmoji('sadsweepy')} _**2文字以上で聞いてね**_`,
        options: {},
      };
    }
    const critter = Critter.findByName(matched);
    if (critter == null) {
      return {
        content: `${findEmoji('sadsweepy')} _まだその動物は知らないや……_`,
        options: {},
      };
    }
    const fields = [
      {
        name: ':globe_with_meridians: DataBase Link (_oni-db.com_)',
        value: `:point_up: 詳細は[oni-db.com](https://oni-db.com/details/${critter.id})を見てね`,
      },
      {
        name: `:secret: 内部名`,
        value: `\`${critter.id}\``,
        inline: true,
      },
      {
        name: `${findEmoji('oni_thermometer')} 生存可能体温`,
        value: `**${critter.livableTemp.lower} 〜 ${critter.livableTemp.upper}** _(℃)_`,
        inline: true,
      },
      {
        name: `${findEmoji('decord')} 装飾値`,
        value: `**${critter.decor.value}** 半径 **${critter.decor.radius}** _タイル_`,
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
    const critterEmoji = findEmoji(critter.emojiName);
    if (critterEmoji) {
      fields.splice(2, 0, {
        name: `${critterEmoji} Emoji`,
        value: `\`${critter.emojiCode}\``,
        inline: true,
      });
    }
    if (critter.spaceRequired != null) {
      fields.push({
        name: ':u6e80: 過密判定',
        value: `**${critter.spaceRequired}** _タイル_`,
        inline: true,
      });
    }
    if (critter.layAnEgg != null) {
      fields.push({
        name: ':egg: 産卵ペース',
        value: `**${critter.layAnEgg / 600}** _サイクル_`,
        inline: true,
      });
    }
    if (critter.hatches != null) {
      fields.push({
        name: `${findEmoji('joydupe')} 孵化するまで`,
        value: `**${critter.hatches / 600}** _サイクル_`,
        inline: true,
      });
    }
    if (critter.lifeSpan != null) {
      fields.push({
        name: `${findEmoji('grave')} 寿命`,
        value: `**${critter.lifeSpan / 600}** _サイクル_`,
        inline: true,
      });
    }
    if (critter.lightEmitter != null) {
      fields.push({
        name: ':high_brightness: 光源効果',
        value: `**${critter.lightEmitter.lux}** 半径 **${critter.lightEmitter.range}** _タイル_`,
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
