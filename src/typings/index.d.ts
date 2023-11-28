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

declare module "@/utils" {
  export function loopObj(
    object: object,
    cb: (value: any, string: string) => void
  ): void;
  export function isPainObject(object: object): boolean;
  export function randomString(): string;
  export function getTypeOf(target: any): string;
  export function clone<T = any>(target: T, isDeep?: boolean): T;
  export function formatTime(
    time: number | string | Date,
    tempalte?: string
  ): string;
  export function throttle(fn: any, delay?: number): (...args: any[]) => void;
  export function copy(text: string): void;
  export function paste(): any;
  export function isEamil(email: string): boolean;
  export function isNullObj(object: object): boolean;
  export function isElementInBox(el: HTMLElement, box: HTMLElement): boolean;
  export const sessionCache: ILocalStorage;
  export const localCache: ILocalStorage;
  export const pubsub: IPubsub;
  export function fullEnter(element: HTMLElement): void;
  export function fullToggle(element: HTMLElement): void;
  export function fullExit(): void;
  export function fullEle(): HTMLElement | null;
  export function isFull(): boolean;
  export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay?: number
  ): (...args: Parameters<T>) => void;
  export function delay(time?: number): Promise<void>;
  export function combineData(defaultData: any, newData: any): any;
  export function findTreeArr(
    arr: any[] = [],
    keyName: string[] | string
  ): any[];
  export function arrToTree(arr: any[] = []): any[];
  export function arrClassify<T = any>(
    arr: T[],
    key: string | string[],
    handle: (item: T) => T
  ): { [key: string]: T[] };
  export function timePasses(time: number | string | Date);
  export function timeIsBetween(
    start: number | string | Date,
    end: number | string | Date,
    time: number | string | Date
  ): boolean;
}
