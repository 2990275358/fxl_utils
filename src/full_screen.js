function getFn(fns, ele) {
  return fns.find((fn) => {
    return fn in ele;
  });
}

const enterFn = getFn(
  [
    "requestFullscreen",
    "webkitRquestFullscreen",
    "mozRquestFullscreen",
    "msRquestFullscreen"
  ],
  document.body
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
    "msExisFullscreen"
  ],
  document
);
/**
 * 退出全屏
 * @param {*} ele 退出的元素
 */
function fullExit(ele) {
  exitFn && document[exitFn]();
}
const fulleleName = getFn(
  [
    "fullscreenElement",
    "webkitExitFullscreen",
    "mozfullscreenElement",
    "msfullscreenElement"
  ],
  document
);

/**
 * 获取当前是否有元素处于全屏
 * @returns 获取的元素
 */
function fullEle() {
  return document[fulleleName] || null;
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
