<template>
  <div class="bigbox">
    <div class="recommend_songs" :style="{width:setwidth +'px',transformOrigin:'0% 0%'}">
      <top>
          <span slot="left">推荐歌单</span>
          <span slot="right" @click='songs'>更多</span>
      </top>
      <div class="songs_center">
        <div class="songs_center_ul"> 
          <div class="li" :style="{width:0.18* setwidth+'px',height:0.28* setwidth + 'px',transformOrigin:'0% 0%'}"
          @click="jump"
          >
            <div class="smallbox" :style="{width:0.18* setwidth+'px',height:0.18* setwidth + 'px',transformOrigin:'0% 0%'}" >
             <div class="mask">11111</div>
              <p class="week">{{ a[day] }}</p>
              <p class="day">{{ getdata }}</p>
            </div>
            <div class='songs_text'>
                每日歌曲推荐
            </div>
          </div>
          <div v-for="(item, index) in listlength(songSheet)" :key="index" class="li" ref="song" 
          @click='jumpdetail(item)'
          :style="{width:0.18* setwidth+'px',height:0.28* setwidth + 'px',transformOrigin:'0% 0%'}">  
            <div class="smallbox" :style="{width:0.18* setwidth+'px',height:0.18* setwidth + 'px',}">
                <div class="mask">{{item.copywriter}}</div>
                 <div class='mask_headset'>
                      <img src="~assets/image/耳机.png" alt="">
                      <span>{{getsells(item.playcount)}}</span>
                 </div>
                <img :src="item.picUrl" class="setimg" :style="{width:0.18* setwidth+'px',height:0.18* setwidth + 'px',transformOrigin:'0% 0%'}" >
                <img src="~assets/image/播放.png" class='play'>
            </div>
            <div class='songs_text'>
                {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  everyday_sheet,
  newsheet,
} from "../../../network/axios";
import { mapGetters } from "vuex";
import top from "../top/top";
import reSongsItem from "./send_item";
export default {
  data() {
    return {
      person: [],
      getdata: new Date().getDate(), //获取 日
      a: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      day: new Date().getDay(), //获取周几
      songSheet:[],
    };
  },
  props: {
    wwdith: {
      type: Number,
    }
  },
  components: {
    top,
    reSongsItem
  },
  computed: {
    setwidth(){
      if(this.wwdith > 1040){
        this.wwdith = 1040
      }
      if(this.wwdith < 762){
        this.wwdith = 762
      }
      return this.wwdith
    },
    cookie(){
      return this.$store.state.profile.cookie
    }
  },
  mounted() {
    this.getnewsheet()
  },

  methods: {
    listlength(item){
          if(item.length >= 9){
            return  item.slice(0,9)
          }else{
              return item
          }
      },
      getsells(sell){
        let num 
        if (sell > 9999) {
        num = (Math.floor(sell/1000)/10) + '万'
        }else{
            num = sell
        }
            return num
    },
    getlogin_staus(cookie) {
      login_state(cookie).then((res) => {
        //获取登录状态
      });
    },
    getnewsheet(){  //获取歌单
      newsheet().then(res=>{
        this.songSheet = res.result
      })
    },
    jump(){
      this.$router.push('/discover/every')
    },
    jumpdetail(item ){
      this.$router.push({path:`/discover/detail/${item.id}`})
    },
    songs(){
      this.$router.push('/discover/songs')
    }
  },
  
};

</script>

<style lang="less" scoped>
.bigbox {
  width: 100%;
  display: flex;
  justify-content: center;

  .recommend_songs {
    width: 762px;
    max-width: 1040px;
    min-width: 762px;
    transition: 0.5s;
    .songs_center {
      .songs_center_ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0.625rem;
        .li {
          list-style: none;
          width: 138px;
          // max-width: 193px;
          height: 214px;
          // max-height: 270px;
           min-width: 138px;
          min-height: 214px;
          cursor: pointer;
           .smallbox{
            width: 138px;
           
            height: 138px;
            min-width: 138px;
            min-height: 138px;
         
            border: 0.0625rem solid #e5e5e5;
            position: relative;
            .play{
            width: 30px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            position:absolute;
            bottom: 0.375rem;
            right: 0.375rem;
            opacity: 0;
          }
            &:hover .play{
            opacity: 1;
          }
            .mask_headset{
                position: absolute;
                right: 0;
                opacity: 1;
                font-size: 0.625rem;
                color: white;
                background-color: rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                background-image: linear-gradient(to right, rgba(240, 235, 235, 0.1) , rgba(0, 0, 0, 0.4));
                img{
                    width: 15px;
                    height: 15px;
                }
            }
            &:hover .mask_headset{
                opacity: 0;
                transition:.8s
            }
            .setimg{
                width: 138px;
                height: 138px;
                min-width: 138px;
                min-height: 138px;
               
            }
            &:hover .mask {
              animation: move 0.8s;
              animation-fill-mode: forwards;
              opacity: 0;
              cursor: pointer;
              @keyframes move {
                0% {
                  transform: scaleY(0);
                  opacity: 0;
                }
                50% {
                  transform: scaleY(0);
                  opacity: 0;
                }
                70% {
                  transform: scaleY(0);
                  opacity: 0;
                }
                100% {
                  transform: scaleY(1);
                  opacity: 1;
                }
              }
            }
           }
           .songs_text{
              font-size: 0.8125rem;
              padding: 0.3125rem 0;
            }
          &:nth-child(1) {
            .smallbox {
              height: 138px;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              border-bottom: 0.0625rem solid #e5e5e5;
              .day {
                font-size: 4.375rem;
                color: #c62f2f;
              }
              .week {
                font-size: 0.9375rem;
                color: #666666;
                margin-top: 1.0625rem;
              }

            }
          }
        }
      }
    }
  }
  .mask {
    display: inline-block;
    width: 100%;
    position: absolute;
    top: 0;
    font-size: 0.875rem;
    color: white;
    padding:0.625rem 0; 
    background-color: rgba(0,0,0,.3);
    transform: scaleY(0);
    transform-origin: center top;
    animation: end 0.8s;
    @keyframes end {
      0% {
        transform: scaleY(0);
        opacity: 1;
      }
      50% {
        transform: scaleY(0);
        opacity: 0;
      }
       80% {
        transform: scaleY(0);
        opacity: 0;
      }
      100% {
        transform: scaleY(0);
        opacity: 0;
      }
    }

  }
}
.item{
  position: absolute;
}
</style>
