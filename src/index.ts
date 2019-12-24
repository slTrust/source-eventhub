class EventHub {
    /*
    cache 规定它的 
        key是一个string
        value是一个 函数数组
            函数里的参数是 unknown
    */
    private cache:{ [key: string]: Array< (data: unknown) => void> } = {};
    // fn 类型可以接受一个参数 这个data 可以是 any 也可以是 unknown
    on(eventName:string, fn:(data: unknown) => void){
        this.cache[eventName] = this.cache[eventName] || [];
        this.cache[eventName].push(fn);
    }
    // unknown 就是安全类型 你一旦确定就不能在改了
    emit(eventName:string, data?: unknown){
        (this.cache[eventName] || []).forEach(fn => fn(data));
    }
    off(eventName:string, fn:(data: unknown) => void) {
        let index = indexOf(this.cache[eventName], fn);
        if (index === -1) return;
        this.cache[eventName].splice(index, 1);
    }
}

export default EventHub;

/**
 * 帮助函数 indexOf
 * @param array
 * @param item
 */
function indexOf(array, item) {
    if (array === undefined) return -1;
  
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) {
        index = i;
        break;
      }
    }
    return index;
  }
