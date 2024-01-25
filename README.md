# 学习总结中的工具库

这个库是在日常编写代码时为了解决某一问题封装的，并不是专门封装的工具库，所以有些方法的通用性会欠缺，但是依旧能解决大部分问题，不管是 node 环境还是浏览器环境都能使用。

## 通用

### randomString

生成一个6位的随机字符串，实现较简单

**示例：**

```js
randomString() // yfujyq
```

### getCode

生成一串固定长度的数字字符串，字符串中不会出现零，主要用途是发送验证码时生成验证码

**参数：**

| 参数名 | 类型       | 说明                                  |
| ------ | ---------- | ------------------------------------- |
| len    | **number** | 需要的字符串长度，默认为 **6** 个字符 |

**示例：**

```js
getCode(4) // 2546
getCode() // 254665
```

### getTypeOf

获取数据的类型，返回的类似是基本类型的小写形式

**参数：**

| 参数名 | 类型    | 说明                       |
| ------ | ------- | -------------------------- |
| target | **any** | 基本数据类型或引用类型都可 |

**示例：**

```js
getTypeOf("s") // string
getTypeOf(undefined) // undefined
getTypeOf(null) // null
getTypeOf(1) // number
getTypeOf([]) // array
getTypeOf({}) // object
```

### throttle

简易的节流函数

**参数：**

| 参数名 | 类型                        | 说明                                                         |
| ------ | --------------------------- | ------------------------------------------------------------ |
| fn     | **(...args: any[]) => any** | 需要被执行的函数，如果需要用到 **this** 那么请不要使用箭头函数 |
| delay  | **nubmer**                  | 间隔的时间，可选参数，默认100毫秒                            |

**示例：**

```js
window.addEventListener("resize",throttle(function(event){
  console.log(event)
}))
```

### debounce

简易的防抖函数

**参数：**

| 参数名 | 类型                        | 说明                                                         |
| ------ | --------------------------- | ------------------------------------------------------------ |
| fn     | **(...args: any[]) => any** | 需要被执行的函数，如果需要用到 **this** 那么请不要使用箭头函数 |
| delay  | **nubmer**                  | 间隔的时间，可选参数，默认100毫秒                            |

**示例：**

```js
window.addEventListener("resize",debounce(function(event){
  console.log(event)
}))

input.addEventListener("input",debounce((e) => {
  console.log(e.value)
}))
```

### checkWord

检验是否符合正则规则，内置了手机号、邮箱的检测

**参数：**

| 参数名 | 类型                              | 说明                                       |
| ------ | --------------------------------- | ------------------------------------------ |
| word   | **string**                        | 被检测的文字                               |
| key    | **"phone" \| "email"  \| RegExp** | 可以是内置的检测规则名称，也可以是新的正则 |

**示例：**

```js
checkWord("123456","phone") // false
checkWord("15828917951","phone") // true
checkWord("2990275358@qq.com","email") // true
checkWord("s",/\d/) // false
```

### isEmpty

空值检测，**0** 不会被认为空值

**参数：**

| 参数名 | 类型    | 说明                       |
| ------ | ------- | -------------------------- |
| target | **any** | 基本数据类型或引用类型都可 |

**示例：**

```js
isEmpty("") // true
isEmpty(" ") // true
isEmpty(undefined) // true
isEmpty(null) // true
isEmpty(0) // false
isEmpty([]) // true
isEmpty({}) // true
```

### isNullObj

是否是空对象

**参数：**

| 参数名 | 类型                | 说明                     |
| ------ | ------------------- | ------------------------ |
| target | **object \| array** | 要进行判断的对象或者数组 |

**示例：**

```js
isNullObj([]) // true
isNullObj([1]) // false
isNullObj({}) // true
```

### toLine

将驼峰的字符串转为蛇形，主要用在变量名的风格转换

**参数：**

| 参数名 | 类型       | 说明               |
| ------ | ---------- | ------------------ |
| name   | **string** | 要进行转化的字符串 |

**示例：**

```js
toLine("hName") // h_name
toLine("totalCount") // total_count
```

