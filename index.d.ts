declare function Qs(data: { [key: string]: any }): string;
declare namespace Qs {
  export function parse(str: string): { [key: string]: any };
}

type MyObject<T = any> = {
  [key: string | number]: string | number | boolean | T[] | MyObject<T>;
};

declare class ILocalStorage {
  constructor(type?: string, interval?: number);
  type: string;
  interval: number;
  storage: Storage;
  setConfig(type?: string, interval?: number): LocalStorage;
  setItem(key: string, value: any, interval?: number): boolean;
  getItem(key: string): any;
  remove(key: string): any;
}

type ISubEvent<T> = (...arges: any[]) => T;

declare class IPubsub {
  subscribers: object;
  emit(key: string, data: any[], thisArg?: any): void;
  on(key: string, event: ISubEvent): void;
  off(key: string, event: ISubEvent): void;
}

export function loopObj(
  object: object,
  cb: (value: any, string: string) => void
): void;
export function isPainObject(object: object): boolean;
export function clone<T = any>(target: T, isDeep?: boolean): T;
export function renderSearchData<T = MyObject[]>(
  list: T,
  condition: Record<keyof T[number], any>,
  equals: (keyof T[number])[]
): T;
export function handleObject<T = MyObject>(
  data: T,
  shields?: (keyof T)[],
  noLine?: (keyof T)[]
);
export function combineData<T = MyObject>(
  defaultData: Record<keyof T, any>,
  newData: Record<keyof T, any>
): T;

export function randomString(): string;
export function getTypeOf(target: any): string;
export function isNullObj(object: object): boolean;
export function fullEnter(element: HTMLElement): void;
export function fullToggle(element: HTMLElement): void;
export function fullExit(): void;
export function fullEle(): HTMLElement | null;
export function isFull(): boolean;
export function throttle(fn: any, delay?: number): (...args: any[]) => void;
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void;
export function delay(time?: number): Promise<void>;
export function toLine(name: string): string;
export function toCamelCase(name: string): string;
export function notNullData<T = any>(...args: T[]): T;
export function getCode(len: number): string;
export function isEmpty(target: any): boolean;
export function checkWord(word: string, key: RegExp | string): boolean;

export function findTreeArr(arr: any[] = [], keyName: string[] | string): any[];
export function arrToTree(arr: any[] = []): any[];
export function arrClassify<T = any>(
  arr: T[],
  key: string | string[],
  handle: (item: T) => T
): { [key: string]: T[] };
export function flatArr(arr: any[], keyName: string | string[]): any[];
export function arrContrast<T = any>(oldArr: T[], newArr: T[]): T[];

export const qs: Qs;
export const sessionCache: ILocalStorage;
export const localCache: ILocalStorage;
export const pubsub: IPubsub;
