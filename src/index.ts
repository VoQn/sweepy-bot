import express from 'express';
import querystring from 'querystring';
import Discord, { Client } from 'discord.js';
import { emojinate } from './emojinate';
import { Critter } from './critter';
import { Response } from './types';
import { getCustomEmoji } from './utils';
import { SweepyDock } from './sweepy-dock';
import { parseCommand } from './parser';

const client = new Discord.Client();

type CommandCategory = 'general' | 'oni' | 'misc';
const categoryOrder: CommandCategory[] = ['general', 'oni', 'misc'];

interface Command {
  category: CommandCategory;
  name: string;
  help: {
    summery: string;
    description?: string;
  };
  exec: (client: Discord.Client, args: string) => Response;
}

// tslint:disable-next-line: no-shadowed-variable
const helpInfoEmbed = (commands: Map<string, Command>, client: Client): Response => {
  const emoji = (emojiName: string) => getCustomEmoji(client, emojiName);
  const sweepyEmoji = emoji('sweepy');
  const sweepyIcon = client.user.avatarURL();
  const fields = sortedCommandList(commands).map(c => {
    return {
      name: `:arrow_forward: ${c.name}`,
      value: c.help.summery,
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

const commands = new Map<string, Command>();
commands.set('help', {
  category: 'general',
  name: 'Help',
  help: {
    summery: '_このコマンドだよ。応えられるコマンド一覧を出すよ_\n' +
      '```!help```',
  },
  // tslint:disable-next-line: no-shadowed-variable
  exec: (client, _args) => helpInfoEmbed(commands, client),
});

commands.set('cheatsheet', {
  category: 'oni',
  name: 'CheatSheet',
  help: {
    summery: '_キーワードにマッチしたチートシート出すよ。何も指定してなかったらとりあえず一覧リストを出すよ_\n' +
      '```!cheatsheet 液体の比重```',
  },
  exec: (client, args) => {

  }
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

commands.set('critter', {
  category: 'oni',
  name: 'Critter',
  help: {
    summery: '_知ってる動物の詳細を教えるよ。部分的でも連想は出来るよ_\n' +
      '```!critter プリンス```',
  },
  // tslint:disable-next-line: no-shadowed-variable
  exec: critterInfoEmbed,
});

commands.set('emojinate', {
  category: 'misc',
  name: 'Emojinate',
  help: {
    summery: `_出来るだけ_ ${emojinate('emoji')} _に変換するよ_\n` +
      '```!emojinate 今からliveやります!```',
  },
  exec: (_client, args) => ({
    content: emojinate(args),
    options: {},
  }),
});

const cmpCommand = (a: Command, b: Command) => {
  const ai = categoryOrder.indexOf(a.category);
  const bi = categoryOrder.indexOf(b.category);
  if (ai !== bi) {
    return ai - bi;
  }
  const an = a.name.toUpperCase();
  const bn = b.name.toUpperCase();
  if (an < bn) {
    return -1;
  }
  if (an > bn) {
    return 1;
  }
  return 0;
};

const sortedCommandList = (cmds: Map<string, Command>) => {
  const ret: Command[] = [];
  for (const cmd of commands.values()) {
    ret.push(cmd);
  }
  return ret.sort(cmpCommand);
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
  } catch (e) {
    // 暫定処置!
    // onMessageで出た Error(not-implemented-error)は握りつぶして、getMessageに任せる
    // console.error(e);

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
const getMessage = (client: Client, context: string): Response => {
  const tst = parseCommand(context);
  if (tst == null || !commands.has(tst.command)) {
    return null;
  }
  const command = commands.get(tst.command);
  return command.exec(client, tst.args);
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