### toCamelCase

将蛇形的字符串转为驼峰，主要用在变量名的风格转换

**参数：**

| 参数名 | 类型       | 说明               |
| ------ | ---------- | ------------------ |
| name   | **string** | 要进行转化的字符串 |

**示例：**

```js
toCamelCase("h_name") // hName
toCamelCase("total_count") // totalCount
```

### notNullData

获取一组数据中的非空值,这在有很变量但不知道哪个变量时非常有用，如果传递两个参数可以用来做短路或

**参数：**

| 参数名  | 类型      | 说明                                     |
| ------- | --------- | ---------------------------------------- |
| ...args | **any[]** | 参数长度不固定，取参数中第一个非空的数据 |

**示例：**

```js
notNullData("","5") // 5
notNullData(2,2,"3") // 2
// 如果知道一个变量，但不确定是否为空，如下写法效果与 null || "无"类似
notNullData([],[1]) // [1]
```

### qsStringify

将对象格式的参数转换成适用于路径请求参数的格式

**参数：**

| 参数名 | 类型       | 说明         |
| ------ | ---------- | ------------ |
| data   | **object** | 要转化的参数 |

**示例：**

```js
qsStringify({a:1,b:2}) // "a=1&b=2"
```

### qsParse

将路径请求参数的格式转换成对象格式

**参数：**

| 参数名 | 类型       | 说明         |
| ------ | ---------- | ------------ |
| str    | **string** | 要转化的参数 |

**示例：**

```js
qsParse("a=1&b=2") // {a:1,b:2}
```

## 数组

### findTreeArr

用于在树形数组中查找一些值

**参数：**

| 参数名  | 类型                   | 说明                                             |
| ------- | ---------------------- | ------------------------------------------------ |
| arr     | **array**              | 被查找的树形数组                                 |
| keyName | **string \| string[]** | 被查找的属性名，参数的类型会影响返回值的数据结构 |

**示例：**

```js
const arr = [
  {
    name: "系统管理",
    path: "",
    permission: "",
    children: [
      {
        name: "菜单管理",
        path: "/sys/menu",
        permission: "",
        children: [
          {
            name: "删除菜单",
            path: "",
            permission: "sys:menu:del",
          },
        ],
      },
    ],
  },
  {
    name: "用户管理",
    path: "/user",
    permission: "",
    children: [
      {
        name: "查询用户",
        path: "",
        permission: "user:query",
      },
    ],
  },
];

findTreeArr(arr, ["name"]) // [ '系统管理', '菜单管理', '删除菜单', '用户管理', '查询用户' ]
findTreeArr(arr, "name") // [ '系统管理', '菜单管理', '删除菜单', '用户管理', '查询用户' ]
findTreeArr(arr, ["name","permission"]) 
/* [
  { name: '系统管理' },
  { name: '菜单管理' },
  { name: '删除菜单', permission: 'sys:menu:del' },
  { name: '用户管理' },
  { name: '查询用户', permission: 'user:query' }
] */
```

### flatArr

将一个树形数组变成一维数组

**参数：**

| 参数名 | 类型       | 说明                                                         |
| ------ | ---------- | ------------------------------------------------------------ |
| arr    | **array**  | 要拍平的目标数组                                             |
| key    | **string** | 树形数组的节点属性名，例如`[{a:1,child:[{a:2}]}]`中的child,默认为 **children** |

**示例：**

```js
const arr = [
  {
    a: 1,
    c: [
      {
        a: 2,
        c: [{ a: 4 }],
      },
    ],
  },
];

flatArr(arr, "c") // [ { a: 1 }, { a: 2 }, { a: 4 } ]
```

### arrToTree

将一维数组转换成树形数组

**参数：**

| 参数名 | 类型       | 说明                                             |
| ------ | ---------- | ------------------------------------------------ |
| arr    | **array**  | 要转换的目标数组                                 |
| idKey  | **string** | 转换的节点的唯一值的键名，默认为 **id**          |
| pidKey | **string** | 转换的节点查找父节点的依据的键名，默认为 **pid** |

**示例：**

