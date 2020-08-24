import { CommandInterface } from './command_interface';
import { emojinate } from './emojinate';

class EmojinateComand implements CommandInterface{
    name = 'Emojinate';
    pattern = /^\!emojinate\s+(?<arg>.+)$/;
    help = `_出来るだけemojiに変換するよ_\n` +
      '```!emojinate 今からliveやります!```';
    message(args: string | Object) {
      return '';
    }
}