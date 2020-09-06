import { Element, liquidsAtTemperature } from '../element';
import { Response } from '../interfaces';
import { paddingForFloats, padFloat } from '../utils/float';
import { Command, CommandCategory } from './command';

function getTemperature(args: string) {
  if (args.trim() === '') {
    return {
      temperature: 25.0,
      message: '液体の比重だよ。(25℃ で存在する液体のみだよ)',
    };
  }
  const degree = Number.parseFloat(args.trim());

  // if parse error
  if (!Number.isFinite(degree)) {
    return {
      temperature: 25.0,
      message: `液体の比重だよ。${args}は分からなかったから、25℃だよ`,
    };
  }
  return { temperature: degree, message: `${degree}℃での、液体の比重だよ` };
}

function format(liquids: Array<Element>): Array<string> {
  // 名前を左ツメする
  const namePadding = Math.max(...liquids.map((e) => e.name.length));

  // 数字はピリオドのところで整列したいので複雑なことをする
  const molarMassPadding = paddingForFloats(liquids.map((e) => e.molarMass));

  return liquids.map((e) => {
    const name = e.name.padEnd(namePadding);
    const mass = padFloat(e.molarMass, molarMassPadding);
    return `${name} --  ${mass} [g/mol]`;
  });
}

function getAnswer(args: string) {
  const { message, temperature } = getTemperature(args);

  const liquidsByMass = liquidsAtTemperature(temperature).sort(
    (e) => e.molarMass
  );

  return [message, '```', ...format(liquidsByMass), '```'].join('\n');
}

export const LiquidCommand: Command = Command.register({
  category: CommandCategory.ONI,
  name: '液体',
  help: {
    summery: ['_比重を **軽い順** に返すよ_', '```!液体```'].join('\n'),
    description: [
      '_25℃で存在する比重を **軽い順** に返すよ_',
      '```!液体```',
      '_その温度で存在する液体の比重を軽い順に返すよ_',
      '```!液体 温度```',
    ].join('\n'),
  },

  exec: (args: string): Response => {
    return { content: getAnswer(args) };
  },
});
