/* 带有时间限制的本地存储 */
class Storage {
  constructor(type) {
    if (typeof window === "object") {
      this.env = "browser";
      this.map = type === "local" ? window.localStorage : window.sessionStorage;
    } else {
      this.env = "node";
      this.map = new Map();
    }
  }
  setItem(key, value) {
    if (this.env === "node") {
      const a = new Map();
      this.map.set(key, value);
    } else {
      this.setItem(key, value);
    }
  }
  getItem(key) {
    if (this.env === "node") {
      this.map.get(key, value);
    } else {
      this.getItem(key, value);
    }
  }
}
class LocalStorage {
  constructor(type = "local", interval = 7200000) {
    this.type = type;
    this.interval = interval;
    this.storage = new Storage(type);
  }
  /**
   * 修改配置
   * @param {string} type 设置存储的类型
   * @param {number} interval 过期时间
   * @returns 修改配置后的实例
   */
  setConfig(type = "local", interval) {
    if (typeof type !== "string" || type === this.type) return this;
    if (!interval) interval = this.interval;
    return new LocalStorage(type, interval);
  }
  /**
   * 存储数据到localStorage/sessionStorage
   * @param {string} key 存储的键值
   * @param {*} value 存储的值
   * @param {string} interval 过期时间
   * @returns 存储是否成功
   */
  setItem(key, value, interval) {
    if (!key || typeof key !== "string") return false;
    if (!value && value !== 0) return false;
    if (typeof interval !== "number") interval = this.interval;
    let data = JSON.stringify({
      expireTime: new Date().getTime(),
      value,
      interval,
    });
    this.storage.setItem(key, data);
    return true;
  }
  /**
   * 从本地localStorage/sessionStorage获取数据
   * @param {string} key 数据的键值
   * @returns 获取到的数据
   */
  getItem(key) {
    let data = this.storage.getItem(key);
    if (!data) return null;
    data = JSON.parse(data);
    const { interval, expireTime } = data;
    if (this.#isExpire(expireTime, interval)) {
      this.storage.removeItem(key);
      return null;
    }
    return data.value;
  }
  remove(key) {
    this.storage.removeItem(key);
  }
  /**
   * 判断是否过期
   * @param {number} expireTime 存储时的时间
   * @param {number} interval 过期时间
   * @returns 是否过期
   */
  #isExpire(expireTime, interval) {
    if (interval === 0) return false;
    const curTime = new Date().getTime();
    if (curTime - expireTime > interval) return true;
    return false;
  }
}

const localCache = new LocalStorage();
const sessionCache = localCache.setConfig("session");

export { sessionCache, localCache };
export default LocalStorage;