```js
const arr1 = [
  { a: 1, id: 1 },
  { a: 2, id: 2, pid: 1 },
  { a: 3, id: 3, pid: 2 },
];
flatArr(arr1) // [ { a: 1, id:1, children:[{a:2, id: 2, pid: 1, children:[{a:3, id: 3, pid: 2, children:[]}]}] } ]

const arr2 = [
  { a: 1, key: 1 },
  { a: 2, key: 2, pk: 1 },
  { a: 3, key: 3, pk: 2 },
];
flatArr(arr1,"key","pk") // [ { a: 1, key:1, children:[{a:2, key: 2, pk: 1, children:[{a:3, key: 3, pk: 2, children:[]}]}] } ]
```

### arrClassify

数组分组，并且支持格式化数组,这在做选择框数据格式化时非常好用

**参数：**

| 参数名 | 类型         | 说明                                                         |
| ------ | ------------ | ------------------------------------------------------------ |
| arr    | **array**    | 要分组的目标数组                                             |
| key    | **string**   | 分组的key，如果目标对象中没有这个属性就会以这个key为依据进行分组 |
| handle | **function** | 转换的节点查找父节点的依据的键名，默认为 **pid**             |

**示例：**

```js
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
arrClassify(arr, "deptName") /* {
  '研发部': [
    { id: 1, name: '张三', deptName: '研发部' },
    { id: 3, name: '王五', deptName: '研发部' }
  ],
  '测试部': [ { id: 2, name: '李四', deptName: '测试部' } ]
} */
arrClassify(arr, "全部") /* {
  '全部': [
    { id: 1, name: '张三', deptName: '研发部' },
    { id: 2, name: '李四', deptName: '测试部' },
    { id: 3, name: '王五', deptName: '研发部' }
  ]
} */
arrClassify(arr, "全部", (item) => ({ label: item.name, value: item.id })) /* {
  '全部': [
    { label: '张三', value: 1 },
    { label: '李四', value: 2 },
    { label: '王五', value: 3 }
  ]
} */
```

### arrContrast

将原来数组存在新数组不存在的数据找出来

**参数：**

| 参数名 | 类型      | 说明     |
| ------ | --------- | -------- |
| oldArr | **array** | 旧的数组 |
| newArr | **array** | 新的数组 |

**示例：**

```js
arrContrast(["a", 1, 2, 3, 4, 5], [1, 2, 3, 4]) // [ 'a', 5 ]
```

## 对象

### loopObj

循环数组，内部使用 **Reflect.ownKeys** 只会查找对象自身的属性

**参数：**

| 参数名 | 类型         | 说明                     |
| ------ | ------------ | ------------------------ |
| obj    | **object**   | 要被循环的对象           |
| cb     | **function** | 每次循环要执行的回调函数 |

**示例：**

```js
loopObj({a:12,b:2},(val,key) => console.log(val,key)) // 12 a 2 b
```

### clone

对象克隆，可以选择浅拷贝或者深拷贝

**参数：**

| 参数名 | 类型        | 说明                       |
| ------ | ----------- | -------------------------- |
| obj    | **object**  | 要被克隆的对象             |
| isDeep | **boolean** | 是否深拷贝，默认 **false** |

### combineData

对象合并，返回一个新的对象，不会影响参与合并的对象

**参数：**

| 参数名  | 类型       | 说明                     |
| ------- | ---------- | ------------------------ |
| ...args | **object** | 要被合并的两个或多个对象 |

**示例：**

```js
combineData({a:1,b:2},{b:4},{a:5}) // {a:5,b:4}
```

### handleObject

主要功能是剔除对象中的空值，也可以将驼峰的键名转换为蛇形，这主要运用于将对象转换为数据库对象时使用，因为 **MySQL** 数据库内不区分大小写，所以一般变量名为蛇形格式

**参数：**

| 参数名  | 类型         | 说明                                                         |
| ------- | ------------ | ------------------------------------------------------------ |
| data    | **object**   | 要被处理的对象                                               |
| shields | **string[]** | 要屏蔽的字段,可选参数                                        |
| noLine  | **string[]** | 不需要转换为蛇形的键名，有这个参数是自己设计数据库和系统时不严谨的原因，风格不统一的问题，可选参数 |

