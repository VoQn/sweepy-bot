import { PresenceData } from 'discord.js';
import { CommandInterface } from './commands/command_interface';
import { Response } from './types';

export class SweepyBot {
  public static loginedActivity: PresenceData = {
    activity: {
      name: '皆さんからの !help ',
      type: 'WATCHING',
    },
  };

  private commands: Array<CommandInterface> = [];

  public register(command: CommandInterface): void {
    this.commands.push(command);
  }

  public ask(message: string): Response {
    let command: CommandInterface = this.findCommand(message);
    if (!command) {
      throw Error('not-implemented-error');
    }
    return command?.message(message);
  }

  // 最初にマッチしたコマンドを返す
  public findCommand(message: string): CommandInterface | null {
    for (const command of this.commands) {
      if (message.match(command.pattern)) {
        return command;
      }
    }
    return null;
  }
}
