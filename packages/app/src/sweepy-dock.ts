import Discord, {
  PresenceData,
  Message,
  GuildMember,
  Client,
} from 'discord.js';
import { Command } from './commands';
import { emojinate } from './emojinate';
import { parseCommand } from './parser';

export class SweepyDock {
  public static loginedPresence: PresenceData = {
    activity: {
      name: 'みんなの !help ',
      type: 'WATCHING',
    },
    status: 'online',
  };

  constructor(client?: Client) {
    this.client = client;
    if (client) {
      this.client.once('ready', () => void this.onReady());
      this.client.on(
        'message',
        (message: Message) => void this.onMessage(message),
      );
      this.client.on(
        'guildMemberAdd',
        (member: GuildMember) => void this.onJoinNewMember(member),
      );
    }
  }

  private client: Discord.Client;

  async start(token: string): Promise<boolean> {
    console.log('Login Discord Client...');
    await this.client.login(token);
    return true;
  }

  async onReady(): Promise<void> {
    await this.client.user.setPresence(SweepyDock.loginedPresence);
    console.log('Sweepy bot is alive.');
  }

  async onMessage(message: Message): Promise<void> {
    if (message.author.id === this.client.user.id || message.author.bot) {
      return;
    }
    const options = {
      ignoreRoles: true,
      ignoreEveryone: true,
    };
    if (message.mentions.has(this.client.user, options)) {
      console.group(
        `${message.author.username} から以下のようなメッセージが来ました。`,
      );
      console.log(message.content);
      console.groupEnd();
      const replayMessage = '人生を満喫中さ、わかるだろ？';
      await message.reply(replayMessage);
      console.group(`${message.author.username} に返信しました。`);
      console.log(replayMessage);
      console.groupEnd();
    }
    const cmd = parseCommand(message.content);
    const res = Command.eval(message.content, this.client);
    if (res == null || res.content == null) {
      if (cmd != null) {
        // コマンドとしてパースできたけれど実行されていない。
      }
      return;
    }
    if (res.content.length > 1 || Object.keys(res.options).length > 0) {
      // 何かしら返信するモノがある。
      console.group(
        `${message.author.username} から以下のようなメッセージが来ました。`,
      );
      console.log(message.content);
      console.groupEnd();
      await message.channel.send(res.content, res.options);
      console.group(`${message.author.username} に返信しました。`);
      if (res.content != null && res.content.length > 1) {
        console.log(res.content);
      }
      if (res.options != null && Object.keys(res.options).length > 0) {
        console.log(JSON.stringify(res.options));
      }
      console.groupEnd();
    }
  }

  async onJoinNewMember(member: GuildMember): Promise<void> {
    const welcomeChannelName = 'welcome';
    // send the message to a designated channel on a server:
    const channel: Discord.GuildChannel = member.guild.channels.cache.find(
      (ch) => ch.name === welcomeChannelName,
    );
    // do nothing if the channel wasn't found on this server
    if (!channel || channel.type !== 'text') {
      return;
    }

    const text = [
      `${emojinate('welcome')}`,
      `ようこそ ${member.user.username} 非公式日本語ディスコードサーバーへ！`,
      `まずは #${welcomeChannelName} チャンネルで自己紹介してみてね！`,
      `${emojinate('caution')}`,
      '**サーバーに入りたての時は、まだ色んなチャンネルを見ることは出来ません。**',
      "_'承認済み' のロールが与えられたら、インフォメーション以外のカテゴリも読めるようになります。_",
    ].join('\n');

    await (channel as Discord.TextChannel).send(text).catch((reason) => {
      console.error(reason);
    });
    console.log('メッセージ送信: ' + text + JSON.stringify({}));
  }
}
