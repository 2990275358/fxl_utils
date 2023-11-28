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
 * 合并两个对象，newData覆盖defaultData
 * @param {*} defaultData
 * @param {*} newData
 * @returns 新对象
 */
function combineData(defaultData, newData) {
  return Object.assign({}, defaultData, newData);
}
/**
 * 根据条件筛选列表
 * @param {Array} list [{a:1,b:2},{a:3,b:1}]
 * @param {object} condition { searchText:{ keys: ["a", "b"], values: 1 }}
 * @param {Array} equals 用来判断相等的值
 * @returns 筛选后的列表
 */
function renderSearchData(list, condition, equals) {
  return list.filter((item) => {
    const values = Object.values(condition);
    return values.every((res) => {
      const { keys, value, isTime } = res;
      let fn = "every";
      if (keys.length > 1) {
        fn = "some";
      }
      return keys[fn]((key) => {
        if (equals.includes(key)) {
          return item[key] == value;
        }
        if (isTime) {
          return timeIsBetween(value[0], value[1], item[key]);
        }
        return item[key].indexOf(value) !== -1;
      });
    });
  });
}
/**
 *  将接收的对象转成要传递给数据库的对象,并且删除掉空值
 * @param {Object} data 要处理的对象 {objName:"ss","id":"ss"}
 * @param {Array} shields 要屏蔽的字段 ["id"]
 * @returns 处理后的对象 {obj_name:"ss"}
 */
function handleObject(data, shields = ["id"], noLine = []) {
  const newData = {};
  for (const field of Object.entries(data)) {
    const [key, value] = field;
    if (
      !shields.includes(key) &&
      value !== "" &&
      value !== undefined &&
      value !== null
    ) {
      if (noLine.includes(key)) {
        Object.assign(newData, { [key]: value });
        continue;
      }
      Object.assign(newData, { [toLine(key)]: value });
    }
  }
  return newData;
}

export {
  loopObj,
  isPainObject,
  clone,
  combineData,
  renderSearchData,
  handleObject,
};