**示例：**

```js
handleObject({
	name:"张三",
	age:18,
	avatar:"",
	id:1,
	deptName:"研发部"
},["id"]) // {name:"张三",age:18,dept_name:"研发部"}
```

## sql

因为现在执行 **SQL** 时一般都采用预处理语句，所以该部分主要是生成预处理语句和格式化好的值，主要参照的是 **mysql2** 库执行预处理语句要求的参数封装的

### sql.insert

格式化插入语句

**参数：**

| 参数名    | 类型       | 说明         |
| --------- | ---------- | ------------ |
| tableName | **string** | 要插入的表名 |
| obj       | **object** | 要插入的值   |

**示例：**

```js
sql.insert({name:"张三",age:18},"user") // ["INSERT INTO user(name,age) VALUES(?,?)",["张三",18]]
```

### sql.query

格式化查询语句

**参数：**

| 参数名      | 类型       | 说明                             |
| ----------- | ---------- | -------------------------------- |
| tableName   | **string** | 要查询的表名                     |
| resultField | **string** | 查询的结果字段                   |
| condition   | **object** | 查询的条件，键名需要与数据库对应 |

**示例：**

```js
sql.query("user", "id", { a: "abc", b: "sss", c: 2 }) // [
  'SELECT id FROM user WHERE a = ? AND b = ? AND c = ?',
  [ 'abc', 'sss', 2 ]
]

sql.query("user"，"id") // ["SELECT id FROM user;",[]]
```

### sql.update

格式化修改语句

**参数：**

| 参数名    | 类型       | 说明                             |
| --------- | ---------- | -------------------------------- |
| tableName | **string** | 要插入的表名                     |
| obj       | **object** | 要修改的值                       |
| condition | **object** | 执行的条件，键名需要与数据库对应 |

**示例：**

```js
sql.update("user", { a: "abc", b: "sss", c: 2 }, { name: "张三", age: 18 }) // [
  'UPDATE user SET a = ?, b = ?, c = ? WHERE name = ? AND age = ?;',
  [ 'abc', 'sss', 2, '张三', 18 ]
]
```

### sql.remove

格式化删除语句

**参数：**

| 参数名    | 类型       | 说明                             |
| --------- | ---------- | -------------------------------- |
| tableName | **string** | 要删除的表名                     |
| condition | **object** | 执行的条件，键名需要与数据库对应 |

**示例：**

```js
sql.remove("s", { a: "abc", b: "sss", c: 2 }) // [
  'DELETE FROM s WHERE a = ? AND b = ? AND c = ?;',
  [ 'abc', 'sss', 2 ]
]
```

### sql.handelFuzzyQuery

处理模糊查询的参数，这个函数编写是为了简单处理模糊查询，函数实现内部写死了一些参数，例如分页的 **size** 和 **offset**，还有创建时间 **createAt**

**参数：**

| 参数名   | 类型        | 说明                                                   |
| -------- | ----------- | ------------------------------------------------------ |
| data     | **object**  | 模糊查询的数据                                         |
| tableAs  | **string**  | 要操作的表的别名，如果查询语句是联合查询那这就是必须的 |
| isOffset | **boolean** | 是否拼接分页语句，可选参数，默认 **true**              |

**示例：**

```js
sql.handelFuzzyQuery({name:1,createAt:["2023-11-14 18:20:00","2023-12-14 18:20:00"],offset:1,size:10},"u") // "WHERE name LIKE '%1%' AND createAt BETWEEN '2023-11-14 18:20:00' AND '2023-12-14 18:20:00' LIMIT 10 OFFSET 1;"

sql.handelFuzzyQuery({name:1,createAt:["2023-11-14 18:20:00","2023-12-14 18:20:00"],offset:1,size:10},"u",false) // ["WHERE name LIKE '%1%' AND createAt BETWEEN '2023-11-14 18:20:00' AND '2023-12-14 18:20:00'","LIMIT 10 OFFSET 1"]
```

