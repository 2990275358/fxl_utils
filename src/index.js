export * from "./my_torage";
export * from "./full_screen";
export * from "./full_screen";
/**
 * 循环对象
 * @param {Object} obj 要循环的对象
 * @param {Function} cb 回调函数
 */
const loopObj = (obj, cb) => {
  if (typeof obj !== "object" || obj === null) return;
  if (typeof cb !== "function") throw TypeError("cb is not a function");
  const keys = Reflect.ownKeys(obj);
  keys.forEach((key) => {
    cb(obj[key], key);
  });
};
/**
 * 判断是否是一个纯对象
 * @param {Object} obj 要判断的对象
 * @returns 判断的结果
 */
const isPainObject = (obj) => {
  if (typeof obj !== "object" || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};
/**
 * 随机生成一个字符串
 * @returns 随机生成的结果
 */
const randomString = () =>
  Math.random().toString(36).substring(7).split("").join(".");
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
 * 对象克隆
 * @param {Object} obj 需要被克隆的对象
 * @param {Boolean} isDeep 是否需要深度克隆
 * @returns 克隆的新对象
 */
const clone = (obj, isDeep = false) => {
  if (getTypeOf(obj) === "null" || getTypeOf(obj) === "undefined") return {};
  if (!isDeep) return { ...obj };
  const map = new WeakMap();
  // 递归调用
  const _recursion = (target) => {
    // 普通类型直接返回
    if (!target || typeof target !== "object") return target;
    if (target instanceof Set) {
      return new Set([...target]);
    }
    if (target instanceof Map) {
      return new Map([...target]);
    }
    // 处理循环引用
    if (map.has(target)) {
      return map.get(target);
    }
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      result[key] = _recursion(target[key]);
    }
    return result;
  };
  return _recursion(obj);
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
function copy(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // 在iOS设备上使用iOS-specific方法复制文本
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
  } else {
    // 在其他设备上使用通用方法复制文本
    el.select();
  }
  document.execCommand("copy");
  document.body.removeChild(el);
}
/**
 * 粘贴
 * @returns 粘贴板的内容
 */
async function paste() {
  let result = {};
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (item.types.indexOf("image/png") > -1) {
        const bolb = await item.getType("image/png");
        result = { type: "image", src: URL.createObjectURL(bolb) };
        continue;
      }
      if (item.types.includes("text/plain")) {
        const bolb = await navigator.clipboard.readText();
        result = { type: "text", text: bolb };
      }
    }
    result["status"] = "success";
  } catch (error) {
    console.log(error.message);
    result["status"] = "err";
  }
  return result;
}
/**
 * 绘制群头像
 * @param {array} imgs 图片数组
 * @param {number} size 图片清晰度，主要控制canvas大小，canvas越大图片越清晰
 * @returns
 */
function drawAvatar(imgs, size = 200, count = 3) {
  return new Promise((resolve) => {
    let canvas = document.createElement("canvas");
    let min_size = size / count;
    canvas.width = size;
    canvas.height = size;
    let ctx = canvas.getContext("2d");
    let columns = count - 1;
    let row = imgs.length > count ? count - 1 : count - 2;
    let curNum = 0;
    for (let i = 0; i < imgs.length; i++) {
      let img = new Image();
      img.src = imgs[i];
      img.setAttribute("crossOrigin", "Anonymous");
      img.onload = function () {
        if (columns === -1) {
          row--;
          columns = 2;
        }
        ctx.drawImage(
          img,
          columns * min_size,
          min_size * row,
          min_size,
          min_size
        );
        if (curNum >= imgs.length - 1) {
          resolve(canvas.toDataURL("image/png"));
        }
        curNum++;
        columns--;
      };
    }
  });
}
/**
 * 创建图片元素
 * @param {string} src 图片路径
 * @returns 创建好的图片元素
 */
function createImgEl(options) {
  const img = document.createElement("img");
  for (const key in options) {
    img.setAttribute(key, options[key]);
  }
  img.draggable = false;
  img.style.margin = "0px 2px";
  return img;
}
const delay = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
/**
 * 是否符合邮箱规则
 * @param {string} word 判断的关键字
 * @returns true/false
 */
