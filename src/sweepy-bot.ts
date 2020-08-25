import { PresenceData, MessageEmbed } from 'discord.js';
// import { Command } from './command';

export class SweepyBot {
  public static loginedActivity: PresenceData = {
    activity: {
      name: '皆さんからの !help ',
      type: 'WATCHING',
    },
  };

  // constructor() {
  //   this.commands = [];
  // }

//  private commands: Array<Command>;

  // registerCommand(command: Command): void {
  //   this.commands.push(command);
  // }

//   public help(): MessageEmbed {
//     let result = new MessageEmbed();
//     result = result.setTitle('Sweepy Bot');
//     this.commands.forEach(c => {
//       result.addField(c.name, c.help);
//     });
//     return result;
//   }

  public ask(message: string): string {
    // let command: Command = this.findCommand(message);
    // return command?.message(message) || '何のこと？';
    return '何のこと？';
  }

//   // 最初にマッチしたコマンドを返す
//   public findCommand(message: string): Command | null {
//     for (const command of this.commands) {
//       if (message.match(command.pattern)) {
//         return command;
//       }
//     }
//     return null;
//   }
}
