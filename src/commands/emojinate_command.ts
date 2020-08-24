import { CommandInterface } from './command_interface';

class EmojinateComand implements Command{
    name = 'Emojinate';
    pattern = /^\!emojinate\s+(?<arg>.+)$/;
    help = ''
    help: string;
    message: (args: string | Object) => string;

    name:string;//このメンバーがない場合コンパイルエラーとなる。
}