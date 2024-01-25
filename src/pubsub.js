class PubSub {
  constructor() {
    // 事件池
    this.subscribers = {};
  }
  /**
   * 发布事件
   * @param {*} key 发布的事件名
   * @param  {...any} args 多个参数，默认会将最后一个参数作为this绑定到函数上
   */
  emit(key, ...args) {
    if (typeof key !== "string") {
      throw new TypeError("the event name must be string type");
    }
    const curSubs = this.subscribers[key];
    if (!curSubs) return;
    for (const event of curSubs) {
      event.apply(args.at(-1), args);
    }
    return this;
  }
  /**
   * 订阅事件
   * @param {string} key 要订阅的关键字
   * @param {function} event 订阅发布时执行的事件
   */
  on(key, event) {
    if (typeof key !== "string") {
      throw new TypeError("the event name must be string type");
    }
    if (typeof event !== "function") {
      throw new TypeError("the event callback must be function type");
    }
    // 拿到当前发布的消息
    let curSub = this.subscribers[key];
    // 是否存在消息
    if (!curSub) curSub = [];
    if (curSub.includes(event)) return this;
    curSub.push(event);
    // 最后统一修改数据
    this.subscribers[key] = curSub;
    return this;
  }
  once(key, event) {
    if (typeof key !== "string") {
      throw new TypeError("the event name must be string type");
    }
    if (typeof event !== "function") {
      throw new TypeError("the event callback must be function type");
    }
    const _that = this;
    const fn = function () {
      event.apply(this, arguments);
      _that.off(key, fn);
    };
    this.on(key, fn);
    return this;
  }
  /**
   * 取消订阅
   * @param {string} key 要取消订阅的关键字
   * @param {function} event 要取消订阅的事件
   */
  off(key, event) {
    if (typeof key !== "string") {
      throw new TypeError("the event name must be string type");
    }
    if (typeof event !== "function") {
      throw new TypeError("the event callback must be function type");
    }
    const curSubs = this.subscribers[key];
    if (!curSubs) return this;
    while (true) {
      const idx = curSubs.findIndex((e) => event === e);
      if (idx === -1) break;
      curSubs.splice(idx, 1);
    }
    this.subscribers[key] = curSubs;
    return this;
  }
  /**
   * 清空所有订阅
   * @returns this
   */
  clear() {
    this.subscribers = {};
    return this;
  }
  /**
   * 检查是否有订阅该事件
   * @param {string} key 订阅事件的名称
   * @returns true/false
   */
  has(key) {
    return Object.keys(this.subscribers).includes(key);
  }
}

export const pubsub = new PubSub();
export default PubSub;
