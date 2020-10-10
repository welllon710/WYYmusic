<template>
  <div class="bigbox">
    <div class="recommend_mv" :style="{width:wwidth+'px'}">
      <top>
        <span slot="left">推荐MV</span>
        <span slot="right">更多</span>
      </top>
     <send-item :sendlist ='slicemv(_mvlist)' :isbool="true" :isshow='setshow'>
     </send-item>
    </div>
  </div>
</template>

<script>
import top from "../top/top";
import  SendItem  from "./send_item";
import { mapGetters } from 'vuex';
export default {
    name:'recommend_mv',
    props: {
        _mvlist: {
            type: Array,
        }
    },
    data() {
      return {
        isshow:false,
        a:3,
      }
    },
  components: {
    top,
    SendItem
  },
  computed: {
    setshow(){
      if(this.wwidth >1000){
          return  true
      }
      else{
        return false
      }
     
    },
      seta(){
        if(!this.setshow){
          this.a = 3
        }else{
          this.a = 4
        }
      return this.a
    },
     ...mapGetters([
      'wwidth',
    ])
  },
  methods: {
    slicemv(item){
          if(item.length >= this.seta){
            return  item.slice(0,this.seta)
          }else{
              return item
          }
      },
  }
};
</script>

<style lang="less" scoped>
.bigbox {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  .recommend_mv {
    margin-top: 13px;
    width: 100%;
  }
}
</style>
