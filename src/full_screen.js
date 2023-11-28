function getFn(fns, ele) {
  return fns.find((fn) => {
    return fn in ele;
  });
}
function isNode() {
  return typeof window !== "object";
}

const obj = isNode() ? {} : document;

const enterFn = getFn(
  [
    "requestFullscreen",
    "webkitRquestFullscreen",
    "mozRquestFullscreen",
    "msRquestFullscreen",
  ],
  obj["body"] || {}
);
/**
 * 进入全屏
 * @param {HTMLElement} ele
 */
function fullEnter(ele) {
  enterFn && ele[enterFn]();
}

const exitFn = getFn(
  [
    "exitFullscreen",
    "webkitExitFullscreen",
    "mozCancelFullscreen",
    "msExisFullscreen",
  ],
  obj
);
/**
 * 退出全屏
 * @param {*} ele 退出的元素
 */
function fullExit(ele) {
  exitFn && obj[exitFn](ele);
}
const fulleleName = getFn(
  [
    "fullscreenElement",
    "webkitExitFullscreen",
    "mozfullscreenElement",
    "msfullscreenElement",
  ],
  obj
);

/**
 * 获取当前是否有元素处于全屏
 * @returns 获取的元素
 */
function fullEle() {
  return obj[fulleleName] || null;
}
/**
 * 是否处于全屏
 * @returns true/false
 */
function isFull() {
  return !!fullEle();
}
function fullToggle(ele) {
  isFull() ? fullExit(ele) : fullEnter(ele);
}
export { fullEnter, fullExit, fullEle, isFull, fullToggle };
