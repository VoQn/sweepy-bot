import { CommandInterface } from './command_interface';
import { emojinate } from './emojinate';

export type EmojinateCommand implements CommandInterface{
}

class EmojinateCommand implements CommandInterface{
    name = 'Emojinate';
    pattern = /^\!emojinate\s+(?<arg>.+)$/ms;
    help = ``_出来るだけ_ ${emojinate('emoji')} _に変換するよ_\n` +
      '```!emojinate 今からliveやります!```'
    message(args: string | Object) {
      return '';
    }
}

export const  : EmojinateCommand