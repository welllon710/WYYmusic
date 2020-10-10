<template>
 <div class="bigbox">
    <div class="send_out" :style="{width:wwidth+'px'}">
      <top>
          <span slot="left">推荐放送</span>
          <span slot="right">更多</span>
      </top>
      <send-item :sendlist ='sendlist' :isshow='false'></send-item>
    </div>
 </div>
</template>

<script>
import top from "../top/top";
import SendItem from "./send_item";
import {sendOut} from '../../../network/axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            isshow: false
        }
    },
    components: {
        top,
        SendItem
    },
    props: {
        sendlist: {
            type: Array
        },
      
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
    justify-content:center;
    margin-bottom: 20px;
    .send_out{
        width: 100%;
    }
}
</style>