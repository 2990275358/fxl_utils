"use strict";class e{constructor(e="local",t=72e5){this.type=e,this.interval=t,this.storage="local"===e?window.localStorage:window.sessionStorage}setConfig(t="local",n){return"string"!=typeof t||t===this.type?this:(n||(n=this.interval),new e(t,n))}setItem(e,t,n){if(!e||"string"!=typeof e)return!1;if(!t&&0!==t)return!1;"number"!=typeof n&&(n=this.interval);let r=JSON.stringify({expireTime:(new Date).getTime(),value:t,interval:n});return this.storage.setItem(e,r),!0}getItem(e){let t=this.storage.getItem(e);if(!t)return null;t=JSON.parse(t);const{interval:n,expireTime:r}=t;return this.#e(r,n)?(this.storage.removeItem(e),null):t.value}remove(e){this.storage.removeItem(e)}#e(e,t){if(0===t)return!1;return(new Date).getTime()-e>t}}const t=new e,n=t.setConfig("session");function r(e,t){return e.find((e=>e in t))}const o=r(["requestFullscreen","webkitRquestFullscreen","mozRquestFullscreen","msRquestFullscreen"],document.body);function s(e){o&&e[o]()}const i=r(["exitFullscreen","webkitExitFullscreen","mozCancelFullscreen","msExisFullscreen"],document);function l(e){i&&document[i]()}const c=r(["fullscreenElement","webkitExitFullscreen","mozfullscreenElement","msfullscreenElement"],document);function u(){return document[c]||null}function a(){return!!u()}const f=e=>"object"!=typeof e?typeof e:Object.prototype.toString.call(e).split(" ")[1].replace("]","").toLowerCase();exports.arrClassify=function(e,t,n){const r={};"string"==typeof t&&(t=[t]);for(const o of t)for(const t of e){let e=t[o];e||(e=o),r[e]||(r[e]=[]),r[e].push(n?n(t):t)}return r},exports.arrToTree=function(e=[]){const t=JSON.parse(JSON.stringify(e)),n=[];return t.map((e=>{e.children=t.filter((t=>t.pid==e.id)),e.pid||n.push(e)})),n},exports.clone=(e,t=!1)=>{if("null"===f(e)||"undefined"===f(e))return{};if(!t)return{...e};const n=new WeakMap,r=e=>{if(!e||"object"!=typeof e)return e;if(e instanceof Set)return new Set([...e]);if(e instanceof Map)return new Map([...e]);if(n.has(e))return n.get(e);const t=Array.isArray(e)?[]:{};for(const n in e)t[n]=r(e[n]);return t};return r(e)},exports.combineData=function(e,t){return Object.assign({},e,t)},exports.copy=function(e){const t=document.createElement("textarea");if(t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),navigator.userAgent.match(/ipad|ipod|iphone/i)){const e=document.createRange();e.selectNodeContents(t);const n=window.getSelection();n.removeAllRanges(),n.addRange(e),t.setSelectionRange(0,999999)}else t.select();document.execCommand("copy"),document.body.removeChild(t)},exports.debounce=function(e,t=100){return function(...n){const r=this;let o=null;o&&clearTimeout(o),o=setTimeout((()=>{e.call(r,...n)}),t)}},exports.delay=(e=100)=>new Promise((t=>{setTimeout((()=>{t()}),e)})),exports.drawAvatar=function(e,t=200,n=3){return new Promise((r=>{let o=document.createElement("canvas"),s=t/n;o.width=t,o.height=t;let i=o.getContext("2d"),l=n-1,c=e.length>n?n-1:n-2,u=0;for(let t=0;t<e.length;t++){let n=new Image;n.src=e[t],n.setAttribute("crossOrigin","Anonymous"),n.onload=function(){-1===l&&(c--,l=2),i.drawImage(n,l*s,s*c,s,s),u>=e.length-1&&r(o.toDataURL("image/png")),u++,l--}}}))},exports.findTreeArr=function(e=[],t){"string"==typeof t&&(t=[t]);const n=[];return function e(r){for(const o of r){const r={};let s=!0;t.forEach((e=>{const t=o[e];t&&(s=!1,r[e]=t)})),s||n.push(r),o.children&&o.children.length>0&&e(o.children)}}(e),1===t.length?n.map((e=>e[t[0]])):n},exports.flatArr=function(e){return function e(t){return t.reduce(((t,n)=>(t.push(n),n.children&&n.children.length>0&&t.push(...e(n.children)),Reflect.deleteProperty(n,"children"),t)),[])}(JSON.parse(JSON.stringify(e)))},exports.fullEle=u,exports.fullEnter=s,exports.fullExit=l,exports.fullToggle=function(e){a()?l():s(e)},exports.isEamil=e=>/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),exports.isElementInBox=function(e,t){if(!e||!t)return!1;const n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return n.top<r.bottom&&n.bottom>r.top&&n.left<r.right&&n.right>r.left},exports.isFull=a,exports.isNullObj=e=>!e||"{}"===JSON.stringify(e),exports.isPainObject=e=>{if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t},exports.localCache=t,exports.loopObj=(e,t)=>{if("object"!=typeof e||null===e)return;if("function"!=typeof t)throw TypeError("cb is not a function");Reflect.ownKeys(e).forEach((n=>{t(e[n],n)}))},exports.randomString=()=>Math.random().toString(36).substring(7).split("").join("."),exports.sessionCache=n,exports.throttle=(e,t=100)=>{let n=Date.now();return function(...r){const o=Date.now();o-n>t&&(n=o,e.call(this,...r))}};