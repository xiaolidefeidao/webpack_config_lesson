import {log} from './log.js'
import '../css/fontColor.scss'
import '../css/fontSize.css'
import '../css/common.css'

console.log('this is index.js++++++');
log('this is development env !');
try {
  if (__DEV__) {
    log('this is development env 2')
  }
} catch (e) {
  console.log("there is no __DEV__, because it is prd env")
}
console.log('+++++-++++++', process.env.NODE_ENV);


const ele = document.getElementById('h2');
console.log(ele,"-----------------ele")
ele.onclick = function () {
  console.log('ele click---------------------------');
  import(/* webpackChunkName: "superalert" */'./superalert').then(({ default: superalert }) => {
    superalert({ a: 1 })
  })
};

