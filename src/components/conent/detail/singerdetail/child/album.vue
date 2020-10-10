<template>
  <div class="album" v-if="list">
   <div class='ul' v-show="isshow===0">
           <div v-for="(item, index) in list" :key="index" class="li" :class="{active:wwidth > 1000}" >  
            <div class="smallbox" >
                <img :src="item.picUrl" >
                <img src="~assets/image/播放.png" class='play'>
            </div>
            <div class='songs_text'>
              <div>{{item.name}}</div>
               <div>{{time(item.publishTime)}}</div>
            </div>
          </div>
     </div>
    <div class="twoul" v-show="isshow===1">
      <div class="tli" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="item.picUrl" alt="">
          <span>{{item.name}}</span>
        </div>
        <div class="center">
          {{item.size}}首
        </div>
        <div class="right">
          <span>发行时间</span>
          <span>{{time(item.publishTime)}}</span>
        </div>
      </div>
    </div>
    
    <div class="threeul" v-show="isshow===2">
      <div class="t_one">
         <img src="~assets/image/top50.png" alt="">
        <div class="t_one_right">
          <div class="up">
            <div>热门歌手</div>
            <div>
              <i class="iconfont icon-wenjian "></i>
               <i class="iconfont icon-wenjian "></i>
            </div>
          </div>
          <albumcom :list='hotlist'></albumcom>
          <div class='all'>
            查看全部50首>
          </div>
        </div>
      </div>
       <div class="t_one" v-for="(item,index) in albummessage" :key="index">
          <img :src="item[0].al.picUrl" alt="">
        <div class="t_one_right">
          <div class="up">
            <div>{{item[0].al.name}}</div>
            <div>
              <i class="iconfont icon-wenjian "></i>
               <i class="iconfont icon-wenjian "></i>
            </div>
          </div>
          <albumcom :list='item'></albumcom>
    
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import {dateFormat} from "../../../../common/time";
import albumcom from '../child/albumcom';
import detaillist from '../../detaillist';
export default {
  props: {
    list: {
      type: Array,
    },
    hotlist:{type:Array},
    albummessage: { type:Array},
    isshow: {
      type: Number,
      default:0
    },
  },
  components: {
    albumcom,
    detaillist
  },
   computed: {
    wwidth(){
      return this.$store.state.wwidth
    },

  },
  methods:{
     time(a){
      let b = new Date(a)
      return dateFormat('YY-mm-dd',b)
    },
  }

}
</script>

<style lang="less" scoped>
.album{
  width: 100%;
  height: 100%;
  margin-top: 20px;
.ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      
        .li {
          list-style: none;
          width: 166px;
          height: 219px;
          flex: 0 0 25%;
          cursor: pointer;
           .smallbox{
              display: flex;
              width: 138px;
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
   
     .twoul{

       .tli{
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 10px 0;
         position: relative;
         .left{
           position: relative;
           margin-left: 30px;
           display: flex;
           align-items: center;
           img{
            width: 40px;
            height: 40px;
            padding-right: 20px;
            }
            span{
              font-size: 14px;
            }
             
         }
         .center{
           width: 50px;
          position: absolute;
          left: 50%;
           font-size: 13px;
         }
         .right{
           margin-right: 120px;
           font-size: 13px;
         }
       }
     }
     .threeul{
       padding: 20px 28px 20px 30px;
      .t_one{
        display: flex;
        padding: 15px 0;
        img{
          margin-right: 61px;
          width: 150px;
          height: 150px;
        }
        .t_one_right{
            flex: 1;
            .up{
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              i{
                padding: 0 10px;
              }
              }
              .down{
                border: 1px solid #e1e1e2;
              }
           .all{
             font-size:13px;
             margin: 10px 0 0 20px;
           }
          }
        }
      
      }
   
     







}

.active{
  flex:0 0 20% !important;
}
</style>