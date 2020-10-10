<template>
  <div class="mv" >
    <div class="ul">
      <div class="li" v-for="(item, index) in 10" :key="index"  :class="{active:wwidth > 1000}" >
        <div class="small">
         <img src="~assets/image/song.png" >
          <div class='icon'>
            <i class="iconfont icon-shipin "></i>
            <span>1975</span>
          </div>
          <span class='time'>00:22</span>
        </div>
       <div class="text">
         <span>曹操哦曹操草丛</span>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvlist: {
      type: Array,
    }
  },
   computed: {
    wwidth(){
      return this.$store.state.wwidth
    },

  },
}
</script>

<style lang="less" scoped>
.mv{
  .ul{
   padding: 30px 0 30px 0;
   display: flex;
   flex-wrap: wrap;
   .li{
      flex: 0 0 25%;
     .small{
       width: 160px;
       height: 90px;
       position: relative;
       img{
         width: 100%;
         height: 100%;
       }
       .icon{
         position:absolute;
         top: 0;
         right: 0;
         color: white;
         font-size: 13px;
         padding: 5px;
         background-color: rgba(0, 0, 0, 0.2);
       }
       .time{
         position:absolute;
         bottom:0;
         left:0;
         color: white;
         font-size: 13px;
         padding: 3px;
       }

     }
     .text{
       overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding-top: 6px;
     }
   }
  }
}
.active{
  flex:0 0 12.5% !important;
}
</style>