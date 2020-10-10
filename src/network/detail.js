import request from './request';
let time = Date.now()
export  function detail(id){   //歌单详情
    return request({
        method:'get',
        url:'/playlist/detail',
        params:{
            id
        }
    })
}
export  function search(keywords){   //歌手详情
    return request({
        method:'get',
        url:'/search',
        params:{
            keywords,
            type:100,
        }
    })
}
export  function artists(id){   //歌手信息
    return request({
        method:'get',
        url:'/artists',
        params:{
            id
        }
    })
}
export  function album(id){   //歌手专辑
    return request({
        method:'get',
        url:'/artist/album',
        params:{
            id
        }
    })
}
export  function desc(id){   //歌手描述
    return request({
        method:'get',
        url:'/artist/desc',
        params:{
            id
        }
    })
}
export  function mv(id){   //歌手mv  
    return request({
        method:'get',
        url:'/artist/mv',
        params:{
            id
        }
    })
}
export  function artist(id,cookie){   //相似歌手
    return request({
        method:'get',
        url:'/simi/artist',
        params:{
           id,
           cookie
        }
    })
}
export  function topsong(id){   //歌手前50首歌曲
    return request({
        method:'get',
        url:'/artist/top/song',
        params:{
            id
        }
    })
}
export  function albummeg(id){   //歌手专辑内信息
    return request({
        method:'get',
        url:'/album',
        params:{
            id
        }
    })
}
export  function songdetail(ids){   //获取歌曲详情
    let times = Date.now() 
    return request({
        method:'get',
        url:'/song/detail',
        params:{
            ids,
            times:times,
        }
    })
}
export  function lyricdetail(id){   //获取歌词详情
    return request({
        method:'get',
        url:'/lyric',
        params:{
            id
        }
    })
}
export  function totalcomment(id,offset){
    let times = Date.now()   //获取评论详情
    return request({
        method:'post',
        url:'/comment/music?times='+times,
        data:{
            id,
            offset,
        }
    })
}
export  function hotcomment(id,type){
    let times = Date.now()    //获取热门评论详情
    return request({
        method:'post',
        url:'/comment/hot?times='+times,
        data:{
            id,
            type,
            limit:10,
        }
    })
}
export  function publish_(id,content,cookie,type){   //发送评论
    let times = Date.now()
    return request({
        method:'post',
        url:'/comment?times='+times,
        data:{
           t:1,   //1 发送 2 回复
           type,
           id:id,
           content:content,
           cookie:cookie,
        }
    })
}
export  function reply_(id,commentId,content,cookie,type){   //回复评论
    let times = Date.now()
    return request({
        method:'post',
        url:'/comment?time='+times,
        data:{
           t:2,   //1 发送 2 回复
           type,
           id:id,
           commentId:commentId,
           content:content,
           cookie:cookie,
        }
    })
}

///////////////////播放记录
export  function record(uid,cookie){   //获取播放记录
    return request({
        method:'get',
        url:'/user/record',
        params:{
            uid,
            type :0,
            cookie
        }
    })
}
///////////////MV标签
export  function mvgroup(){ //MV标签                                   
    return request({
        method:'get',
        url:'/video/group/list',
    })
}
export  function mvcategory(cookie){ //MV标签                                   
    return request({
        method:'get',
        url:'/video/category/list',
        params:{
            cookie
        }
    })
}
// export  function timelines(cookie){ //全部视频                               
//     return request({
//         method:'get',
//         url:'/video/timeline/all',
//         params:{
//             cookie
//         }
//     })
// }
export  function videogroup(id,offset,cookie){ //MV标签                                   
    return request({
        method:'get',
        url:'/video/group',
        params:{
            id,
            offset,
            cookie
        }
    })
}
export  function timeline(cookie){ //MV标签                                   
    return request({
        method:'get',
        url:'/video/timeline/all',
        params:{
            cookie
        }
    })
}
export  function firstmv(area){ //最新NV                                   
    return request({
        method:'get',
        url:'/mv/first',
        params:{
            area,
        }
    })
}
export  function exclusive(){ //网易NV                                   
    return request({
        method:'get',
        url:'/mv/exclusive/rcmd',
    })
}
export  function topmv(area){ //MV排行                                  
    return request({
        method:'get',
        url:'/top/mv',
        params:{
            area,
            limit:10,
        }
    })
}
export  function mvcomment(id,offset){ //MV评论                                 
    let times = Date.now()
    return request({
        method:'post',
        url:'/comment/mv?times='+times,
        data:{
            id,
            offset
        }
    })
}
export  function mvdetail(mvid){ //MV详情                             
    let times = Date.now()
    return request({
        method:'get',
        url:'/mv/detail',
        params:{
            mvid,
        }
    })
}
export  function mvsimi(mvid){ //相似MV                            
    let times = Date.now()
    return request({
        method:'get',
        url:'/simi/mv',
        params:{
            mvid,
        }
    })
}
export  function mvurl(id){ //Mv url                                 
    let times = Date.now()
    return request({
        method:'get',
        url:'/mv/url',
        params:{
            id,
        }
    })
}
export  function event(pagesize,lasttime,cookie){ // 朋友动态                            
    let times = Date.now()
    return request({
        method:'post',
        url:'/event?times='+times,
        data:{
            pagesize ,
            lasttime,
            cookie
        }
    })
}
export  function comevent(threadId,cookie){ //动态评论                                
    let times = Date.now()
    return request({
        method:'post',
        url:'/comment/event?times='+times,
        data:{
            threadId,
            cookie,
        }
    })
}
export  function publish_event(threadId,content,cookie,){   //发送评论
    let times = Date.now()
    return request({
        method:'post',
        url:'/comment?times='+times,
        data:{
           t:1,   //1 发送 2 回复
           type:6,
           threadId:threadId,
           content:content,
           cookie:cookie,
        }
    })
}
export  function reply_event(threadId,commentId,content,cookie){   //回复评论
    let times = Date.now()
    return request({
        method:'post',
        url:'/comment?time='+times,
        data:{
           t:2,   //1 发送 2 回复
           type:6,
           threadId:threadId,
           commentId:commentId,
           content:content,
           cookie:cookie,
        }
    })
}