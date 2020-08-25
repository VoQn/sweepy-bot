import Discord from 'discord.js';
import { Response } from '../types';

export const CommandCategory = {
  General: 0,
  ONI: 1,
  Misc: 2,
} as const;

export type CommandCategory = typeof CommandCategory[keyof typeof CommandCategory];

export interface Command {
  category: CommandCategory;
  name: string;
  help: {
    summery: string;
    description?: string;
  };
  exec: (client: Discord.Client, args: string) => Response;
}



export class Command implements Command {
  private static table: Map<string, Command> = new Map<string, Command>();

  public static register({ name, ...props }: Command): Command {
    if (this.table.has(name)) {
      return this.table.get(name);
    }
    const command = new Command({ name, ...props });
    this.table.set(name, command);
    return command;
  }

  private constructor({ category, name, help, exec }: Command) {
    this.category = category;
    this.name = name;
    this.help = help;
    this.exec = exec;
  }
}
