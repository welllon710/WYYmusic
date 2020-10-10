<template>
  <div class="re_songs_item">
      <div class="ul" v-if="!isout">
        <div v-for="(item, index) in songslist" :key="index" class="li">  
            <div class="smallbox">
                <div class="mask">{{item.copywriter}}</div>
                 <div class='mask_headset'>
                      <img src="~assets/image/耳机.png" v-if="isshow">
                      <span>{{getsells(item.playcount)}}</span>
                 </div>
                <img :src="item.picUrl" >
                <div class="proify">
                  <img src="~assets/image/fire.png">
                  <span>{{item.subCount}}</span>
                </div>
                <img src="~assets/image/播放.png" class='play' v-if="isshow">
            </div>
           
            <div class='songs_text'>
                {{item.name}}
            </div>
      </div>  
      </div>
       <div class="ul" v-if="isout">
        <div v-for="(item, index) in songslist" :key="index" class="li" :style="{width:liwidth/6.6+'px',height:liwidth/6.6 + 'px',transition:'.5s'}">  
            <div class="smallbox">
                <div class="mask">{{item.copywriter}}</div>
                 <div class='mask_headset'>
                      <img src="~assets/image/耳机.png" v-if="isshow">
                      <span>{{getsells(item.playcount)}}</span>
                 </div>
                <img :src="item.picUrl" >
                <div class="proify">
                  <img src="~assets/image/fire.png">
                  <span>{{item.subCount}}</span>
                </div>
                <img src="~assets/image/播放.png" class='play' v-if="isshow">
            </div>
           
            <div class='songs_text'>
                {{item.name}}
            </div>
      </div>  
      </div>
  </div>
  
</template>

<script>
export default {
    props: {
        songslist: {
            type: Array,
        },
        isshow:{type:Boolean},
        isout:{type:Boolean},
        liwidth:{type:Number}
    },
    methods:{
        getsells(sell){
        let num 
        if (sell > 9999) {
        num = (Math.floor(sell/1000)/10) + '万'
        }else{
            num = sell
        }
            return num
    },
    }
}
</script>

<style lang="less" scoped>
 .re_songs_item {
        width: 100%;
        margin-top: 0.625rem;
        position: relative;
        transition: 0.5s;
  .ul{
    display: flex;
    justify-content: space-between;
    .li {
       list-style: none;
         width: 8.625rem;
          cursor: pointer;
              flex-wrap: wrap;
           .smallbox{
            // height: 8.5rem;
            width: 100%;
            border: 0.0625rem solid #e5e5e5;
            position: relative;
            .proify{
              position:absolute;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.2);
              height: 24px;
              width: 100%;
               img{
                width: 15px;
                height: 15px;
                padding: 0 5px 0 10px;
                color:white;
              }
               span{
                font-size: 12px;
                color: white;
              }
            }
            .play{
            width: 1.875rem;
            height: 1.875rem;
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
                    width: 0.9375rem;
                    height: 0.9375rem;
                }
            }
            &:hover .mask_headset{
                opacity: 0;
                transition:.8s
            }
            img{
                width: 100%;
                height: 100%;
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
              // height: 8.5rem;
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
 .mask {
    display: inline-block;
    position: absolute;
    top: 0;
    font-size: 0.875rem;
    color: white;
    width: 100%;
    height: 40px;
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

</style>