<template>
  <div class="playlist"  :style="{ height: backheight }">
    <div class="top">
      <div class="top_two">
        <div
          class="aa"
          v-for="(item, index) in aabb"
          :key="index"
          @click="setcolor(index)"
          :class="{ active: index === count }"
        >
          {{ item }}
        </div>
      </div>
      <span @click="setshow">x</span>
    </div>
    <div class="center">
      <span class="all" v-if="history">总{{ playlength }}首</span>
      <span class="all" v-else>总{{ alldata.length }}首</span>
      <div>
        <span>
          <i class="iconfont icon-wenjian  "></i>
          收藏全部
        </span>
        <span>
          <i class="iconfont icon-lajixiang  "></i>
          清空
        </span>
      </div>
    </div>
    <div class="bottom" v-if="history">
      <div
        class="tr"
        v-for="(item, index) in backurl"
        :key="index"
        @dblclick.prevent="seturl(item, index)"
      >
        <div class="one" v-show="backindex === index">
          <i class="iconfont icon-bofang3 "></i>
        </div>
        <div class="two">{{ item.name }}</div>
        <div class="three">{{ item.author }}</div>
        <div class="four">{{ item.time }}</div>
      </div>
    </div>
    <div class="bottom" v-else>
      <div
        class="tr"
        v-for="(item, index) in alldata"
        :key="index"
        @dblclick.prevent="seturl(item, index)"
      >
        <div class="one" v-show="backindex === index">
          <i class="iconfont icon-bofang3 "></i>
        </div>
        <div class="two">{{ item.name }}</div>
        <div class="three">{{ item.author }}</div>
        <div class="four">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    alldata: { type: Array },
  },
  data() {
    return {
      aabb: ["播放列表", "历史记录"],
      count: 0,
      history: true,
    };
  },
  computed: {
    ...mapGetters(["backurl", "backindex", "wwidth"]),
    backheight() {
      if (this.wwidth >= 1040) {
        return '70%';
      }else{
         return '60%';
      }
    },
    playlength() {
      return this.backurl.length;
    },
  },
  methods: {
    setcolor(index) {
      console.log(index);
      this.count = index;
      if (index === 0) {
        console.log("执行one");
        this.history = true;
      } else {
        console.log("two");
        this.history = false;
      }
    this.$store.commit('history',this.history)
    },
    seturl(item, index) {
      this.$store.commit('changeindex',index) //双击的inedx 提交vuex
      this.$emit("setplayurl", item, index);
    },
    setshow() {
      this.$emit("setisshow");
    },
  },
};
</script>

<style lang="less" scoped>
//578 519   578  889-49
.playlist {
  width: 578px;
  height: 519px;
  border: 1px solid #e1e1e2;
  box-shadow: 0 0 0.625rem #e2e2e2;
  background-color: #fafafa;
  position: fixed;
  right: 0;
  bottom: 50px;
  .top {
    width: 100%;
    padding: 5px 0 5px 0;
    // height: 20px;
    display: flex;
    justify-content: center;
    border: 1px solid #e1e1e2;
    position: relative;
    span {
      font-size: 20px;
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
    .top_two {
      width: 230px;
      display: flex;
      border: 1px solid #e5e5e5;
      .aa {
        width: 50%;
        text-align: center;
        // background-color:#fff;
        padding: 6px 0;
        color: #888;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    border-bottom: 1px solid #e1e1e2;
    font-size: 14px;
    color: #666;
    .all {
      padding: 5px 30px;
    }
    div {
      padding-right: 30px;
      span {
        padding-left: 15px;
        &:nth-child(2) {
          position: relative;
          &::before {
            content: "";
            width: 1px;
            height: 18px;
            position: absolute;
            top: 1px;
            left: 5px;
            background: #e1e1e2;
          }
        }
      }
    }
  }
  .bottom {
    height: calc(100% - 74px);
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
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
    .tr {
      display: flex;
      position: relative;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      &:hover {
        background-color: #00ffff;
        cursor: pointer;
      }
      .one {
        position: absolute;
        left: 5px;
        color: red;
      }
      .two {
        position: absolute;
        left: 28px;
        width: 250px;
      }
      .three {
        position: absolute;
        right: 160px;
        width: 100px;
      }
      .four {
        position: absolute;
        right: 40px;
      }
    }
  }
}
.active {
  background-color: #7c7d85 !important;
  color: white !important;
}
</style>
