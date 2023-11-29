/**
 * 随机生成一个字符串
 * @returns 随机生成的结果
 */
const randomString = () => Math.random().toString(36).substring(7);
/**
 * 数据类型检测
 * @param {*} target
 * @returns 数据类型
 */
const getTypeOf = (target) => {
  if (typeof target !== "object") return typeof target;
  return Object.prototype.toString
    .call(target)
    .split(" ")[1]
    .replace("]", "")
    .toLowerCase();
};

/**
 * 节流函数
 * @param {*} fn 要执行的函数
 * @param {*} delay 延迟的时间
 * @returns
 */
const throttle = (fn, delay = 100) => {
  let time = Date.now();
  return function (...arg) {
    const now = Date.now();
    if (now - time > delay) {
      time = now;
      fn.call(this, ...arg);
    }
  };
};
/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay
 * @returns 要执行的函数
 */
function debounce(fn, delay = 100) {
  return function (...args) {
    const that = this;
    let timer = null;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(that, ...args);
    }, delay);
  };
}
/**
 * 用来检验一些规则
 * @param {String} word
 * @param {String} key 检验的规则 email | phone | password
 * @returns Bool
 */
const regEnum = {
  phone: /^1[2-9]{2}[\d]{8}$/,
  email: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
  password: /^[\d]+[\w\W]{5,15}/,
};
const checkWord = (word, key = "email") => {
  if (getTypeOf(key) === "regexp") {
    return key.test(word);
  }
  const reg = regEnum[key];
  return reg.test(word);
};
/**
 * 是否为空
 * @param {*} target 判断的对象
 * @returns true/false
 */
function isEmpty(target) {
  if (Object.is(target, 0)) return false;
  if (!target) return true;
  if (target.constructor === Array) return target.length === 0;
  if (target.constructor === Object) return Object.keys(target).length === 0;
  if (target.constructor === String) return target.trim() === "";
  return false;
}
/**
 * 判断是否是空对象
 * @param {*} obj 是否是空对象
 * @returns true/false
 */
const isNullObj = (obj) => {
  if (!obj) return true;
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  return JSON.stringify(obj) === "{}";
};
/**
 * 获取一串随机数
 * @param {number} len 生成的个数
 * @returns 6位数验证码
 */
function getCode(len = 6) {
  let code = "";
  while (code.length < len) {
    const random = Math.floor(Math.random() * 10);
    if (random === 0) {
      continue;
    }
    code += random;
  }
  return code;
}
/**
 * 将驼峰转换成蛇形
 * @param {String} name 要转换的字段名 hName
 * @returns h_name
 */
function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}
/**
 * 将蛇形转换为驼峰
 * @param {string} str 要转换的字符串
 * @returns hName
 */
function toCamelCase(str) {
  return str.replace(/_+([a-z])/g, function (_, c) {
    return c.toUpperCase();
  });
}
/**
 * 获取多个数据中非空的数据，有多个非空则返回第一个
 * @param  {...any} args 参数
 * @returns 非空的值
 */
function notNullData(...args) {
  for (const arg of args) {
    if (!isEmpty(arg)) return arg;
  }
}
/**
 * 将对象拼接成get请求参数
 * @param data 要拼接的对象
 * @returns 拼接后的字符串
 */
const qsStringify = (data) => {
  if (Object.keys(data).length === 0) return "";
  let str = "";
  for (const key in data) {
    str += `${key}=${data[key]}&`;
  }
  str = str.substring(0, str.length - 1);
  return encodeURI(str);
};
const qsParse = (str) => {
  if (typeof str !== "string" || str === "") return {};
  str = /^\?/.test(str) ? str.substring(1) : str;
  const strArr = str.split("&"),
    result = {},
    len = strArr.length;
  if (len === 0) return {};
  for (let i = 0; i < len; i++) {
    const target = strArr[i].split("=");
    result[target[0]] = decodeURI(target[1]);
  }
  return result;
};

export {
  randomString,
  throttle,
  checkWord,
  isNullObj,
  isEmpty,
  debounce,
  getTypeOf,
  getCode,
  toLine,
  toCamelCase,
  notNullData,
  qsStringify,
  qsParse,
};
