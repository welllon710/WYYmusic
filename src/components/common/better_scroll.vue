<template>
    <div class="wrapper" ref="wrapper" >
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll  from "better-scroll";
export default {
    name:'BScroll',
    data() {
        return {
             scroll:null
        }
    },
    methods:{
         refresh(){
           this.scroll && this.scroll.refresh()
           console.log('------');
        },
    },
    mounted() {
         this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:3,
            // pullUpLoad:this.pullUpLoad,
            pullUpLoad:true,
            click:true
        })
    },
}
</script>

<style lang="less" scoped>

</style>