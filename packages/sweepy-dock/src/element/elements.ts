import elementsData from '../data/elements.json';
import { Element } from './element-info';

export const elements: Array<Element> = elementsData.elements as Array<Element>;
export const liquids: Array<Element> = elements.filter(
  (e) => e.phase === '液体'
);

export const liquidsAtTemperature = (temperature: number): Array<Element> => {
  return liquids.filter(({ highTemp: h, lowTemp: l }) => {
    return (!l || l < temperature) && (!h || temperature < h);
  });
};
