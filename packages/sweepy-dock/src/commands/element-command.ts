import { Client } from 'discord.js';

import {
  Element,
  elementProperties,
  ElementProperty,
  elements,
} from '../element';
import { Response } from '../interfaces';
import { Command, CommandCategory } from './command';
import { HelpCommand } from './help-command';

const nameProp = elementProperties.find((p) => p.prop === 'name');

const defaultAnswer = ':thinking: なんのこと？';

function fuzzyAnswer(choice: Array<Element>, property: ElementProperty) {
  if (choice.length === 1) {
    const name = nameProp.format(choice[0]);
    const value = property.format(choice[0]);

    return [':bulb: もしかして、これ？', '```', name, '```', value].join('\n');
  }

  if (choice.length > 1) {
    return [
      ':thinking: 複数あるよ。聞き直してね。',
      '```',
      ...choice.map(nameProp.format),
      '```',
    ].join('\n');
  }
  return null;
}

function getAnswer(arg: string): string {
  if (arg === '属性') {
    return [
      ':thinking: 知ってる属性は…',
      '```',
      ...elementProperties.map((p) => `${p.name} or ${p.prop}`),
      '```',
    ].join('\n');
  }

  const m = /^(?<elementName>.+)\s+(?<propertyName>\S+)$/.exec(arg);
  if (!m) return defaultAnswer;

  const { elementName, propertyName } = m.groups;

  const property = elementProperties.find(
    (p) => p.prop == propertyName || p.name == propertyName
  );
  if (!property) {
    return [
      ':thinking: 知らない属性だよ。知ってる属性は…',
      '```',
      ...elementProperties.map((p) => `${p.name} or ${p.prop}`),
      '```',
    ].join('\n');
  }

  // あいまい検索を強制されていなければ。
  if (!elementName.endsWith('?')) {
    // argとnameを完全一致検索する
    const exact: Array<Element> | null = exactMatch(elementName);
    if (exact) {
      return exact.map((e) => `${e.phase}: ${property.format(e)}`).join('\n');
    }
  }

  // elementNameを部分一致検索する
  const choice2: Array<Element> = partialMatch(elementName.replace(/\?$/, ''));
  const answer2 = fuzzyAnswer(choice2, property);
  if (answer2) {
    return answer2;
  }

  return defaultAnswer;
}

function exactMatch(elementName: string): Array<Element> | null {
  const choice = elements.filter((o) => o.name === elementName);
  if (choice.length === 1) return choice;
  if (choice.length === 0) return null;
  if (choice.every((e) => e.name == choice[0].name)) return choice;

  return null;
}

function partialMatch(elementName: string): Array<Element> {
  return elements.filter((o) => o.name.includes(elementName));
}

export const ElementCommand: Command = Command.register({
  category: CommandCategory.ONI,
  name: 'element',
  help: {
    summery: [
      '_キーワードにマッチした物質の属性値を出すよ。何も指定してなかったらとりあえず物質一覧を出すよ_',
      '```!element 物質名 属性名```',
    ].join('\n'),
    description: [
      '_キーワードに完全に一致した物質の属性値を出すよ_',
      '```!element 物質名 属性名```',
      '_キーワードにマッチした物質の属性値を出すよ_',
      '```!element 物質名? 属性名```',
      '_答えられる属性一覧を出すよ_',
      '```!element 属性```',
    ].join('\n'),
  },

  exec: (args: string, client: Client): Response => {
    if (!args || args.length == 0) {
      // 引数なしの時は HelpCommand に委譲する
      return HelpCommand.exec('element', client);
    } else if (args.length < 2) {
      return {
        content:
          ':thinking: もうちょっとヒントちょうだい (2文字以上欲しがっています)',
      };
    } else {
      // 物質の返答
      return { content: getAnswer(args) };
    }
  },
});
