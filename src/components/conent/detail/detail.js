import {dateFormat} from '../../common/time';
export class Details{
    constructor(playlist,creator){
        this.navname = playlist.name
        this.img = playlist.coverImgUrl
        this.creatime = dateFormat('YY-mm-dd',new Date(playlist.createTime))
        this.tags = playlist.tags
        this.des = playlist.description
        this.sub= playlist.subscribedCount
        this.share = playlist.shareCount
        this.track = playlist.trackCount
        this.playCount = playlist.playCount
        this.name = creator.nickname
        this.comment = playlist.commentCount
    }
}
export class Artists{
    constructor(artist){
        this.name = artist.name
        this.img = artist.picUrl
        this.album = artist.albumSize
        this.musicSize = artist.musicSize
        this.mvSize = artist.mvSize
    }
}
