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
  emit<T>(key: string, data: T[]): IPubsub;
  on(key: string, event: ISubEvent): IPubsub;
  off(key: string, event: ISubEvent): IPubsub;
  once(key: string, event: ISubEvent): IPubsub;
  has(key: string): IPubsub;
}

type SqlResult = [string, any[]];

interface Sql {
  insert(tableName: string, obj: any): SqlResult;
  query(
    tableName: string,
    resultField: string,
    condition?: MyObject
  ): SqlResult;
  update(tableName: string, obj: MyObject, condition: MyObject): SqlResult;
  remove(tableName: string, condition: MyObject): SqlResult;
  execute(statement: string, options: MyObject): SqlResult;
  handelFuzzyQuery(data: any, tableAs: string, isOffset: boolean): string[];
}

export function loopObj(
  object: object,
  cb: (value: any, string: string) => void
): void;
export function isPainObject(object: object): boolean;
export function clone<T = any>(target: T, isDeep?: boolean): T;
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
export function toLine(name: string): string;
export function toCamelCase(name: string): string;
export function notNullData<T = any>(...args: T[]): T;
export function getCode(len: number): string;
export function isEmpty(target: any): boolean;
export function checkWord(word: string, key: RegExp | string): boolean;
export function qsParse<T = MyObject>(str: string): T;
export function qsStringify(data: MyObject): string;

export function findTreeArr(arr: any[] = [], keyName: string[] | string): any[];
export function arrToTree(arr: any[], idKey?: string, pidKey?: string): any[];
export function arrClassify<T>(
  arr: T[],
  key: string | string[],
  handle: (item: T) => T
): { [key: string]: T[] };
export function flatArr(arr: any[], key: string): any[];
export function arrContrast<T = any>(oldArr: T[], newArr: T[]): T[];

export const sessionCache: ILocalStorage;
export const localCache: ILocalStorage;
export const pubsub: IPubsub;
export const PubSub: IPubsub;
export const sql: Sql;
