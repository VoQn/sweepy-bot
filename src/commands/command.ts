export interface Command {
  name: string;
  pattern: RegExp;
  help: string;
  message: (args: string | Object) => string;
}
