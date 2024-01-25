function formatTime(timestamp, format = "yyyy/MM/dd HH:mm:ss") {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  format = format.replace(/yyyy/g, year);
  format = format.replace(/MM/g, month.toString().padStart(2, "0"));
  format = format.replace(/dd/g, day.toString().padStart(2, "0"));
  format = format.replace(/HH/g, hour.toString().padStart(2, "0"));
  format = format.replace(/mm/g, minute.toString().padStart(2, "0"));
  format = format.replace(/ss/g, second.toString().padStart(2, "0"));
  return format;
}
function strMerge(str, word) {
  if (!str && word) str = "WHERE ";
  return str + word;
}
/**
 * 解析参数对象
 * @param {object} obj 被解析的对象
 * @param {*} handleKey 处理需要拼接的键值
 * @returns [预处理的占位符{array}，属性值{array}，键值{array}]
 */
function compileObj(obj = {}, handleKey) {
  if (typeof obj !== "object") {
    throw TypeError("The parameters must be objects");
  }
  if (handleKey && typeof handleKey != "function") {
    throw TypeError("The handleKey must be a function");
  }
  const keys = [];
  const values = [];
  const opts = [];
  let isFunc = typeof handleKey === "function";
  for (const item of Object.entries(obj)) {
    opts.push(`${isFunc ? handleKey(item[0]) : "?"}`);
    keys.push(item[0]);
    values.push(item[1]);
  }
  return [opts, values, keys];
}
/**
 * 将插入语句封装，只需要传入对应的参数即可
 * @param {String} tableName 需要插入的表名
 * @param {object} obj 需要插入表的字段，键名需要与数据库对应
 * @returns [预处理语句{string}，条件值{array}]
 */
function insert(tableName, obj = {}) {
  const [optArr, valArr, keys] = compileObj(obj);
  const statement = `INSERT INTO ${tableName} (${keys.join(
    ","
  )}) VALUE (${optArr.join(",")});`;
  return [statement, valArr];
}
/**
 * 查询某一字段在数据库
 * @param {string} tableName 查询的表名
 * @param {string} resultField 需要的结果字段
 * @param {object} condition 查询的条件，键名需要与数据库对应
 * @returns [预处理语句{string}，条件值{array}]
 */
const query = (tableName, resultField = "id", condition = {}) => {
  let [optArr, valArr] = compileObj(condition, (key) => `${key} = ?`);
  let statement = `SELECT ${resultField} FROM ${tableName} WHERE ${optArr.join(
    " AND "
  )}`;
  if (!optArr.length || !valArr.length) {
    statement = `SELECT ${resultField} FROM ${tableName}`;
    valArr = [];
  }
  return [statement, valArr];
};
/**
 * 执行修改语句
 * @param {*} tableName 需要修改的表名
 * @param {*} obj 需要修改的字段，键名需要与数据库对应 { name:"我爱吃鱼"}
 * @param {*} condition 执行的条件，键名需要与数据库对应
 * @returns [预处理语句{string}，条件值{array}]
 */
const update = (tableName, obj, condition) => {
  const [optArr, valArr] = compileObj(obj, (key) => `${key} = ?`);
  const [conOptArr, conValArr] = compileObj(condition, (key) => `${key} = ?`);
  const statement = `UPDATE ${tableName} SET ${optArr.join(
    ", "
  )} WHERE ${conOptArr.join(" AND ")};`;
  return [statement, [...valArr, ...conValArr]];
};
/**
 * 执行SQL的删除语句
 * @param {*} tableName 要删除内容的表名
 * @param {*} condition 执行的条件，键名需要与数据库对应
 * @returns [预处理语句{string}，条件值{array}]
 */
const remove = (tableName, condition) => {
  const [optArr, valArr] = compileObj(condition, (key) => `${key} = ?`);
  const statement = `DELETE FROM ${tableName} WHERE ${optArr.join(" AND ")};`;
  return [statement, valArr];
};
/**
 * 处理模糊查询的参数
 * @param {Object} data 要处理的参数
 * @param {String} tableAs 表的别名
 * @param {boolean} isOffset 是否需要分页查询
 * @returns 返回拼接好的字符串，如果isOffset为false则返回数组，将条件查询和分页查询的语句一并返回
 */
function handelFuzzyQuery(data, tableAs, isOffset = true) {
  let str = "";
  let limit = "";
  tableAs = tableAs ? tableAs + "." : "";
  for (const key in data) {
    if (!["createAt", "size", "offset"].includes(key)) {
      str = strMerge(str, ` ${tableAs}${key} like '%${data[key]}%' AND`);
    }
  }
  // 时间条件
  if ("createAt" in data) {
    const times = data["createAt"];
    str = strMerge(
      str,
      ` ${tableAs}createAt BETWEEN '${formatTime(times[0])}' AND '${formatTime(
        times[1]
      )}' `
    );
  }
  // 清除多余的AND拼接
  if (str && str.split(" ").at(-1) === "AND") str = str.slice(0, -3);
  if ("size" in data && "offset" in data) {
    limit = ` LIMIT ${data["size"]} OFFSET ${data["offset"]}`;
  }
  if (isOffset) {
    str = strMerge(str, limit);
    return str;
  }
  return [str, limit];
}
/**
 * 执行sql语句，使用mysql的预处理语句，其中?问号占位符换成vue的插值写法，{{ 属性名 }}
 * tips: 插值语法中使用是属性名要存在于options中，未做校验
 * @param {*} statement 要执行的语句
 * @param {*} options 参数
 * @returns 执行后的结果
 */
function execute(statement, options) {
  const params = [];
  statement = statement.replace(/{{(.*?)}}/g, (match) => {
    // 获取键名并去除多余空格
    const key = match.match(/{{(.*?)}}/)[1].trim();
    // 为了使用mysql2的预处理语法，所以未直接拼接值
    params.push(options[key]);
    return "?";
  });
  return [statement, params];
}
export { insert, query, update, remove, execute, handelFuzzyQuery };
