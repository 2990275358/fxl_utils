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
/**
 * 将插入语句封装，只需要传入对应的参数即可
 * @param {object} obj 需要插入表的字段
 * @param {String} tableName 需要插入的表名
 * @returns
 */
function insertSql(obj, tableName) {
  const keys = Object.keys(obj);
  const optArr = [];
  const valArr = [];
  if (!keys.length) return [];
  for (let res of keys) {
    optArr.push("?");
    valArr.push(obj[res]);
  }
  const statement = `INSERT INTO ${tableName} (${keys.join(
    ","
  )}) VALUE (${optArr.join(",")});`;
  return [statement, valArr];
}
/**
 * 查询某一字段在数据库
 * @param {String} tableName 查询的表名
 * @param {String} fieldName 查询的表字段
 * @param {String} resultField 需要的结果字段
 * @param {String | Number} value 判断的值
 * @returns
 */
const querySql = (tableName, fieldName, resultField = "id", value) => {
  let statement = `select ${resultField} from ${tableName} where ${fieldName} = ?`;
  if (!fieldName || !value) {
    statement = `select ${resultField} from ${tableName}`;
  }
  return [statement, value];
};
/**
 * 执行修改语句
 * @param {Object} obj 需要修改的字段 { name:"我爱吃鱼"}
 * @param {String} tableName 需要修改的表名
 * @param {String} fieldName 条件字段
 * @param {String} value 条件字段的值 fieldName = value
 */
const updateSql = (obj, tableName, fieldName, value) => {
  const keys = Object.keys(obj);
  const values = [];
  const options = [];
  if (!keys.length) return [];
  for (let key of keys) {
    values.push(`${key} = ?`);
    options.push(obj[key]);
  }
  const statement = `update ${tableName} set ${values.join(
    ", "
  )} where ${fieldName} = '${value}';`;
  return [statement, options];
};
/**
 * 执行SQL的删除语句
 * @param {String} tableName 要删除内容的表名
 * @param {String} fieldName 要删除的条件字段
 * @param {*} value 条件字段的值
 * @returns
 */
const deleteSql = (tableName, fieldName, value) => {
  const statement = `delete from ${tableName} where ${fieldName} = ?;`;
  return [statement, value];
};
/**
 * 处理模糊查询的参数
 * @param {Object} data 要处理的参数
 * @param {String} tableAs 表的别名
 * @param {boolean} isOffset 是否需要分页查询
 * @returns 返回拼接好的字符串，如果isOffset为false则返回数组，将条件查询和分页查询的语句一并返回
 */
function strMerge(str, word) {
  if (!str && word) str = "WHERE";
  return str + word;
}
function handelFuzzyQuery(data, tableAs, isOffset = true) {
  let str = "";
  let limit = "";
  for (const key in data) {
    if (!["createAt", "size", "offset"].includes(key)) {
      str = strMerge(str, ` ${tableAs + "."}${key} like '%${data[key]}%' AND`);
    }
  }
  // 时间条件
  if ("createAt" in data) {
    const times = data["createAt"];
    str = strMerge(
      str,
      ` ${tableAs + "."}createAt BETWEEN '${formatTime(
        times[0]
      )}' AND '${formatTime(times[1])}' `
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
function executeSql(statement, options) {
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
export {
  insertSql,
  querySql,
  updateSql,
  deleteSql,
  executeSql,
  handelFuzzyQuery,
};
