export function log(...args) {
  if (process.env.NODE_ENV === 'development' && console && console.log) {
    console.log.apply(console, args);
  }else{
    console.log('this is not development env')
  }
}

