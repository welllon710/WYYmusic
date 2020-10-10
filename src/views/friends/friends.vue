<template>
  <div class="friends">
    <div class="friends_centent">
      <recommend></recommend>
      <friendsmain>
        <div class="mains" slot="main">
          <div class="left">
            <div class="top">
              <span>动态</span>
              <span>
                <i class="iconfont icon-jiahao "></i>
                写动态
                </span>
            </div>
            <trends :tlist='list' @com="getcom" :comlist='comms' @gettext='text' @reply='getreply' ref='trends'></trends>
          </div>
          <div class="right">
            <div class="r_top">
              <div class="up">
                <img src="~assets/image/song.png" alt="" />
                <span>你说气不气</span>
              </div>
              <div class="down">
                <div class="mystase">
                  <span class="num">0</span>
                  <span class="china">动态</span>
                </div>
                <div class="myfollow">
                  <span class="num">4</span>
                  <span class="china">关注</span>
                </div>
                <div class="myfans">
                  <span class="num">0</span>
                  <span class="china">粉丝</span>
                </div>
              </div>
            </div>
            <div class="r_bottom">
             <h6>
               <span>热门话题</span>
                <span>更多</span>
             </h6>
             <ul>
               <li>
                 <img src="" alt="">
                 <div>
                   <p>生活小雀桑</p>
                    <p>438人参与</p>
                 </div>
               </li>
             </ul>
            </div>  
          </div>
        </div>
      </friendsmain>
    </div>
  </div>
</template>

<script>
import recommend from "../../components/conent/discover/recommend";
import friendsmain from "../main/main";
import { event,comevent,publish_event ,reply_event} from "../../network/detail";
import trends from './child/trends';
import {Event} from './child/event';
export default {
  data() {
    return {
      lasttime: '',
      list:[],
      comms:[],
      isshow:false,
      uuid:'',
      isbool:false,
      comid:{},
    }
  },
  computed: {
    cookie(){
      return this.$store.state.profile.cookie
    }
  },
  components: {
    recommend,
    friendsmain,
    trends
  },
  mounted () {
    this.getevent(20,-1) 
  },
  methods: {
    getevent(page,lasttime){ //获取动态
      event(page,lasttime,this.cookie).then(res=>{
        console.log(res);
        this.lasttime = res.lasttime //获取下一页凭据
        this.list = this.cc(res.event)
      })
    },
    cc(arr){
        let k = null
        let comments = []
        arr.map((item,index)=>{
        let p = JSON.parse(item.json)
         k = new Event(item,p)
         comments[index] = k 
        })
        return comments
    },
    getcom(id){
      this.uuid = id
      comevent(id,this.cookie).then(res=>{
        this.comms = res.comments
      })
    },
    text(txt){
      if(!this.isbool){
        publish_event(this.uuid,txt,this.cookie,6).then(res=>{
        if(res.code === 200){
          setTimeout(() => {
            this.getcom(this.uuid)
          },200)
        }
      })
      }else{
        let a =  txt.split(':')[1]  //截取回复内容
        console.log('我是回复');
        reply_event(this.uuid,this.comid.commentid,a,this.cookie).then(res=>{
          if(res.code === 200){
          setTimeout(() => {
            this.getcom(this.uuid)
            this.isbool = false
          },200)
        }
        })
      }
     
    },
    getreply(item){ //点击回复
      this.comid = item
      this.isbool = true
    }
  

  }
};
</script>

<style lang="less" scoped>
.friends {
  position: relative;
  z-index: 2;
  height: 100%;
  .friends_centent {
    display: flex;
    width: 100%;
    height: 100%;
    .mains {
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        flex: 1;
        border-right: 1px solid #e1e1e2;
        justify-content: center;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0 10px 0;
          margin-right: 30px;
          border-bottom: 1px solid #e1e1e2;
          span {
            &:nth-child(1) {
              font-size: 20px;
            }
            &:nth-child(2) {
              font-size: 13px;
              border: 1px solid #e1e1e2;
              padding: 2px 5px;
              border-radius: 10px;
              background-color: #fff;
              i {
                color: #c62f2f;
              }
            }
          }
        }
      }
      .right {
        width: 227px;
        margin-right: -20px;
        .r_top {
          width: 240px;
          height: 165px;
          background-color: #f5f5f7;
          .up {
            padding: 20px 8px 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            span {
              font-size: 15px;
              position: relative;
              left: -10px;
            }
            .sign {
              border: 1px solid #e1e1e2;
              padding: 3px 12px;
              font-size: 12px;
              border-radius: 5px;
              cursor: pointer;
            }
          }
          .down {
            display: flex;
            justify-content: space-around;
            padding-bottom: 10px;
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .num {
              font-weight: 800;
            }
            .china {
              font-size: 13px;
              color: #666;
            }
            .mystase {
              position: relative;
              &::after {
                content: "";
                width: 1px;
                height: 35px;
                position: absolute;
                top: 0;
                left: 60px;
                background: #e1e1e2;
              }
            }
            .myfollow {
              position: relative;
              &::after {
                content: "";
                width: 1px;
                height: 35px;
                position: absolute;
                top: 0;
                left: 60px;
                background: #e1e1e2;
              }
            }
          }
        }
        .r_bottom{
          padding: 20px 10px 0 20px;
          h6{
            font-size: 14px;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
          }
          ul{
            list-style: none;
            li{
              display: flex;
              padding: 10px 0;
              img{
                background-color: pink;
                width: 45px;
                height: 45px;
                margin-right: 10px;
              }
              div{
                font-size: 13px;
                p{
                  padding-bottom: 2px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
