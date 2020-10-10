import {dateFormat} from './time';
export class Urldetail{         //搜索页面的音乐URL
    constructor(item,data){
        this.name = item.name  //歌名
        this.img = item.al.picUrl//图片
        this.alia = item.alia[0]?item.alia[0]:""//专辑
        this.author = item.ar[0].name // 作者
        this.id = item.id  //id
        this.url = data[0].url //歌url
        this.time = dateFormat('MM:SS',new Date(item.dt)) //时间
    }
}