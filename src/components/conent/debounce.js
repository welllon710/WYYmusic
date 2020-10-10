// export default function debounce(fn,delay){
//     let time = null
//     return function(...ages){
//         if(time) clearTimeout(time)
//         time = setTimeout(()=>{
//             console.log('fangdou');
//             fn.apply(this,ages)
//         },delay)
//     }
// }
export  const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    return function () {
      let args = arguments;
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };