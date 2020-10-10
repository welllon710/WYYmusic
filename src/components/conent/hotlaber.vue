<template>
<div class="bigbox">
   <div class="hotlaber" :style="{width:wwidth+'px'}">
    <div class="_laber">
      <slot></slot>
      <div class="two">
        <span v-for="(item, index) in hotlaber" :key="index" @click="sethot(item.name||item,index)" :class="{active:index===count}">{{
          item.name ||item
        }}</span>
      </div>
    </div>
  </div>
</div>
   

</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    hotlaber: {
      type: Array,
    },
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    sethot(item,index){
      this.count = index
      this.$emit('sethot',item)
    }
  },
  computed: {
    ...mapGetters([
      'wwidth',
    ])
  },

};
</script>

<style lang="less" scoped>

.bigbox{
width: 100%;
display: flex;
justify-content:flex-start;
flex-wrap: wrap;
.hotlaber {
  margin-top: 10px;
  ._laber {
    display: flex;
    .lab {
      width: 80px;
      height: 24px;
      font-size: 12px;
      padding-right: 6px;
      line-height: 24px;
    }
    .two {
      // display: flex;
      width: 100%;
      span {
        width: 55px;
        font-size: 12px;
        padding-right: 24px;
        position: relative;
        text-align: center;
        
        cursor: pointer;
        &::after {
          content: "";
          width: 1px;
          height: 15px;
          position: absolute;
          top: 5px;
          left: -10px;
          background: #e1e1e2;
        }
      }
    }
  }
}
}
.active{
  color: red;
}
</style>
