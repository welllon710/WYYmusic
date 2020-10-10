<template>
  <div class="main" :style="{width:wwidth+'px'}">
    <slot name="message"></slot>
    <slot name="main"></slot>
    <mymessage></mymessage>
  </div>
</template>

<script>
import mymessage from '../../components/conent/mymessge';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'wwidth',
    ])
  },
   components: {
    mymessage,
  },
};
</script>
<style lang="less" scoped>
.main{
    flex: 1;
    position: relative;
    z-index: 1;
    min-width: 47.8125rem;
    padding: 0 1.8749rem;
    height:calc(100% - 48px - 50px);
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 10px;    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }


}
</style>