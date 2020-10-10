<template>
 <div class="bigbox">
    <div class="songitem" :style="{width:wwidth+'px',transition:'.5s'}">  
      <div class="songs_center">
        <div class="songs_center_ul"> 
          <div class="li" v-if="isone">
            <div class="smallbox" >
              <img src="~assets/image/song.png" >
            </div>
            <div class='songs_text'>
                精品歌单倾心推荐，给最懂音乐的你
            </div>
          </div>

          <div v-for="(item, index) in allsong" :key="index" class="li" @click="getid(item)">  
            <div class="smallbox" >
                 <div class='mask_headset' >
                      <img src="~assets/image/耳机.png" alt="">
                      <span>{{item.playCount}}</span>
                 </div>
                <img :src="item.coverImgUrl" >
                <div class='proify'>
                  <img src="~assets/image/proify.png">
                  <span v-for="(itemm,index) in proify(item)" :key="index">{{itemm}}</span>
                </div>
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
export default {
    props: {
        allsong: {
            type: Array,
        },
        page:{type: Number},
        wwidth: {type:Number},
        isshow:{type:Boolean},
    },
    computed:{
      isone(){
        if(this.page === 0){
          return true
        }else{
          return false
        }
      },
    },
    methods: {
      proify(item){
        let abc = []
        for (const key in item.creator) {
          if(key == 'nickname'){
            abc.push(item.creator[key])
          }
        }
        return abc
      },
      getid(item){
         this.$router.push({path:`/discover/detail/${item.id}`})
      }
    }
}
</script>

<style lang="less" scoped>
.bigbox {
  width: 100%;
  display: flex;
  justify-content: center;

  .songitem {
    width: 47.8125rem;
    .songs_center {
      .songs_center_ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0.625rem;
        .li {
          list-style: none;
          width: 178px;
          height: 264px;
          cursor: pointer;
           .smallbox{
            height: 177px;
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
            width: 26px;
            height: 26px;
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
                    width: 10px;
                    height:10px;
                }
            }
            &:hover .mask_headset{
                opacity: 0;
                transition:.8s
            }
            img{
                width: 177px;
                height: 177px;
            }
            // &:hover .mask {
            //   animation: move 0.8s;
            //   animation-fill-mode: forwards;
            //   opacity: 0;
            //   cursor: pointer;
            //   @keyframes move {
            //     0% {
            //       transform: scaleY(0);
            //       opacity: 0;
            //     }
            //     50% {
            //       transform: scaleY(0);
            //       opacity: 0;
            //     }
            //     70% {
            //       transform: scaleY(0);
            //       opacity: 0;
            //     }
            //     100% {
            //       transform: scaleY(1);
            //       opacity: 1;
            //     }
            //   }
            // }
           }
           .songs_text{
                font-size: 0.8125rem;
                padding: 0.3125rem 0;
            }
          &:nth-child(1) {
            .smallbox {
              height: 177px;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              border-bottom: 0.0625rem solid #e5e5e5;
              // .day {
              //   font-size: 4.375rem;
              //   color: #c62f2f;
              // }
              // .week {
              //   font-size: 0.9375rem;
              //   color: #666666;
              //   margin-top: 1.0625rem;
              // }

            }
          }
        }
      }
    }
  }
//   .mask {
//     display: inline-block;
//     width: 7.375rem;
//     position: absolute;
//     top: 0;
//     font-size: 0.875rem;
//     color: white;
//     padding:0.625rem;
//     background-color: rgba(0,0,0,.3);
//     transform: scaleY(0);
//     transform-origin: center top;
//     animation: end 0.8s;
//     @keyframes end {
//       0% {
//         transform: scaleY(0);
//         opacity: 1;
//       }
//       50% {
//         transform: scaleY(0);
//         opacity: 0;
//       }
//        80% {
//         transform: scaleY(0);
//         opacity: 0;
//       }
//       100% {
//         transform: scaleY(0);
//         opacity: 0;
//       }
//     }

//   }
}
</style>