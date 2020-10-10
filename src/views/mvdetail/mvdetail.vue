<template>
  <div class="bigbox">
    <div class="mvdetail">
      <div class="left">
        <div class="title">
          <i class="iconfont icon-zuo  " @click='$router.go(-1)'></i>
          <span>MV</span>
          <span>{{mvlist.name}}</span>
          <span>{{mvlist.author}}</span>
        </div>
        <video :src="mvlist.url" width="690" height="390" controls autoplay  preload='auto' ></video>
        <div class="laber">
          <span>
            <i class="iconfont icon-dianzan  "></i>
            赞
          </span>
          <span>
            <i class="iconfont icon-wenjian   "></i>
            收藏({{mvlist.subCount}})
          </span>
          <span>
            <i class="iconfont icon-fenxiang_2 "></i>
            分享({{mvlist.shareCount}})
          </span>
          <span>
            <i class="iconfont icon-xiazai "></i>
            下载
          </span>
        </div>
        <comment :list='hot' :comslist='coms' :allpage='total' :iscontent='false' @jump='gettext'
        @input='getinput' ref="focus"
         @comreply='backreply'></comment>
      </div>
      <div class="right">
        <div class="r_top">
          <h3>MV介绍</h3>
          <div class='time'>
            <span>发布时间:{{mvlist.publishTime}}</span>
             <span>播放次数:{{mvlist.playCount}}次</span>
          </div>
          <div class='txt'>
            简介：{{mvlist.desc}}
          </div>
        </div>
        <div class="r_buttom">
          <h3>相关推荐</h3>
          <div class='meg' v-for="(item,index) in cc(similist)" :key="index">
            <img :src="item.img" alt="">
          <div class="r_right">
            <p class='tit'>
              <span>MV</span>
              <span>{{item.name}}</span>
            </p>
            <p>{{item.duration}}</p>
            <p>{{item.author}}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "../lyric/child/comment";
import {Mvdetails,Simimv} from './mvdetail';
import { mvcomment,hotcomment,mvdetail,mvurl,mvsimi,publish_,reply_} from "../../network/detail";
export default {
  data() {
    return {
     coms: [],
     hot:[],
     mvlist:[],
     similist:[],
     total:0,
     jumppage:0, //偏移量 0*20  1*20，
     text:'',
     commonid:{},
     keyinput:false,
     isbool:false,
    }
  },
  components: {
    comment,
  },
  computed: {
    urlid(){
      return parseInt(this.$route.params.id) //MVID，感觉可以抛弃
    },
  },
  activated() {
    this.getmvcomment(this.urlid,0) //普通
    this.gethotcomment(this.urlid,1) //热门
    this.getmvdetail(this.urlid) //mv 详情
    this.getmvsimi(this.urlid) //相似MV
    this.$store.commit('getbool',false)
    this.$bus.$emit('pause')

  },
  deactivated() {
     this.$bus.$emit('play')
      this.$store.commit('getbool',true)
  },
  methods: {
    getmvcomment(id,offset){ //获取普通评论
      mvcomment(id,offset).then(res=>{
      this.coms = res.comments
      this.total = res.total  //总数量
      })
    },
    gethotcomment(id,type){   //热门评论
      hotcomment(id,type).then(res=>{
        this.hot = res.hotComments
      })
    },
    getmvdetail(id){ //mv详情
      mvdetail(id).then(res=>{
      let id = res.data.id
      mvurl(id).then(ress=>{
      this.mvlist = new Mvdetails(res.data,ress.data)
      })
      })
    },
    getmvsimi(id){ //相似MV
      mvsimi(id).then(res=>{
        this.similist = res.mvs
      })
    },
    gettext(txt){      //获取文本内容
      let cookie = this.$store.state.profile.cookie
     if(!this.isbool){
       console.log('我是发送');
        publish_(this.urlid,txt,cookie,1).then(res=>{ //发送评论
         if(res.code === 200){
          setTimeout(() => {
            this.getmvcomment(this.urlid,0)
          }, 200);
          }
      })
     }else{
      console.log('我是回复');
      let a =  txt.split(':')[1]  //截取回复内容
      reply_(this.urlid,this.commonid.commentid,a,cookie,1).then(res=>{ //回复评论
          if(res.code === 200){
          setTimeout(() => {
            this.getmvcomment(this.urlid,0)
          }, 200);
          }
      })
     }
    },
    backreply(res){  //点击回复
      console.log(res);
      this.commonid = res
      this.isbool = true
      this.$refs.focus.focus()
    },
    getinput(){
      this.keyinput = true
    },
    cc(arr){
        let k = null
        let comments = []
        arr.map((item,index)=>{
         k = new Simimv(item)
         comments[index] = k 
        })
        return comments
    },

  }
};
</script>

<style lang="less" scoped>
.bigbox {
  width: 100%;
  min-width: 1024px;
  display: flex;
  justify-content: center;
  position: relative;
  height: calc(100% - 48px - 50px);
  overflow-y: auto;
  .mvdetail {
    width: 985px;
    height: 100%;
    margin-top: 15px;
    display:flex;
    .left{
      width: 690px;
    .title {
      margin-bottom: 15px;
      span {
        &:nth-child(2) {
          color: #e03f40;
          font-size: 13px;
          border: 1px solid #e03f40;
          padding: 0 3px;
          margin: 0 5px;
        }
        &:nth-child(3) {
          font-size: 17px;
        }
        &:nth-child(4) {
          font-size: 13px;
          margin-left: 8px;
        }
      }
    }
    .laber {
      margin: 15px 0 50px 0;
      span {
        border: 1px solid #e1e1e2;
        font-size: 15px;
        padding: 2px 4px;
        border-radius: 5px;
        margin-right: 8px;
      }
    }
    }
    .right{
      flex: 1;
      max-width: 258px;
      margin: 5px 0 0 35px;
      .r_top{
        font-size: 13px;
        color: #666;
        height: 160px;
        h3{
          font-size: 18px;
          color:black;
          font-weight: 400;
          padding-bottom: 8px;
          border-bottom: 1px solid #e1e1e2;
        }
        .time{
          padding: 10px 0 12px 0;
          display: flex;
          justify-content:space-between;
        }
        .txt{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }

      }
      .r_buttom{
        margin-top: 30px;
        h3{
          font-size: 18px;
          color:black;
          font-weight: 400;
          padding-bottom: 8px;
          border-bottom: 1px solid #e1e1e2;
        }
        .meg{
          width: 100%;
          display: flex;
          margin: 12px 0;
            img{
              width: 121px;
              height: 68px;
              background-color: #e03f40;
            }
            .r_right{
              margin-left: 10px;
              width: 140px;
              .tit{
                font-size: 10px;
                color: black;
                width: 100%;
                span{
                  word-wrap: break-word;
                  &:nth-child(1){
                    padding: 0 4px;
                    margin-right: 5px;
                    color:#e03f40;
                    border: 1px solid #e03f40;
                  }
                 

                }
              }
              p{
               font-size: 13px;
               color: #666;
              }
            }
          
        }
      }
    }
  }
}
</style>
