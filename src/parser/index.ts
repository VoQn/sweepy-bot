export type ParseResult = { command: string; args: string };

export const parseCommand = (text: string): ParseResult => {
  const withArgs = /^\!(?<command>\S+)[^\S\n]+(?<args>.+)$/;
  const withoutArgs = /^\!(?<command>\S+)\s?$/;
  if (withArgs.test(text)) {
    return text.match(withArgs).groups as ParseResult;
  }
  if (withoutArgs.test(text)) {
    const { command } = text.match(withoutArgs).groups;
    return { command, args: '' };
  }
  return null;
};
