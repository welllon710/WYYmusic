import {dateFormat} from '../../../components/common/time';
export class Event {
    constructor(data,json){ //data=res.event 遍历后的item
        this.name = data.user.nickname // 发布者名字
        this.img = data.user.avatarUrl //发布者头像
        this.userid = data.user.userId //发布者id
        this.showtime = dateFormat('HH:MM',new Date(data.showTime)) //发布时间
        this.comment = data.info.commentCount //评论数量
        this.likedCount = data.info.likedCount //点赞数量
        this.liked = data.info.liked //点赞状态
        this.shareCount = data.info.shareCount //分享
        this.id = data.info.commentThread.id  //动态id
        // let a = JSON.parse(data.json) //转化对象格式
        this.msg = json.msg //发布内容
        // this.time = dateFormat('MM:SS',new Date(json.song.duration)) //发布时间
        this.song = json.song  //发布音乐对象
        // for (const key in json.song) {
        //     if(key==='name'){
        //         this.songname = json.song[key]
        //     }
        //     if(key==='duration'){
        //         this.time = dateFormat('MM:SS',new Date(json.song[key])) //歌曲发布时间
        //     }
            
        // }
        // this.songimg = json.song.img80x80 //发布音乐头像
        // this.songid = json.song.id //发布音乐id
        // this.author = json.song.artists[0].name //音乐作者
        if(data.pics[0]){
            this.jpg = data.pics[0].originUrl //附带图片
            // this.height = data.pics[0].height 
            // this.width = data.pics[0].width 

        }

}
}