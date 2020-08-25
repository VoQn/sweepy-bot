import Discord, { PresenceData, Message, GuildMember, Client, Presence } from 'discord.js';
import { Command } from './commands';
import { emojinate } from './emojinate';

export class SweepyDock {
  public static loginedPresence: PresenceData = {
    activity: {
      name: '皆さんからの !help ',
      type: 'WATCHING',
    },
    status: 'online',
  };

  constructor(client?: Client) {
    this.client = client;
    if (client) {
      this.client.once('ready', () => this.onReady());
      this.client.on('message', (message: Message) => this.onMessage(message));
      this.client.on('guildMemberAdd', (member: GuildMember) => this.onJoinNewMember(member));
    }
  }

  private client: Discord.Client;

  async start(token: string): Promise<string> {
    console.log('Login Discord Client...');
    return this.client.login(token);
  }

  async onReady(): Promise<Presence> {
    let res = await this.client.user.setPresence(SweepyDock.loginedPresence);
    console.log('Sweepy bot is alive.');
    return res;
  }

  async onMessage(message: Message): Promise<Message> {
    if (message.author.id === this.client.user.id || message.author.bot) {
      return;
    }
    const options = {
      ignoreRoles: true,
      ignoreEveryone: true,
    };
    if (message.mentions.has(this.client.user, options)) {
      return message.reply('人生を満喫中さ、わかるだろ？');
    }
    const res = Command.eval(message.content, this.client);
    return message.channel.send(res.content, res.options);
  }

  async onJoinNewMember(member: GuildMember): Promise<void> {
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
まずは #welcome チャンネルで自己紹介してみてね！
${emojinate('caution')}
**サーバーに入りたての時は、まだ色んなチャンネルを見ることは出来ません。**
_'承認済み' のロールが与えられたら、インフォメーション以外のカテゴリも読めるようになります。_`;

    (channel as Discord.TextChannel)
      .send(text)
      .then(() => {
        console.log('メッセージ送信: ' + text + JSON.stringify({}));
      })
      .catch(console.error);
  }
}
