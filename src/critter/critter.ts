import { ID, Multilingal, Decor, Response } from '../types';
import { override, getCustomEmoji, blankField } from '../utils';
import { Client, MessageEmbedOptions, EmbedFieldData } from 'discord.js';
import {
  CritterInfo,
  LightEmitter,
  LivableTemp,
  CritterInfoBase,
  FamiliyCritterInfo,
} from './critter-info';

const compareCritter = (a: Critter, b: Critter): number => {
  if (a.isBaseType && b.isBaseType) {
    return a.id.length - b.id.length;
  }
  if (b.isBaseType) {
    return 1;
  }
  if (a.isBaseType) {
    return -1;
  }
  return 0;
};

const findCritterByName = (table: Map<ID, Critter>, query: string | RegExp) => {
  let lang: 'en' | 'ja' = 'en';
  if (typeof query === 'string') {
    if (
      /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/.test(query)
    ) {
      // たぶん日本語で検索してる
      lang = 'ja';
    } else if (/^[a-zA-Z]+.?$/.test(query)) {
      // たぶん英語で探してる
      lang = 'en';
      if (table.has(query)) {
        return table.get(query);
      }
    }
  }
  const pattern =
    typeof query !== 'string'
      ? query
      : new RegExp(query.replace(/[^\S\n]/, '\\s?'), 'i');
  const matched: Critter[] = [];
  for (const critter of table.values()) {
    const name = critter.name[lang].replace(/[^\S\n]+/, '');
    if (name.match(pattern)) {
      matched.push(critter);
    }
  }
  if (matched.length === 0) {
    return null;
  }
  return matched.sort(compareCritter)[0];
};

export class Critter implements CritterInfo {
  readonly isBaseType: boolean;
  readonly baseTypeName: ID;
  readonly id: ID;
  readonly name: Multilingal;
  readonly imageURL: string;
  readonly flavorText: Multilingal;
  readonly livableTemp: LivableTemp;
  readonly decor: Decor;
  readonly caloriesNeeded: number;
  readonly hitPoint: number;
  readonly spaceRequired?: number;
  readonly layAnEgg?: number;
  readonly hatches?: number;
  readonly lifeSpan?: number;
  readonly lightEmitter?: LightEmitter;

  private static readonly table: Map<ID, Critter> = new Map<ID, Critter>();

  public static compare(a: Critter, b: Critter): number {
    return compareCritter(a, b);
  }

  public static findByName(query: string | RegExp): Critter {
    return findCritterByName(this.table, query);
  }

  public static register(
    origin: CritterInfoBase,
    append?: FamiliyCritterInfo
  ): Critter {
    const id = append?.id || origin.id;
    const cache = this.table.get(id);
    if (cache) {
      return cache;
    }
    const critter = new Critter(origin, append);
    this.table.set(id, critter);
    return critter;
  }

  private constructor(origin: CritterInfoBase, append?: FamiliyCritterInfo) {
    const isBaseType = override == null || Object.keys(override).length < 1;
    this.isBaseType = isBaseType;
    this.baseTypeName = origin.id;

    const param = override(origin, append);
    this.id = param.id;
    this.name = param.name;
    this.imageURL = param.imageURL;
    this.flavorText = param.flavorText;
    this.livableTemp = param.livableTemp;
    this.decor = param.decor;
    this.caloriesNeeded = param.caloriesNeeded;
    this.hitPoint = param.hitPoint;
    this.spaceRequired = param.spaceRequired;
    this.lifeSpan = param.lifeSpan;
    this.layAnEgg = param.layAnEgg;
    this.hatches = param.hatches;
    this.lightEmitter = param.lightEmitter;
  }

  public get emojiName(): string {
    return this.name.en.toLowerCase().replace(/\s+/, '');
  }

  public get emojiCode(): string {
    return `:${this.emojiName}:`;
  }

  public detailEmbed(client: Client): Response {
    const emoji = (name: string) => getCustomEmoji(name, client);
    const fields: EmbedFieldData[] = [
      {
        name: ':globe_with_meridians: DataBase Link (_oni-db.com_)',
        value: `:point_up: 詳細は[oni-db.com](https://oni-db.com/details/${this.id})を見てね`,
      },
      {
        name: `:secret: 内部名`,
        value: `\`${this.id}\``,
        inline: true,
      },
    ];
    const critterEmoji = emoji(this.emojiName);
    if (critterEmoji) {
      fields.push({
        name: `${critterEmoji} Emoji`,
        value: `\`${this.emojiCode}\``,
        inline: true,
      });
    }
    fields.push({
      name: `${emoji('oni_thermometer')} 生存可能体温`,
      value: `**${this.livableTemp.lower} 〜 ${this.livableTemp.upper}** _℃_`,
      inline: true,
    });
    fields.push({
      name: `${emoji('decord')} 装飾値`,
      value: `**${this.decor.value}** (**${this.decor.radius}** _tile_)`,
      inline: true,
    });
    const calories =
      this.caloriesNeeded < 1000
        ? `**${this.caloriesNeeded}** _cal/s_`
        : `**${this.caloriesNeeded / 1000}** _kcal/s_`;
    fields.push({
      name: `${emoji('calories')} カロリー消費`,
      value: calories,
      inline: true,
    });
    fields.push({
      name: ':heart: HP',
      value: `**${this.hitPoint}**`,
      inline: true,
    });
    if (this.spaceRequired != null) {
      fields.push({
        name: ':u6e80: 過密判定',
        value: `**${this.spaceRequired}** _tile_`,
        inline: true,
      });
    }
    if (this.layAnEgg != null) {
      fields.push({
        name: ':egg: 産卵ペース',
        value: `**${this.layAnEgg / 600}** _cycle_`,
        inline: true,
      });
    }
    if (this.hatches != null) {
      fields.push({
        name: `${emoji('joydupe')} 孵化するまで`,
        value: `**${this.hatches / 600}** _cycle_`,
        inline: true,
      });
    }
    if (this.lifeSpan != null) {
      fields.push({
        name: `${emoji('grave')} 寿命`,
        value: `**${this.lifeSpan / 600}** _cycle_`,
        inline: true,
      });
    }
    if (this.lightEmitter != null) {
      fields.push({
        name: ':high_brightness: 光源効果',
        value: `**${this.lightEmitter.lux}** _lux_ (**${this.lightEmitter.range}** _tile_)`,
        inline: true,
      });
    }
    if (fields.length > 4 && fields.length % 3 === 0) {
      fields.push(blankField(true));
    }
    const flavorText = this.flavorText.ja || this.flavorText.en;
    const critterName = this.name.ja || this.name.en;
    const embed: MessageEmbedOptions = {
      author: {
        name: critterName,
        iconURL: this.imageURL,
      },
      title: `_${this.name.en}_`,
      url: `https://oni-db.com/details/${this.id}`,
      color: 0x0099ff,
      thumbnail: { url: this.imageURL },
      description: `_${flavorText}_`,
      fields,
      footer: {
        text: 'Sweepy Bot',
        iconURL: client.user.avatarURL(),
      },
      timestamp: new Date(),
    };
    return {
      content: `:bulb: _**${this.name.ja}** は知ってるよ_`,
      options: { embed },
    };
  }
}
