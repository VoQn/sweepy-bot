import Discord, { Client } from 'discord.js';
import { Response } from '../types';
import { parseCommand } from '../parser';

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
  exec: (args: string, client?: Discord.Client) => Response;
}

export const compare = (a: Command, b: Command) => {
  if (a.category !== b.category) {
    return a.category - b.category;
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

export class Command implements Command {
  private static table: Map<string, Command> = new Map<string, Command>();

  public static register({ name, ...props }: Command): Command {
    if (this.table.has(name)) {
      return this.table.get(name);
    }
    const command = new Command({ name, ...props });
    this.table.set(name.toLowerCase(), command);
    return command;
  }

  public static get sortedAllCommands(): Command[] {
    const ret: Command[] = [];
    for (const cmd of this.table.values()) {
      ret.push(cmd);
    }
    return ret.sort(compare);
  }

  public static eval(source: string, client?: Client): Response {
    const test = parseCommand(source);
    if (test == null) {
      return null;
    }
    const cmdName = test.command.toLowerCase();
    if (!this.table.has(cmdName)) {
      return null;
    }
    const command = this.table.get(cmdName);
    return command.exec(test.args, client);
  }

  private constructor({ category, name, help, exec }: Command) {
    this.category = category;
    this.name = name;
    this.help = help;
    this.exec = exec;
  }
}
