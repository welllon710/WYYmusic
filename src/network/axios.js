import request from './request';
let time = Date.now()
export  function search(keywords,limit ){ //搜索
    return request({
        method:'get',
        url:'/search',
        params:{
            keywords,
            limit ,
        }
        
    })
}
export  function searchDetail(){  
    return request({
        method:'get',
        url:'/search/hot/detail',
    })
}
export  function starlogin(phone,password){  //登录
    return request({
        method:'get',
        url:'/login/cellphone',
        params:{
            phone,
            password,
            time:time
        }
    })
}
export  function userid(uid){   //用户歌单
    return request({
        method:'get',
        url:'/user/playlist',
        params:{
            uid 
        }
    })
}
export  function endlogin(){  //退出登录
    return request({
        method:'get',
        url:'/logout',
    })
}
export  function sign(cookie){  //签到
    return request({
        method:'get',
        url:'/daily_signin',
        params:{
            type:1,
            cookie
        }
    })
}
export  function getswipe(){  //获取轮播
    return request({
        method:'get',
        url:'/banner',
    })
}
export  function everyday_sheet(cookie){   //获取每日推荐歌单
    return request({
        method:'get',
        url:'/recommend/resource',
        params:{
            cookie,
            time:time
        }
    })
}
export  function login_state(cookie){   //获取登录状态
    return request({
        method:'get',
        url:'/login/status',
        params:{
            cookie,
            time:time,
           
        }
    })
}
export  function everyday_song(cookie){   //获取每日推荐歌曲
    return request({
        method:'get',
        url:'/recommend/songs',
        params:{
            cookie,
            time:time
        }
    })
}
export  function sendOut(){  //独家放送
    return request({
        method:'get',
        url:'/personalized/privatecontent',
    })
}
export  function newsheet(){  //推荐歌单
    return request({
        method:'get',
        url:'/personalized',
    })
}
export  function newMusic(){  //推荐音乐
    return request({
        method:'get',
        url:'/personalized/newsong',
    })
}
export  function recommendMv(){  //推荐mv
    return request({
        method:'get',
        url:'/personalized/mv',
    })
}
export  function redio(){  //主播电台
    return request({
        method:'get',
        url:'/personalized/djprogram',
    })
}
//////////////// 分割线 //////////////////// 
//歌单类

export  function hot(){  //热门歌单
    return request({
        method:'get',
        url:'/playlist/hot',
    })
}
export  function whole(){  //全部歌单
    return request({
        method:'get',
        url:'/playlist/catlist',

    })
}
export  function excellent(offset,limit,cat){  //精选歌单优参数
    return request({
        method:'get',
        url:'/top/playlist',
        params:{
            offset,
            limit,
            cat,
            time:time
        }
    })
}
///////////////////////电台栏目///////////////////////////////
export  function radiobanner(){  //全部歌单
    return request({
        method:'get',
        url:'/dj/banner',
    })
}
export  function hotradio(){  //听听吧这个
    return request({
        method:'get',
        url:'/dj/hot',
        params:{
            limit:6
        }
    })
}
export  function payradios(){  //付费精品
    return request({
        method:'get',
        url:'/dj/toplist/pay',
        params:{
            limit:4
        }
    })
}
export  function catelist(){  //电台分类
    return request({
        method:'get',
        url:'/dj/catelist',
    })
}
export  function re_radio(){  //电台分类
    return request({
        method:'get',
        url:'/dj/recommend',
    })
}
export  function create(){  //电台分类
    return request({
        method:'get',
        url:'/dj/recommend/type?type=2001',
    })
}
export  function electronics(){  //3d垫子 
    return request({
        method:'get',
        url:'/dj/recommend/type?type=10002',
    })
}
export  function twod(){  //二次元 
    return request({
        method:'get',
        url:'/dj/recommend/type?type=3001',
    })
}
export  function story(){  //故事 
    return request({
        method:'get',
        url:'/dj/recommend/type?type=2',
    })
}
export  function emotion(){  //调频 
    return request({
        method:'get',
        url:'/dj/recommend/type?type=3',
    })
}
////////////////// 排行榜////////////////////////////////
export  function listall(){  //所有排行榜
    return request({
        method:'get',
        url:'/toplist',
        params:{
            // time:time
        }
    })
}
export  function newlist(id){  //热歌 飙升 新歌 等榜单
    return request({
        method:'get',
        url:'/playlist/detail',
        params:{
            id,
            // time:time
        }
    })
}
export  function singer(){  //歌手榜
    return request({
        method:'get',
        url:'/toplist/artist',
    })
}
////////////////歌手分类/////////////////////////
export  function singers(area,type){  //歌手榜
    return request({
        method:'get',
        url:'/artist/list',
        params:{
            area,
            type
        }
    })
}
//////////////////最新音乐/////////////////////////
export  function newest(type){  //歌手榜
    return request({
        method:'get',
        url:'/top/song',
        params:{
            type
        }
    })
}
export  function newdish(){  //新碟榜
    return request({
        method:'get',
        url:'/album/list',
        
    })
}
export  function songdetail(ids){  //新碟榜
    return request({
        method:'get',
        url:'/song/detail',
        params:{
            ids
        }
        
    })
}
///////////////////获取音乐URL

export  function geturl(id){ //获取URL
    let time = Date.now()
    return request({
        method:'post',
        url:'/song/url?time='+time,
        data:{
            id
        }
        
    })
}