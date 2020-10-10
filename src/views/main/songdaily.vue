<template>
    <div class="songdaily">
    <div class="top">
        <div class='one' @click="gogogo">
            <span class='data'>{{a[day]}}</span>
            <span class='num'>{{getdata}}</span>
        </div>
        <div class='two'>
          <h2>每日歌曲推荐</h2>
          <h5>根据你的音乐口味生成，每天6:00更新</h5>
        </div>
    </div>
     <div class="center">            
      <div class="ul">
      <div class="top_two">
        <div class='top_left'>
          <i class="iconfont icon-bofang  "></i>
            <span>播放全部</span>
          <i class="iconfont icon-jiahao "></i>
        </div>
         <div class='top_right'>
          <i class="iconfont icon-wenjian "></i>
          <span>收藏全部</span>
         </div>
      </div>
    <detail-list :songlist='list' :times='time'></detail-list>
    </div>
      </div>
  </div>

</template>

<script>
import {everyday_song,songdetail} from '../../network/axios';
import DetailList from '../../components/conent/detail/detaillist';
export default {
   data() {
      return {
        getdata: new Date().getDate(), //获取 日
        a: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        day: new Date().getDay(), //获取周几
        list:[],
        time:[],
      }
    },
    components: {
      DetailList,
    },
  created() {
    this.getsong()
  },
  methods: {
    gogogo(){
      this.$router.go(-1)
    },
    getsong(){
      let cookie = this.$store.state.profile.cookie
      everyday_song(cookie).then(res=>{
      res.data.dailySongs.map(item=>{
        for (const key in item) {
          if(key === 'id'){
            songdetail(item[key]).then(res=>{
             this.time.push(res.songs[0].dt)
            })
          }
        }
      })
        this.list = res.data.dailySongs
      })
    },
    aaa(obj){
      for (const item in obj) {
        if(item ==='name'){
          return obj[item]
        }
      }
    },
    settime(a){
      let b = new Date(a)
    return  dateFormat('MM:SS',b)
    }

  },
  
}
</script>

<style lang="less" scoped>

.songdaily{
  width: 100%;
  height: 100%;
    .top{
        padding: 35px 0 10px 0;
        display: flex;
        min-width: 765px;
      .one{
        width: 98px;
        height: 98px;
        border: 1px solid #e1e1e2;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content:space-around;
        cursor: pointer;
        .data{
          font-size:14px;
          color: #666;
        }
        .num{
          font-size:50px;
          color: #c62f2f;
        }
      }
      .two{
        padding-left: 30px;
        h2{
          padding: 10px 0 20px 0;
          font-weight: normal;
        }
        h5{
          font-weight: normal;
        }
      }
    }
    .center{
    width: 100%;
    display: flex;
    justify-content:flex-start;
    flex-direction: column;
    .ul{
    border: 1px solid #e1e1e2;
    min-width: 765px;
    .top_two{
      display:flex;
      justify-content:space-between;
      align-items: center;
      padding: 0 15px;
      height: 40px;
      .top_left{
        background-color: #c62f2f;
        color: white;
        font-size:14px;
        padding: 3px 30px 3px 10px;
        border-radius: 5px;
         cursor: pointer;
        .icon-jiahao{
          position: relative;
          right:-20px
        }
        .icon-bofang{
          font-size: 17px;
          padding-right: 5px;
        }
      }
      .top_right{
         font-size:14px;
         border: 1px solid #e1e1e2;
         border-radius: 5px;
         padding: 3px 15px;
         cursor: pointer;
        .icon-wenjian{
          padding-right: 5px;
        }

      }
    
    }    
    }
    
    }
}

</style>