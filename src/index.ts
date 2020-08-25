import express from 'express';
import querystring from 'querystring';
import Discord from 'discord.js';
import { AnswerTalker } from './answer_talker';
import { emojinate } from './emojinate';
import cheatsheets from '../data/cheatsheet.json';
import { Critter } from './critter';

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

const getCustomEmoji = (cache: Discord.Collection<string, Discord.GuildEmoji>, name: string): Discord.Emoji => {
  return cache.find(v => v.name === name);
};

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
  options?: Discord.MessageOptions;
};

const findEmoji = (name: string): Discord.Emoji => {
  return getCustomEmoji(client.emojis.cache, name);
};

const blankField = (inline: boolean = false) => {
  return { name: '\u200B', value: '\u200B', inline };
};

const critterInfoEmbed = (name: string): Response => {
  const sadSweepyEmoji = findEmoji('sadsweepy');
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
      value: `**${critter.livableTemp.lower} 〜 ${critter.livableTemp.upper}** _℃_`,
      inline: true,
    },
    {
      name: `${findEmoji('decord')} 装飾値`,
      value: `**${critter.decor.value}** (**${critter.decor.radius}** _tile_)`,
      inline: true,
    },
    {
      name: `${findEmoji('calories')} カロリー消費`,
      value: (() => {
        let calorie = critter.caloriesNeeded;
        if (calorie < 1000) {
          return `**${calorie}** _cal/s_`;
        }
        return `**${calorie / 1000}** _kcal/s_`;
      })(),
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
      value: `**${critter.spaceRequired}** _/tile_`,
      inline: true,
    });
  }
  if (critter.layAnEgg != null) {
    fields.push({
      name: ':egg: 産卵ペース',
      value: `**${critter.layAnEgg / 600}** _cycle_`,
      inline: true,
    });
  }
  if (critter.hatches != null) {
    fields.push({
      name: `${findEmoji('joydupe')} 孵化するまで`,
      value: `**${critter.hatches / 600}** _cycle_`,
      inline: true,
    });
  }
  if (critter.lifeSpan != null) {
    fields.push({
      name: `${findEmoji('grave')} 寿命`,
      value: `**${critter.lifeSpan / 600}** _cycle_`,
      inline: true,
    });
  }
  if (critter.lightEmitter != null) {
    fields.push({
      name: ':high_brightness: 光源効果',
      value: `**${critter.lightEmitter.lux}** _lux_ (**${critter.lightEmitter.range}** _tile_)`,
      inline: true,
    });
  }
  if (fields.length > 3 && fields.length % 3 === 0) {
    fields.push(blankField(true));
  }
  const flavorText = critter.flavorText.ja || critter.flavorText.en;
  const critterName = critter.name.ja || critter.name.en;
  const embed: Discord.MessageEmbedOptions = {
    author: {
      name: critterName,
      iconURL: critter.imageURL,
    },
    title: `_${critter.name.en}_`,
    url: `https://oni-db.com/details/${critter.id}`,
    color: 0x0099FF,
    thumbnail: { url: critter.imageURL },
    description: `_${flavorText}_`,
    fields,
    footer: {
      text: 'Sweepy Bot',
      iconURL: client.user.avatarURL(),
    },
    timestamp: new Date(),
  };
  return {
    content: `:bulb: _**${critter.name.ja}** は知ってるよ_`,
    options: { embed },
  };
};

const helpInfoEmbed = (): Response => {
  const sweepyEmoji = findEmoji('sweepy');
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

function getMessage(context: string): Response {
  // ヘルプタグ
  if (context.match(/^\!help/)) {
    return helpInfoEmbed();
  }

  // チートシート一覧
  if (context.match(/^\!cheatsheet\s?$/)) {
    return {
      content: cheatsheetCommand.getKeywords(),
      options: {},
    };
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
    return critterInfoEmbed(critterName.groups.arg);
  }
}

function sendReply(message: Discord.Message, content: string): void {
  message
    .reply(content)
    .then((_result: Discord.Message) => {
      console.log('リプライ送信: ' + content);
    })
    .catch(console.error);
}

function sendMsg(channelId: Discord.ChannelResolvable, content: string, options: Discord.MessageOptions = {}): void {
  (client.channels
    .resolve(channelId) as Discord.TextChannel)
    .send(content, options)
    .then((_result: Discord.Message) => {
      console.log('メッセージ送信: ' + content + ' ' + JSON.stringify(options));
    })
    .catch(console.error);
}

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
