import { AnswerTalker } from '../answer_talker';
import { Response } from '../types';
import { CommandInterface } from './command_interface';

export class CheatsheetCommand implements CommandInterface {
    name: string = 'cheatsheet';
    pattern: RegExp = /^\!cheatsheet\s+/;
    help: string = '_キーワードにマッチしたチートシート出すよ。何も指定してなかったらとりあえず一覧リストを出すよ_\n' +
        '```!cheatsheet 液体の比重```';

    constructor(cheatsheet: AnswerTalker) {
        this.cheatsheet = cheatsheet;
    }

    private cheatsheet: AnswerTalker;

    message(args: string): Response {
        let m = args.match(/^\!cheatsheet\s*(?<arg>\S+)?/);
        if (!m) {
            throw new Error(`cannot handle this message: ${args}`);
        }
        if (!m.groups.arg) {
            // チートシート一覧
            return { content: this.cheatsheet.getKeywords() };
        } else {
            // チートシートの返答
            return { content: this.cheatsheet.getAnswer(m.groups.arg) };
        }
    }
}