const isEamil = (word) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    word
  );
};
const isNullObj = (obj) => {
  if (!obj) return true;
  return JSON.stringify(obj) === "{}";
};
/**
 * 元素是否在盒子内的可见位置
 * @param {HTMLElement} el 元素
 * @param {HTMLElement} box 盒子
 * @returns true/false
 */
function isElementInBox(el, box) {
  if (!el || !box) return false;
  const elRect = el.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  return (
    elRect.top < boxRect.bottom &&
    elRect.bottom > boxRect.top &&
    elRect.left < boxRect.right &&
    elRect.right > boxRect.left
  );
}
/**
 * 合并两个对象，newData覆盖defaultData
 * @param {*} defaultData
 * @param {*} newData
 * @returns 新对象
 */
function combineData(defaultData, newData) {
  return Object.assign({}, defaultData, newData);
}
/**
 * 从一个数组中查找值
 * @param {Array} arr 目标数组
 * @param {String} keyName 要取出的键名
 * @returns 取到得的数据
 */
function findTreeArr(arr = [], keyName) {
  // 参数归一化
  if (typeof keyName === "string") {
    keyName = [keyName];
  }
  const result = [];
  function _recursion(arr) {
    for (const item of arr) {
      const values = {};
      let isNull = true;
      keyName.forEach((key) => {
        const value = item[key];
        if (value) {
          isNull = false;
          values[key] = value;
        }
      });
      if (!isNull) result.push(values);
      if (item.children && item.children.length > 0) {
        _recursion(item.children, keyName);
      }
    }
  }
  _recursion(arr);
  // 仅取一个属性时，降低结构复杂度
  if (keyName.length === 1) {
    return result.map((item) => item[keyName[0]]);
  }
  return result;
}
/**
 * 将树形数组拍平
 * @param {Array} arr 要拍平的目标数组
 * @returns 拍平后的数组
 */
function flatArr(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  function _recursion(arr) {
    return arr.reduce((pre, cur) => {
      pre.push(cur);
      if (cur.children && cur.children.length > 0) {
        pre.push(..._recursion(cur.children));
      }
      Reflect.deleteProperty(cur, "children");
      return pre;
    }, []);
  }
  return _recursion(newArr);
}
/**
 * 将平面数组转换成树形
 * @param {Array} arr 要转换的数组 [{id:"1",pid:""},{id:"2",pid:"1"}] id和pid是必需字段
 * @returns [{id:"1",pid:"",children:[{id:"2",pid:"1"}]}]
 */
function arrToTree(arr = []) {
  const newArr = JSON.parse(JSON.stringify(arr));
  const result = [];
  newArr.map((res) => {
    res.children = newArr.filter((ret) => ret.pid == res.id);
    if (!res.pid) {
      result.push(res);
    }
  });
  return result;
}
/**
 *
 * @param {Array} arr 要分组的目标数组 [{dept:"研发"，name:"A"},{dept:"测试"，name:"B"}]
 * @param {string | string[]} key 分组的key，如果目标对象中没有这个属性就会以这个key为依据进行分组，
 * 例如 key = "全部" 结果为 {"全部":[{dept:"研发"，name:"A"},{dept:"测试"，name:"B"}]}
 * @param {function} handle 分组时处理的函数
 * @returns 分好组后的数组 {"研发":[{dept:"研发"，name:"A"},"测试":{dept:"测试"，name:"B"}]}
 */
function arrClassify(arr, key, handle) {
  const result = {};
  if (typeof key === "string") key = [key];
  for (const k of key) {
    for (const item of arr) {
      let itemKey = item[k];
      if (!itemKey) itemKey = k;
      if (!result[itemKey]) result[itemKey] = [];
      result[itemKey].push(handle ? handle(item) : item);
    }
  }
  return result;
}

const _utils = {
  loopObj,
  isPainObject,
  randomString,
  clone,
  throttle,
  copy,
  drawAvatar,
  paste,
  createImgEl,
  delay,
  isNullObj,
  findTreeArr,
  arrToTree,
};
export {
  loopObj,
  isPainObject,
  randomString,
  clone,
  throttle,
  copy,
  drawAvatar,
  isEamil,
  isNullObj,
  isElementInBox,
  debounce,
  delay,
  combineData,
  findTreeArr,
  flatArr,
  arrToTree,
  arrClassify,
};
