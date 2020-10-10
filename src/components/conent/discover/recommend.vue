<template>
  <div class="recommend">
    <div class="recommend_top">
      推荐
    </div>
    <ul class="rd_item">
      <li
        v-for="(item,index) in list"
        :key="index"
        @click="getindex(index)"
      >
        <span>{{ item.iid }}</span>
      </li>
    </ul>
   <div class="re_img">
      <img src="~assets/image/music.png" />
      <img src="~assets/image/video.png" />
      <img src="~assets/image/friend.png" />
    </div>

     <div class="recommend_top">
      我的音乐
    </div>
    <ul class="rd_item">
      <li
        v-for="(item,index) in mylist"
        :key="index"
        @click="getindex(index)"
      >
        <span>{{ item.iid }}</span>
      </li>
    </ul>
    <div class="re_img_two">
      <img src="~assets/image/music.png" />
      <img src="~assets/image/FM.png" />
      <img src="~assets/image/live.png" />
      <img src="~assets/image/video.png" />
    </div>
     <div class="recommend_top">
      我喜欢的音乐
      <div class="love" v-show="isfalse" >
      <i class="iconfont icon-xihuan">
        <span @click="jumpdetail"> 我喜欢的音乐</span>
      </i>

    </div>
    </div>
    <div class="playmusic" @click="jumplyric" v-show="backlist.length!==0">
      <div class="p_left">
        <img  :src="backlist[backindex].img" v-if="backindex > -1 ">
        <img src="" alt=""  v-else>
      </div>
      <div class="p_right">
        <div class="one">
          <span v-if="backindex > -1 ">{{backlist[backindex].name}}</span>
           <span  v-else>我是歌名</span>
          <i class="iconfont icon-xihuan"></i>
        </div>
        <div class="two">
          <span v-if="backindex > -1 ">{{backlist[backindex].author}}</span>
          <span   v-else>我是作者</span>
         <i class="iconfont icon-fenxiang_2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { userid } from "../../../network/axios";
export default {
  data() {
    return {
      list: [
        { address: "/discover", iid: "发现音乐" },
      
       
        { address: "/video", iid: "视频" },
        { address: "/friends", iid: "朋友" },
      ],
      mylist:[
         {  iid: "我的音乐" },
        {iid: "下载管理" },
        { iid: "我的音乐云盘" },
        {iid: "我的收藏" },
      ],
      id:'',
    };
  },
  computed: {
    ...mapGetters([
      'backurl','personmeg','backindex','backhistory','backalldata'
    ]),
    getid(){
      if(this.backhistory){
         return this.backurl[this.backindex].id  //获取音乐ID 跳转路由
      }else{
         return this.backalldata[this.backindex].id  //获取音乐ID 跳转路由
      }
    },
    backlist(){
      if(this.backhistory){
        return this.backurl
      }else{
        return this.backalldata
      }
    },
    isfalse(){  //判断是否登录了，控制显示我喜欢的音乐
      if(Object.keys(this.personmeg).length!==0){
        return true
      }else{
        return false
      }
    }
  },
  mounted () {
    let ids = this.personmeg.id
    if(this.isfalse){   //跳转个人详情页
      this.getuserid(ids)
    }
  },
  methods: {
    getindex(index) { //简单的路由跳转
      if(this.$route.path !== this.list[index].address){
        this.$router.push(this.list[index].address) 
      }
    },
    jumpdetail(){ //跳转个人详情页
    console.log(this.id);
    console.log('tiaozhuan');
      this.$router.push({path:`/discover/detail/${this.id}`})
    },
    jumplyric(){
      this.$router.push({path:`/lyric/${this.getid}`}) //跳转歌词界面
    },
    getuserid(ids){ //获取用户歌单
      userid(ids).then(res=>{
        console.log(res);
        this.id = res.playlist[0].id
      })
    },
  },
  watch: {
    isfalse(value){
      if(value){
        this.getuserid(this.personmeg.id)
      }
    }

  },
};
</script>

<style lang="less" scoped>
.recommend {
  position: relative;
  width: 12.5rem;
  min-width: 12.5rem;
  background-color: #f5f5f7;
  box-sizing: border-box;
  height: calc(100% - 48px - 50px);
  .recommend_top {
    width: 100%;
    height: 2rem;
    font-size: 0.9375rem;
    line-height: 2rem;
    text-indent: 0.625rem;
    color: #7d7d7d;
  }
  .rd_item {
    li {
      list-style: none;
      height: 2rem;
      width: 100%;
      text-indent: 2.8125rem;
      font-size: 0.875rem;
      color: #5c5c5c;
      line-height: 2rem;
      cursor: pointer;
      &:hover{
         background-color: #e6e7ea;
        color: black !important;  
      }
    }
  }
  .re_img {
    padding-top: 0.5rem;
    img {
      width: 1.25rem;
      height: 1.25rem;
      padding-left: 0.9375rem;
      &:nth-child(1) {
        position: absolute;
        top: 2.4375rem;
        left: 0;
      }
      &:nth-child(2) {
        position: absolute;
        top: 4.25rem;
        left: 0;
      }
      &:nth-child(3) {
        position: absolute;
        top: 6.25rem;
        left: 0;
      }
      &:nth-child(4) {
        position: absolute;
        top: 8.3125rem;
        left: 0;
      }
      &:nth-child(5) {
        position: absolute;
        top: 10.25rem;
        left: 0;
      }
    }
  }
  .re_img_two {
    padding-top: 8px;
    img {
      width: 20px;
      height: 20px;
      padding-left: 15px;
      &:nth-child(1) {
        position: absolute;
        top: 174px;
        left: 0;
      }
      &:nth-child(2) {
        position: absolute;
        top:206px;
        left: 0;
      }
      &:nth-child(3) {
        position: absolute;
        top: 238px;
        left: 0;
      }
      &:nth-child(4) {
        position: absolute;
        top: 270px;
        left: 0;
      }
    }
  }
  .playmusic{
  height: 60px;
  width: 200px;
  background-color: #f5f5f7;
  position: absolute;
  bottom: 0;
  display: flex;
  &:hover .p_left img{
    background-color: rgba(0, 0, 0, 0.3);
    }
  .p_left{
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
    width: 44px;
    height: 44px;
    background-color: salmon;
    }
  }
  .p_right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span{
      font-size: 13px;
      color: #333;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    i{
      font-size: 16px;
    }
    .one{
      display: flex;
      justify-content: space-between;
      padding: 4px 4px 4px 0
  
    }
    .two{
      display: flex;
      justify-content: space-between;
      padding: 2px 4px 4px 0;
      span{
        color:#7c6693;
      }
    }

  }
}
}
.love{
  padding: 5px 10px;
  height: 100%;
  span{
    font-size: 15px;
  }
  i{
    font-size: 20px;
  }
}

</style>
