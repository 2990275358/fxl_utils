const { arrClassify, arrContrast, loopObj, sql } = require("./lib");

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

console.dir(sql.update({ name: "张三", age: 18 }, "user", "id", 1));
