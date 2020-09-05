export interface Element {
  name: string;
  conductivity: number;
  shc: number;
  decor?: number;
  overheat?: string;
  phase: '気体' | '液体' | '固体';
  molarMass: number;
  lowTemp?: number;
  highTemp?: number;
}

export interface ElementProperty {
  name: string;
  prop: keyof Element;
  format: (element: Element) => string;
}
