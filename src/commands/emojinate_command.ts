import { CommandInterface } from './command_interface';

class EmojinateComand implements Command{
    name = 'Emojinate';
    pattern = /^\!emojinate\s+(?<arg>.+)$/;
    help = `_出来るだけemojiに変換するよ_\n` +
      '```!emojinate 今からliveやります!```';
    message(args: string | Object) {
      return '';
    }
}