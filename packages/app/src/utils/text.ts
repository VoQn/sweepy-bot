export type RegexResult = {
  matched: string;
  rest: string;
};

export const identify = (name: string): string => {
  if (name == null || name.length < 1) {
    return name;
  }
  const i = name[0].toLowerCase();
  if (name.length === 1) {
    return i;
  }
  return (
    i +
    name
      .slice(1)
      .replace(/[A-Z](?=[a-z])/, (c) => '_' + c)
      .toLowerCase()
  );
};

/**
 * split string at first match by regular expression
 * @param regexp
 * @param text
 */
export const trimByRegexp = (regexp: RegExp, text: string): RegexResult => {
  const test = regexp.exec(text);
  if (test == null) {
    return null;
  }
  const matched = test[0];
  const rest = text.substr(matched.length);
  return { matched, rest };
};
