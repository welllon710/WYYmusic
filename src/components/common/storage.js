const storage = {
    set(key, value){ // 调用这个方法时候传入一个 key 和 value 
            //  将传入的 value 转换成JSON 字符串
            localStorage.setItem(key,JSON.stringify(value))
        },
        get(key){  // get 方法 直接传入 key 就行
            // 反序列化，将 JSON 字符串转换成 JSON 对象
            return JSON.parse(localStorage.getItem(key)||'[]')
        },
        remove(){  //  删除
            localStorage.removeItem(key)
        }
    }
export default storage   //  将 storage 暴露出去