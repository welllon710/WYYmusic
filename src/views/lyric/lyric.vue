<template>
  <div class="bigbox">
  <div class="lyric">
   <div class="top">
      <div class="left">
      <div class="desc">
        <img src="~assets/image/koutu.png" class='needle' :class="{active:backbool}">
       <div class='imgall'>
        <img src="~assets/image/koutu1.png" alt="" class='record' :style="{transform: musicRotate}">
        <img :src="backnow.img" class='prlimg' :style="{transform: musicRotate}" v-if="backnow">
       </div>
      </div>
      <div class='tab'>
        <span v-for="(item,index) in arr" :key="index">
          <i :class="classname[index]"></i>
          {{item}}
        </span>
      </div>
    </div>
    <div class="right">
      <lrc :list='lrcarr' :timelist='timearr'></lrc>
    </div>
   </div>
  <div class="bottom">
   <div class="b_left">
      <comment :list='hot' :comslist='coms' :allpage='total' @subnum='subcount' @addnum='addcount'
      @keyboard='board' @comreply='backreply' @help='gethelp(arguments)' :sethelp='help' ref="com"
      :iscontent='true'
      ></comment>
   </div>
   <div class="b_right">
     我是右边内容
   </div>
  </div>
  </div>
 <div v-if="isshow"> 
   <publish @colses='ffff' :isshows='isinput' @starreply='replys'>
   <span slot="title">歌曲：{{backnow.name}}</span>
   <textarea  slot='text' placeholder="发表评论" v-model="text"></textarea>
   </publish>
 </div>
  <div v-if="isreply"> 
   <publish @colses='ffff' @starreply='replys' :isshows='isinput'>
   <span slot="title">回复:{{commonid.name}}</span>
   <textarea  slot='text' placeholder="回复评论" v-model="text"></textarea>
   </publish>
 </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { lyricdetail } from "../../network/detail"
