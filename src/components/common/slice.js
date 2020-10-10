export function cut(array,num){
    if(array.length >= num){
        return array.slice(0,num)
    }else{
        return array
    }
}