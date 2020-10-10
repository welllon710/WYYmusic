<template>
  <div class="bigbox">
      <div class="payradio" :style="{width:wwidth+'px'}">
        <top>
            <span slot="left">付费精品</span>
            <span slot="right">更多</span>
        </top>
        <div class='paycenter' >
            <div class='payitem' v-for="(item,index) in paylist" :key="index">
                <div class="p_left">
                <img :src="item.picUrl" alt="">
                </div>
                <div class="p_right">
                <div class="p_top">
                    {{item.name}}
                </div>
                <div class="p_bottom">
                   {{item.creatorName}}
                <span>
                    ￥98
                </span>
                </div>
            </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import top from '../../../../../components/conent/top/top';
import { mapGetters } from 'vuex';
export default {
    props: {
        paylist:{
            type: Array,
        },
        paywidth:{type:Number}
    },
    components: {
        top
    },
      computed: {
        ...mapGetters([
            'wwidth',
        ])
    },
}
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 60px;
  .payradio{
   margin: 0 auto;
  }
  .paycenter{
     display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      justify-content: space-between;
      .payitem{
          display:flex;
            width: 50%;
          margin-bottom: 20px;
        .p_left{
            img{
                width: 120px;
            height: 120px;
            }
        }
        .p_right{
            padding: 0 10px;
            width: 120px;
            .p_bottom{
                display: flex;
                flex-direction: column;
                padding: 10px 0;
                span{
                    position: relative;
                    top: 25px;
                }
            }
        }
    
   }
  }
}
</style>