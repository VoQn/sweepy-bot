import Discord, { PresenceData, Message } from 'discord.js';
import { SweepyBot } from './sweepy-bot';
import { AnswerTalker } from './answer_talker';
import cheatsheets from '../data/cheatsheet.json';

export class SweepyDock {
  cheatsheetCommand: AnswerTalker = new AnswerTalker(Object.values(cheatsheets), 'name', 'url');

  constructor(client?: Discord.Client) {
    this.client = client;
    this.sweepy = new SweepyBot();
    if (client) {
      this.client.once('ready', () => this.onReady());
      this.client.on('message', (message: Discord.Message) => this.onMessage(message));
    }
  }
  private client: Discord.Client;
  private sweepy: SweepyBot;

  async start(token: string): Promise<string> {
    return this.client.login(token);
  }

  async onReady(): Promise<Discord.Presence> {
    let res = await this.client.user.setPresence(SweepyBot.loginedActivity);
    console.log('Sweepy bot is alive.');
    return res;
  }

  async onMessage(message: Discord.Message): Promise<void> {
    // チートシート一覧
    if (message.content.match(/^\!cheatsheet\s?$/)) {
      await message.channel.send(this.cheatsheetCommand.getKeywords(), {});
      return;
    }

    // チートシートの返答
    const cheatsheetName = message.content.match(/^\!cheatsheet\s+(?<arg>\S+)/);
    if (cheatsheetName) {
      await message.channel.send(this.cheatsheetCommand.getAnswer(cheatsheetName.groups.arg));
      return;
    }

    throw new Error('no-command-implemented');
  }
}
