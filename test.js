const { arrClassify, arrContrast, loopObj, sql, pubsub } = require("./lib");

const arr = [
  {
    id: 1,
    name: "张三",
    deptName: "研发部",
  },
  {
    id: 2,
    name: "李四",
    deptName: "测试部",
  },
  {
    id: 3,
    name: "王五",
    deptName: "研发部",
  },
];

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
  return [opts, keys, values];
}

const result = compileObj();

console.log("insert", sql.insert("s", { a: "abc", b: "sss", c: 2 }));
console.log(
  "update",
  sql.update("user", { a: "abc", b: "sss", c: 2 }, { name: "张三", age: 18 })
);
console.log("query", sql.query("user", "id", { a: "abc", b: "sss", c: 2 }));
console.log("delete", sql.remove("s", { a: "abc", b: "sss", c: 2 }));
