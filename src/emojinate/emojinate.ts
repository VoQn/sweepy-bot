const numberEmojis: string[] = [
  ':zero:',
  ':one:',
  ':two:',
  ':three:',
  ':four:',
  ':five:',
  ':six:',
  ':seven:',
  ':eight:',
  ':nine:',
  ':keycap_ten:',
];

const punctuationEmojis = {
  '!': ':exclamation:',
  '?': ':question:',
  '!!': ':bangbang:',
  '!?': ':interrobang:',
};

export const trimByRegexp = (regexp: RegExp, text: string): string[] => {
  const test = text.match(regexp);
  if (test != null) {
    const word = test[0];
    return [
      word,
      text.substr(word.length),
    ];
  }
  return null;
};

export const emojinateLine = (text: string): string => {
  let result: string = '';
  let rest = text;
  const isRemain = () => rest.length > 0;
  while (isRemain()) {
    let test: string[] = null;

    // :ten:
    test = trimByRegexp(/^10/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += numberEmojis[9];
      rest = test[1];
      continue;
    }

    // numbers
    test = trimByRegexp(/^[0-9]/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += numberEmojis[parseInt(test[0], 10)];
      rest = test[1];
      continue;
    }

    // punctuation
    test = trimByRegexp(/^(\?|\!(\!|\?)?)/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += punctuationEmojis[test[0] as ('!' | '?' | '!!' | '!?')];
      rest = test[1];
      continue;
    }

    // alphabet
    test = trimByRegexp(/^[a-zA-Z]/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += `:regional_indicator_${test[0].toLowerCase()}:`;
      rest = test[1];
      continue;
    }

    // space
    test = trimByRegexp(/^[^\S\n]+/, rest);
    if (test) {
      if (result.length > 0) {
        result += ' ';
      }
      result += ' ';
      rest = test[1];
      continue;
    }

    // not matching any emoji code
    test = trimByRegexp(/^\W/, rest);
    if (test) {
      result += test[0];
      rest = test[1];
      continue;
    }

    break;
  }
  return result;
};

export const emojinate = (text: string) => {
  return text.split(/\n/).map(emojinateLine).join('\n');
};
