<template>
  <div class="similar">
      <div class="ul">
          <div class="li" v-for="(item,index) in similist" :key="index" :class="{active:wwidth > 1000}">
              <img :src="item.picUrl" alt="">
              <span>{{item.name}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        similist: {
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
.similar{
    margin-top: 20px;
    .ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        .li{
            list-style: none;
            width: 116px;
            height: 180px;
            flex: 0 0 20%;
            img{
                width: 116px;
                height: 116px; 
            }
            span{
                display: inline-block;
                text-align: center;
                width: 100%;
                font-size: 13px;
            }
        }
    }
}
.active{
  flex:0 0 10% !important;
}
</style>