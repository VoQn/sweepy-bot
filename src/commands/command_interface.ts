import { Response } from '../types';

export interface CommandInterface {
  name: string;
  pattern: RegExp;
  help: string;
  message: (args: string | Object) => Response;
}
