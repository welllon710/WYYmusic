<template>
  <div class="dish">
    <div class="center">
    <span>本周新碟</span>
     <div class='ul'>
           <div v-for="(item, index) in list" :key="index" class="li" 
           :class="{change:wwidth > 880}" @click="$router.push({path:`/discover/detail/${item.id}`})">  
            <div class="smallbox" :class="{active:wwidth > 880}">
                <img :src="item.coverUrl" >
                <img src="~assets/image/播放.png" class='play'>
            </div>
            <div class='songs_text'>
              <div>{{item.albumName}}</div>
               <div>{{item.artistName}}</div>
            </div>
          </div>
     </div>
    </div>
  </div>
</template>

<script>
import ItemImg from "../../songsheet/s_h_com/itemimg";
import { mapGetters } from 'vuex';
export default {
  props: {
    list: {
      type: Array,
      
    }
  },
    components: {
        ItemImg,
    },
     computed: {
    ...mapGetters([
      'wwidth',
    ])
  },
}
</script>

<style lang="less" scoped>
.dish{
  height: 100%;
  .center{
    display:flex;
     span{
       display: inline-block;
       width: 50px;
       height: 100%;
       font-size: 18px;
       padding-top: 10px;
     }
     .ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0.625rem;
        .li {
          list-style: none;
          width: 168px;
          height: 238px;
          cursor: pointer;
           .smallbox{
              display: flex;
              width: 140px;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              border-bottom: 0.0625rem solid #e5e5e5;
              position: relative;
               &::after{
            content: "";
            background:url('../../../../../assets/image/dish.png') no-repeat  ;
            position:absolute;
            top: 0;
            right: -28px;
            width: 28px;
            height: 100%;
            background-position-y: center;
          }
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
            img{
                width: 100%;
                height: 100%;
            }
           }
           .songs_text{
                font-size: 0.8125rem;
                padding: 0.3125rem 0;
            }
        }
      }
  }
}
.active{
  width: 168px !important;
  transition:.5s;
}
.change{
  height: 258px !important;
  transition:.5s;
}
</style>