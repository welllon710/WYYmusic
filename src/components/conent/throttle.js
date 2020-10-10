export function throttle(fn,delay=200){
    let lastTime;
    let timer;
    return function() {
      let args = arguments;
      // 记录当前函数触发的时间
      let nowTime = Date.now();
      if (lastTime && nowTime - lastTime < delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          // 记录上一次函数触发的时间
          lastTime = nowTime;
          // 修正this指向问题
          fn.apply(this, args);
        }, delay);
      }else{
        lastTime = nowTime;
        fn.apply(this, args);
      }
    }
  }