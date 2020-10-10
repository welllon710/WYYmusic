<template>
  <div class="all">
    <div
      class="trends"
      v-for="(item, index) in tlist"
      :key="index"
      v-show="item.msg"
    >
      <div class="top">
        <img :src="item.img" />
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.showtime }}</p>
        </div>
        <span>分享单曲</span>
      </div>
      <div class="mmidle">
        <span class="txt">
          {{ item.msg }}
        </span>
        <div class="img" v-show="item.song">
          <img :src="ee(item.song)" />
          <div class="name">
            <p>{{ cc(item.song) }}</p>
            <p>{{ dd(item.song) }}</p>
          </div>
        </div>
      </div>
      <!-- <img :src="item.jpg" class='midimg' v-show="item.jpg" > -->
      <div class="bottom">
        <p>
          <span
            ><i class="iconfont icon-dianzan "></i>({{ item.likedCount }})</span
          >
          <span
            ><i class="iconfont icon-fenxiang_2 "></i>({{
              item.shareCount
            }})</span
          >
          <span @click="getcom(item, index)"
            ><i class="iconfont icon-iconfront- "></i>({{ item.comment }})</span
          >
          <span>....</span>
        </p>
      </div>
      <div class="comments">
        <div v-show="count === index && isshow">
          <comment :comslist="comlist" :iscontent="false" @jump='gettext' @comreply='getreply'  ref="focus"></comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "../../lyric/child/comment";
import { dateFormat } from "../../../components/common/time";
export default {
  props: {
    tlist: {
      type: Array,
    },
    comlist: { type: Array },
  },
  data() {
    return {
      song: null,
      count: -1,
      isshow: false,
    };
  },

  components: {
    comment,
  },
  mounted() {},
  methods: {
    // 此段代码，emmmm
    cc(obj) {
      for (const key in obj) {
        if (key === "name") {
          return obj[key];
        }
      }
    },
    dd(obj) {
      for (const key in obj) {
        if (key === "artists") {
          return obj[key][0].name;
        }
      }
    },
    ee(obj) {
      for (const key in obj) {
        if (key === "album") {
          return obj[key].blurPicUrl;
        }
      }
    },
    getcom(item, index) { //点击评论图形，打开评论组件
      this.count = index;
      this.isshow = !this.isshow;
      this.$emit("com", item.id);
    },
    gettext(text) {
      this.$emit('gettext',text)
    },
    getreply(item){
      this.$emit('reply',item)
    },
 
   
  
  },
};
</script>

<style lang="less" scoped>
.trends {
  padding: 15px 0;
  .top {
    display: flex;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    div {
      margin: 0 10px;
      p {
        font-size: 13px;
        &:nth-child(1) {
          color: #0c73c2;
        }
        &:nth-child(2) {
          color: #666;
        }
      }
    }
    span {
      font-size: 13px;
      position: relative;
      top: -8px;
      color: #666;
    }
  }
  .mmidle {
    padding: 10px 30px 10px 50px;
    .img {
      padding: 10px 0 10px 10px;
      display: flex;
      align-items: center;
      background-color: #eeeeef;
      margin-top: 10px;
      img {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        font-size: 13px;
        p {
          padding-bottom: 3px;
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    margin-right: 30px;
    padding: 0 10px 15px 0;

    p {
      span {
        font-size: 13px;
        margin-left: 20px;
        color: #999;
        position: relative;
        cursor: pointer;
        &::before {
          content: "";
          width: 1px;
          height: 15px;
          position: absolute;
          top: 3px;
          right: -10px;
          background: #e1e1e2;
        }
        &:nth-child(4) {
          &::before {
            content: "";
            width: 1px;
            height: 15px;
            position: absolute;
            top: 3px;
            right: -10px;
            background: #ffffff;
          }
        }
        i {
          font-size: 15px;
          padding-right: 5px;
          position: relative;
          top: 2px;
        }
      }
    }
  }
  .comments {
    margin: 0 30px 0 45px;
    border-bottom: 1px solid #e1e1e2;
  }
  .midimg {
    margin-left: 50px;
  }
}
</style>
