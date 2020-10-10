<template>
  <div class="itemimg">
     <div class='ul'>
           <div v-for="(item, index) in allsong" :key="index" class="li" 
           :style="{width:fff/5.5+'px',height:kkk/3.88+'px'}" @click="getid(item)">  
            <div class="smallbox">
                 <div class='mask_headset' v-show="isshow">
                      <img src="~assets/image/耳机.png" alt="">
                      <span>555</span>
                 </div>
                <img :src="item.coverImgUrl||item.img1v1Url||item.coverUrl" >
                <img src="~assets/image/播放.png" class='play'>
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
    name:'item-img',
    props: {
        allsong: {
            type: Array,  
        },
        wwidth:{type:Number},
        isshow:{type:Boolean},
    },
    computed: {
     fff(){
       if(this.wwidth > 880) {
            return  880
       }else{
         return this.wwidth
       }
     },
     kkk(){
        if(this.wwidth > 840) {
            return  840
       }else{
         return this.wwidth
       }
     }
    },
    methods:{
      getid(item){
        this.$router.push({path:`/discover/detail/${item.id}`})
      } 
    }
}
</script>

<style lang="less" scoped>
.itemimg{
  width: 100%;
  display: flex;
  justify-content: center;
    .ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0.625rem;
        .li {
          list-style: none;
          width: 138px;
          height: 196px;
          cursor: pointer;
          position: relative;
           .smallbox{
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              border-bottom: 0.0625rem solid #e5e5e5;
            .play{
            width: 26px;
            height: 26px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            position:absolute;
            bottom: 66px;
            right: 6px;
            opacity: 0;
          }
            &:hover .play{
            opacity: 1;
          }
            .mask_headset{
                position: absolute;
                right: 5px;
                top: 5px;
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
                width: 100%;
                height: 100%;
            }
           }
           .songs_text{
                font-size: 0.8125rem;
                padding: 0.3125rem 0;
            }
          &:nth-child(1) {
            .smallbox {
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
</style>