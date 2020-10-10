import { dateFormat } from "../../components/common/time";
export class Mvdetails{
    constructor(data,url){
        this.name = data.name //标题
        this.author = data.artistName //作者
        this.desc = data.desc //简介
        this.id = data.id //mv  id 
        this.publishTime = data.publishTime //发布时间
        this.playCount = data.playCount //播放量
        this.shareCount = data.shareCount //分享
        this.subCount = data.subCount //收藏
        this.commentCount = data.commentCount //评论量
        this.duration = dateFormat('MM:SS',new Date(data.duration)) // 播放时长
        this.url = url.url //播放地址
}
}
export class Simimv{
    constructor(data){
        this.img = data.cover //图片
        this.author = data.artistName //作者
        this.name = data.name //标题
        this.duration = dateFormat('MM:SS',new Date(data.duration)) // 播放时长
        this.id = data.id //id
        this.playCount = data.playCount //播放量
    }
}