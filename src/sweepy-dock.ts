import Discord, { PresenceData, Message } from 'discord.js';
import { SweepyBot } from './sweepy-bot';
import { AnswerTalker } from './answer_talker';
import cheatsheets from '../data/cheatsheet.json';
import {CheatsheetCommand} from './commands/cheatsheet_command';

export class SweepyDock {
  cheatsheetCommand: AnswerTalker = new AnswerTalker(Object.values(cheatsheets), 'name', 'url');

  constructor(client?: Discord.Client) {
    this.client = client;
    if (client) {
      this.client.once('ready', () => this.onReady());
      this.client.on('message', (message: Discord.Message) => this.onMessage(message));
    }

    this.sweepy = new SweepyBot();


    this.sweepy.register(new CheatsheetCommand(this.cheatsheetCommand));
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
    const res = this.sweepy.ask(message.content);
    await message.channel.send(res);
    return;
  }
}
