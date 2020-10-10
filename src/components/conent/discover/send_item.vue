<template>
  <div class="send_item" >
       <ul class='send_center' v-if="!isshow">
          <li v-for='(item,index) in sendlist' @click='jumpdetail(item)'
          :key="index" :style="{width:wwidth*0.32+'px',height:wwidth/5.5 + 'px',transition:'all 0.5s'}"> 
             <div class="img_mask">
                <div class="mask" v-show="isbool">
                  {{item.copywriter}}
                </div>
                 <img :src="item.coverImgUrl||item.picUrl||item.cover" >
                <p>
                  <span></span>
                  <span>{{item.playCount}}</span>
                </p>
             </div>
              <div>{{item.name}}</div>
              <span class="send_item_bottom" v-for="(item,index) in item.artists" :key="index">
                  {{item.name}}
              </span>
          </li>
      </ul>
       <ul class='send_center' v-if="isshow" >
          <li v-for='(item,index) in sendlist' @click='jumpdetail(item)'
           :key="index" >
             <div class="img_mask">
                <div class="mask" v-show="isbool">
                  {{item.copywriter}}
                </div>
                 <img :src="item.coverImgUrl||item.picUrl||item.cover" >
                <p>
                  <span></span>
                  <span>{{item.playCount}}</span>
                </p>
             </div>
              <div>{{item.name}}</div>
              <span class="send_item_bottom" v-for="(item,index) in item.artists" :key="index">
                  {{item.name}}
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        sendlist: {
            type: Array,
        },
        isbool:{type:Boolean},
        isshow:{type:Boolean},
    },
    computed: {
      ...mapGetters(['wwidth'])
    },
    methods: {
      jumpdetail(item){
        this.$router.push({path:`/mvdetail/${item.id}`})  // 跳转MV 详情页
      }
    }

}
</script>
<style lang="less" scoped>
.send_item{
       width: 100%;
       margin-top:13px;
       position: relative;
    .send_center{
        width: 100%;
        display: flex;
        margin-top: 10px;
        justify-content:space-between;
        flex-wrap: wrap;
        li{
            list-style: none;
            width: 240px;
            height: 140px;
            margin-bottom: 70px;
            .img_mask{
                width: 100%;
                height: 100%;
                position: relative;
                .mask{
                    width: 100%;
                    height: 40px;
                    position: absolute;
                    top:0px;
                    transform: scaleY(0);
                    background-color: rgba(0, 0, 0, 0.2);
                    transform-origin: center top;
                    color: white;
                    line-height: 40px;
                }
                img{
                width: 100%;
                height: 100% ;
            }
            &:hover .mask{
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
           
            p{
                width: 100%;
                position: absolute;
                top: 0;
                display: flex;
                justify-content: space-between;
                span{
                    display: inline-block;
                    padding: 2px 8px;
                    color:white;
                }
            }
            div{
                font-size: 13px;
                padding: 2px 0;
            }
            .send_item_bottom{
                font-size: 12px;
                color: #666;
            }
           
        }
    }
   }
</style>