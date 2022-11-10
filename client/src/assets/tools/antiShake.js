//防抖函数
export default function debounce(method,delay) {
    let timer = null;
    return function () {
        let self = this,
            args = arguments;
        // 如果此时存在定时器的话，则取消之前的定时器重新计时
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(self,args); //改变this的指向，让其指向调用这个方法的对象
        },delay);
    }
}