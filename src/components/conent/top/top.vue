<template>
  <div class="send_out" :style="{ width: wwidth + 'px' }">
    <div class="send_out_top">
      <div><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="more"><slot name="right"></slot></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["wwidth"]),
  },
};
</script>

<style lang="less" scoped>
.send_out {
  margin-top: 13px;
  transition: 0.5s;
  .send_out_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e1e2;
    position: relative;
    &:nth-child(1) {
      font-size: 18px;
    }
    .center {
      font-size: 14px;
      position: absolute;
      left: 85px;
      span {
        position: relative;
        padding: 0 15px;
        color:#666;
        cursor: pointer;
        &:nth-child(1){
          &::before {
          content: "";
          width: 1px;
          height: 15px;
          position: absolute;
          top: 3px;
          left: 0px;
          background: #ffffff;
        }
        }
        &::before {
          content: "";
          width: 1px;
          height: 15px;
          position: absolute;
          top: 3px;
          left: 0px;
          background: #e1e1e2;
        }
      }
    }
    .more {
      font-size: 12px;
    }
  }
}

</style>
