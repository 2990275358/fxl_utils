const { findTreeArr } = require("./lib");

const arr = [
  {
    a: 1,
    children: [{ a: 2 }],
  },
  { a: 3 },
];

console.log(findTreeArr(arr, "a"));
