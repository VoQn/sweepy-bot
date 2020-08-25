import cheatsheets from '../../data/cheatsheet.json';
import { CheatsheetCommand } from './cheatsheet_command';
import { AnswerTalker } from '../answer_talker';

describe('CheatsheetCommand', () => {
    const data = new AnswerTalker(Object.values(cheatsheets), 'name', 'url');
    const command = new CheatsheetCommand(data);

    describe('message without args', () => {
        it('returns contents including all names', () => {
            for(let { name } of Object.values(cheatsheets)) {
                expect(command.message('!cheatsheet').content).toMatch(name);
            }
        });
    });

    describe('message with args', () => {
        it('returns contents including all names', () => {
            for (let { name, url } of Object.values(cheatsheets)) {
                expect(command.message(`!cheatsheet ${name}`).content).toMatch(url);
            }
        });
    });
});