### sql.execute

对于复杂的 **SQL** 语句时，前面的封装会很难应对，所以有了这个函数，能应对复杂的语句

**参数：**

| 参数名    | 类型       | 说明                 |
| --------- | ---------- | -------------------- |
| statement | **string** | **SQL** 语句         |
| options   | **object** | 执行语句时需要的条件 |

**示例：**

```js
sql.execute(`
	SELECT u.id,u.name FROM user u LEFT JOIN dept d ON d.id = u.deptId WHERE u.name = {{searchText}} OR d.name = {{searchText}} OR age > {{age}};
`,{age:18,searchText:"研发部"}) // ["SELECT u.id,u.name FROM user u LEFT JOIN dept d ON d.id = u.deptId WHERE u.name = ? OR d.name = ? OR age > ?;",["研发部"，“研发部”,18]]
```

## 本地缓存

使用方法和浏览器的 **Storage** 方式一致，封装过后实现了惰性删除，在设置值和读取值时直接操作即可不在需要序列化和反序列化，值得注意的是在浏览器环境中使用可以选择使用 **localCache** 和 **sessionCache**，但是在 **node** 端使用任一一个都行，因为内部使用的 **Map** 做的兼容。

### setItem

设置缓存值

**参数：**

| 参数名   | 类型       | 说明                                                        |
| -------- | ---------- | ----------------------------------------------------------- |
| key      | **string** | 缓存名                                                      |
| value    | **any**    | 缓存的值                                                    |
| interval | **number** | 过期时间，可选值，默认 7200000 毫秒，如果传入 0  便不会过期 |

### getItem

获取缓存值

**参数：**

| 参数名 | 类型       | 说明   |
| ------ | ---------- | ------ |
| key    | **string** | 缓存名 |

### remove

删除缓存值

**参数：**

| 参数名 | 类型       | 说明   |
| ------ | ---------- | ------ |
| key    | **string** | 缓存名 |

### setConfig

生成一个新的缓存实例

**参数：**

| 参数名   | 类型                     | 说明                                                         |
| -------- | ------------------------ | ------------------------------------------------------------ |
| type     | **"local" \| "session"** | 缓存方式，可选值，默认使用 **local**，只有在浏览器环境设置才有意义 |
| interval | **number**               | 过期时间，可选值，默认 7200000 毫秒                          |

**示例：**

```js
const localCache = new LocalStorage();

const sessionCache = localCache.setConfig("session");
```

## pubsub

该模块实现了发布订阅的基本功能，能够在 **vue** 或 **React** 中简单使用。**has** 外的所有方法都会返回实例本身以此来支持链式调用。

### on

订阅事件，一个关键字可以订阅多个事件，但是一个事件只能被订阅一次

**参数：**

| 参数名 | 类型         | 说明                 |
| ------ | ------------ | -------------------- |
| key    | **string**   | 要订阅的关键字       |
| event  | **function** | 订阅发布时执行的事件 |

### once

订阅一次事件，这个关键字订阅后只会被触发一次

**参数：**

| 参数名 | 类型         | 说明                 |
| ------ | ------------ | -------------------- |
| key    | **string**   | 要订阅的关键字       |
| event  | **function** | 订阅发布时执行的事件 |

### emit

触发订阅的事件

**参数：**

| 参数名 | 类型       | 说明                                               |
| ------ | ---------- | -------------------------------------------------- |
| key    | **string** | 要订阅的关键字                                     |
| args   | **any[]**  | 多个参数，默认会将最后一个参数作为this绑定到函数上 |

### off

取消订阅

**参数：**

| 参数名 | 类型         | 说明               |
| ------ | ------------ | ------------------ |
| key    | **string**   | 要取消订阅的关键字 |
| event  | **function** | 取消订阅的事件     |

### clear

清空所有订阅

**参数：** 无

### off

检查是否有订阅该事件

**参数：**

| 参数名 | 类型       | 说明           |
| ------ | ---------- | -------------- |
| key    | **string** | 订阅事件的名称 |