import lrc from './child/lyc';
import comment from './child/comment';
import { hotcomment,totalcomment,publish_,reply_,songdetail, } from "../../network/detail";
import  Comments  from "./child/comments";
import publish from './child/publish';
export default {
  data() {
    return {
      reg:/^\[(\d{2}:\d{2,})\.\d{2,}\](.*)$/,
      arr:['喜欢','收藏','下载','分享'],
      timearr:[],
      lrcarr:[],
      classname:['iconfont icon-shoucang1','iconfont icon-wenjian ','iconfont icon-xiazai ','iconfont icon-fenxiang_2 '],
      timeout: null,//定时器
      musicNum: 0,//初始旋转角度
      musicRotate: "rotate(" + 0 + "deg)",
      hot:[],
      total:0,
      jumppage:0, //偏移量 0*20  1*20，
      coms:[],
      isshow:false,
      text:'',
      isreply:false,
      commonid:{},
      help:false,
      arr:[],

    }
  },
  inject: ['reload'],
  components: {
    lrc,
    comment,
    publish
  },
  computed: {
    urlid(){
      return parseInt(this.$route.params.id) //音乐ID，感觉可以抛弃
    },
    backid(){  //获取当前播放列表的正在播放的音乐ID
      if(this.backhistory){
         return this.backurl[this.backindex].id
      }else{
         return this.backalldata[this.backindex].id
      }
    },
     backnow(){
           if(this.backhistory){
            return this.backurl[this.backindex]
           }else{
            return this.backalldata[this.backindex]
           }
       },
    ...mapGetters(['backbool','backtime','backurl','backindex','backhistory','backalldata']),
    address(){
        const {jumppage} = this
        return {
          jumppage
        }
    },
    isinput(){  
      if(this.text===""){
        return false
      }else{
        return true
      }
    }
  },
  activated() {
    this.getlyric(this.urlid) // 获取歌词
    // this.getlyric(this.backid)
    this.getcomment(this.urlid,0) //id  页数
    this.gettotalcomment(this.urlid,0)
    this.getdetail(this.urlid) //歌曲详情
    console.log('进来了')
  },
  mounted() {
    this.rotates()
  },
  deactivated(){
    this.timearr = [],
    this.lrcarr =[]
    console.log('出去了');
  },
  methods: {
    ffff(){
      this.isreply =false
      this.isshow =false
    },
    getlyric(id){
      let arr =[]
      lyricdetail(id).then(res=>{
        console.log(res);
       res.lrc.lyric.split('\n').forEach(item=>{
          let res = this.reg.exec(item)
          if(res){
          this.timearr.push(res[1])
          this.lrcarr.push(res[2])
        }
       })
      })
    },
    getcomment(id,type){ //热门评论
      hotcomment(id,type).then(res=>{
        this.hot = res.hotComments
    })
    },
    gettotalcomment(id,offset){  //普通评论
      totalcomment(id,offset).then(res=>{
      this.coms = res.comments
      this.total = res.total  //总数量
    })
    },
    rotates(){  //转圈圈
        if(!this.backbool){
          clearInterval(this.timeout)
        }else{
        this.timeout = setInterval( ()=>{
        this.musicNum = this.musicNum + 10;
        this.musicRotate = "rotate(" + this.musicNum + "deg)";
        }, 200);
        }
      
    },
    getdetail(ids){
      songdetail(ids).then(res=>{
        console.log(res);
      })
    },
    subcount(res){  //传递页数
      this.jumppage = res 
    },
    addcount(res){
      this.jumppage = res 
    },
    board(){ //点击评论
      this.isshow = true
    },
    backreply(res){  //点击回复
      this.commonid = res
      this.isreply = true
    },
    replys(){ //回复评论
      let cookie = this.$store.state.profile.cookie
      if(this.isreply){
        reply_(this.urlid,this.commonid.commentid,this.text,cookie,0).then(res=>{
          if(res.code === 200){
           setTimeout(() => {
              this.gettotalcomment(this.urlid,0)
           },200)
            this.ffff()
          }
        })
      }
       if(this.isshow){  //发送评论
        publish_(this.urlid,this.text,cookie,0).then(res=>{
          if(res.code === 200){
          setTimeout(() => {
            this.gettotalcomment(this.urlid,0)
          }, 200);
           this.ffff()
          }
        })
      }
    },
    gethelp(value){ //点赞功能
     let cookie = this.$store.state.profile.cookie
     let index = value[1]
     let like = value[0]
      if(!like.liked){ //false
        let t = 1
        let a = like.commentid
         fabulous(t,this.urlid,a,cookie).then(res=>{
           console.log(res);
        if(res.code === 200){
          this.coms[index].liked = true  //点赞功能发送请求后，只返回code,再次对页面请求时候
          this.coms[index].likedCount+=1 //服务器依旧返回liked=false,likecount增加了1 ,说明点赞是效果的
        }
       })
        console.log('点赞了');
      }else{
        let t = 0
        let a = like.commentid
        fabulous(t,this.urlid,a,cookie).then(res=>{
          if(res.code === 200){
          this.coms[index].liked = false
          this.coms[index].likedCount-=1
        }
        })
        console.log('取消点赞了');
      }
    }

  },
  watch:{
    address(value){  //评论翻页
    console.log('index变化了');
    let a = value.jumppage * 20
    setTimeout(() => {
      this.gettotalcomment(this.urlid,a)
    }, 100);
  },
  backindex(){
    console.log('页面重置');
    if(this.$route.name === "Lyric"){
      this.$router.push({path:`/lyric/${this.backid}`})
      this.reload()
    }

  },
  backbool(value){
    if(value){
      this.rotates()
    }else{
      clearInterval(this.timeout)
    }
  }

  },
};
</script>
<style lang="less" scoped>
.bigbox{
  width: 100%;
  min-width: 1024px;
  display: flex;
  justify-content:center;
  position: relative;
  height: calc(100% - 48px - 50px);
  overflow-y: auto;
    &::-webkit-scrollbar {
    width: 10px;    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
  .lyric{
    width: 1024px;
    height: 100%;
  .top{
     display: flex;
      .left{
    width: 35%;
     margin-left: 40px;
    .desc{
      display:flex;
      flex-direction: column;
      align-items: center;
      .imgall{
        position: relative;
        height: 100%;
        .prlimg{
        width: 70%;
        height: 70%;
        position:absolute;
        left: -2px;
        top: -6px;
        right: 0;
        bottom: -4px;
        margin: auto;
        border-radius: 50%;
        transform-origin: 50% 50%;
        transition: all .4s;
      }
     .record{
        width: 310px;
        height: 310px;
        transform-origin: 50% 50%;
        transition: all .4s;
      }
    }
    
      .needle{
        width: 153px;
        position: relative;
        left: 35px;
        transform-origin: 0% 0%;
        transition: all 1.4s initial;
        z-index: 1;
      }
    }
    .tab{
      margin-top: 40px;
      display: flex;
      justify-content:space-evenly;
      span{
        display: inline-block;
        border: 1px solid #bcbabb;
        padding: 5px 10px;
        border-radius: 8px;
        font-size:13px;
        cursor: pointer;
        &:hover{
          color: red;
        }
      }
    }
  }
  .right{
    flex: 1;
    margin: 0 70px 0 90px;
  }
  }
  .bottom{
    margin: 30px 0 0 40px;
    display: flex;
    .b_left{
      width: 546px;
      margin-right: 70px;
    }
  }
}
}
.active{
  transform: rotate(24deg);
}
</style>