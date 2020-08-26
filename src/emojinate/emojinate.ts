import { numberEmojis, punctuationEmojis } from './preset';
import { trimByRegexp } from '../utils';

export const emojinateLine = (text: string): string => {
  let result = '';
  let rest = text;
  const isRemain = () => rest.length > 0;
  let isAfterEmoji = false;
  while (isRemain()) {
    let test: { matched: string; rest: string } = null;

    // already emoji code
    test = trimByRegexp(/^:[A-Za-z0-9_]+:/, rest);
    if (test) {
      // if (result.length > 0) {
      //   result += ' ';
      // }
      result += test.matched;
      rest = test.rest;
      isAfterEmoji = false;
      continue;
    }

    // :100:
    test = trimByRegexp(/^100/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += ':100:';
      rest = test.rest;
      isAfterEmoji = true;
      continue;
    }

    // :ten:
    test = trimByRegexp(/^10/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += numberEmojis[10];
      rest = test.rest;
      isAfterEmoji = true;
      continue;
    }

    // numbers
    test = trimByRegexp(/^[0-9]/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += numberEmojis[parseInt(test.matched, 10)];
      rest = test.rest;
      isAfterEmoji = true;
      continue;
    }

    // punctuation
    test = trimByRegexp(/^([?？]|[!！]([!！?？])?)/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      const matched = test.matched.replace(/！/, '!').replace(/？/, '?');
      result += punctuationEmojis[matched as '!' | '?' | '!!' | '!?'];
      rest = test.rest;
      isAfterEmoji = true;
      continue;
    }

    // alphabet
    test = trimByRegexp(/^[a-zA-Z]/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += `:regional_indicator_${test.matched.toLowerCase()}:`;
      rest = test.rest;
      isAfterEmoji = true;
      continue;
    }

    // space
    test = trimByRegexp(/^[^\S\n]+/, rest);
    if (test) {
      if (result.length > 0 || isAfterEmoji) {
        result += ' ';
      }
      // result += ' ';
      rest = test.rest;
      isAfterEmoji = false;
      continue;
    }

    // not matching any emoji code
    test = trimByRegexp(/^\W/, rest);
    if (test) {
      if (isAfterEmoji) {
        result += ' ';
      }
      result += test.matched;
      rest = test.rest;
      isAfterEmoji = false;
      continue;
    }

    break;
  }
  return result;
};

export const emojinate = (text: string): string => {
  return text.split(/\n/).map(emojinateLine).join('\n');
};
