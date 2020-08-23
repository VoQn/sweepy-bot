import Discord, { PresenceData, Message } from 'discord.js';
import { SweepyBot } from './sweepy-bot';

export class SweepyDock {

  constructor(client: Discord.Client) {
    this.client = client;
    this.sweepy = new SweepyBot();

    this.client.once('ready', () => this.onReady());
    this.client.on('message', (message: Discord.Message) => this.onMessage(message));
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
    //

  }
}
