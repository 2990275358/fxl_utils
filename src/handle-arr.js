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
/**
 * 将两个数组中不一致的数据找出来
 * @param {Array} oldArr 数据较多的数组 [a,2,34,4]
 * @param {Array} newArr 数据较短的数组 [a,2]
 * @returns [34,4]
 */
function arrContrast(oldArr, newArr) {
  return oldArr.reduce((pre, cur) => {
    if (!newArr.some((res) => res === cur)) {
      pre.push(cur);
    }
    return pre;
  }, []);
}
export { findTreeArr, arrClassify, arrToTree, flatArr, arrContrast };
