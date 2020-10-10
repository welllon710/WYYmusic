<template>
  <div class="searchdetail">
    <div class="top">
      <h5>搜索:<i>鹿晗</i>,找到273首单曲</h5>
      <div class="laber">
        <span
          v-for="(item, index) in list"
          :key="index"
          @click="getitem(index)"
          :class="{ active: index === count }"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="danqu" v-show="count === 0">
      <h4>最佳匹配</h4>
      <div class="song_desc_mv">
        <div class="song">
          <img src="~assets/image/song.png" alt="" />
          <div class="text">
            <span>歌手:鹿晗</span>
            <i class="iconfont icon-you "></i>
          </div>
        </div>
        <div class="desc">
          <div class="mask">
            <img src="~assets/image/song.png" alt="" />
          </div>
          <div class="text">
            <span>歌手:鹿晗</span>
            <i class="iconfont icon-you "></i>
          </div>
        </div>
        <div class="mv">
          <img src="~assets/image/song.png" alt="" />
          <div class="text">
            <div class="left">
              <p>
                <span>MV</span>
                <span>挚爱</span>
              </p>
              <span class="name">鹿晗</span>
            </div>
            <i class="iconfont icon-you "></i>
          </div>
        </div>
      </div>
      <detaillist></detaillist>
    </div>
    <div class="singer" v-show="count === 1">
      <div class="singermeg">
        <img src="~assets/image/song.png" alt="" />
        <span>鹿晗</span>
      </div>
    </div>
    <div class="album" v-show="count === 2">
      <table cellspacing="0">
        <tr>
          <td>
            <img src="~assets/image/song.png" alt="" />
            <span>我们的明天</span>
          </td>
          <td>鹿晗</td>
        </tr>
      </table>
    </div>
    <div class="video" v-show="count===3">
     <myvideo></myvideo>
    </div>
    <div class="songsheet" v-show="count===4">
        <table cellspacing="0">
        <tr>
          <td>
            <img src="~assets/image/song.png" alt="" />
            <span>我们的明天</span>
          </td>
          <td>鹿晗</td>
          <td>by 巧克力宝宝</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import detaillist from "../../../components/conent/detail/detaillist";
import myvideo from '../../../components/conent/detail/singerdetail/child/mv';
export default {
  data() {
    return {
      list: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "主播电台",
        "用户",
      ],
      count: 0,
    };
  },
  components: {
    detaillist,
    myvideo
  },
  methods: {
    getitem(index) {
      this.count = index;
    },
  },
};
</script>

<style lang="less" scoped>
.searchdetail {
  .top {
    height: 105px;
    h5 {
      font-weight: 500;
      padding: 30px 0;
      i {
        font-style: normal;
        color: pink;
      }
    }
    .laber {
      padding-bottom: 10px;
      border-bottom: 1px solid #e1e1e2;
      min-width: 1024px;
      span {
        margin: 0 25px;
        padding: 0 5px 8px;
        cursor: pointer;
      }
    }
  }
  h4 {
    height: 34px;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    line-height: 38px;
    border-bottom: 1px solid #e1e1e2;
  }
  .danqu {
    .song_desc_mv {
      height: 92px;
      display: flex;
      align-items: center;
      .song {
        width: 246px;
        height: 60px;
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e2;
        margin-right: 20px;
        img {
          width: 52px;
          height: 52px;
          padding: 0 15px 0 4px;
        }
        .text {
          flex: 1;
          display: flex;
          justify-content: space-between;
          i {
            padding-right: 20px;
          }
        }
      }
      .desc {
        width: 246px;
        height: 60px;
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e2;
        margin-right: 20px;
        .mask {
          position: relative;
          width: 52px;
          height: 52px;
          margin: 0 28px 0 4px;
          &::after {
            content: "";
            background: url("../../../assets/image/search.png") no-repeat;
            position: absolute;
            top: 0;
            right: -28px;
            width: 28px;
            height: 100%;
            background-position-y: center;
          }
          img {
            width: 52px;
            height: 52px;
          }
        }

        .text {
          flex: 1;
          display: flex;
          justify-content: space-between;
          i {
            padding-right: 20px;
          }
        }
      }
      .mv {
        width: 246px;
        height: 60px;
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e2;
        margin-right: 20px;
        img {
          width: 94px;
          height: 52px;
          padding: 0 15px 0 4px;
        }
        .text {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .left {
            p {
              span {
                &:nth-child(1) {
                  font-size: 12px;
                  color: #c62f2f;
                  border: 1px solid #c62f2f;
                  padding: 0 2px;
                  margin-right: 5px;
                }
                &:nth-child(2) {
                  font-size: 14px;
                }
              }
            }
            .name {
              font-size: 14px;
            }
          }
          i {
            padding: 12px 20px 0 0;
          }
        }
      }
    }
  }
  .singer {
    .singermeg {
      height: 60px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #ebeced;
      }
      img {
        width: 45px;
        height: 45px;
      }
      span {
        font-size: 15px;
        margin-left: 20px;
      }
    }
  }
  .album {
    table {
      width: 100%;
      margin-top: 4px;
      tr {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        td {
            width: 50%;
          &:nth-child(1) {
           
            display: flex;
            align-items: center;
            img {
              width: 45px;
              height: 45px;
            }
            span {
                font-size: 14px;
                padding-left: 20px;
            }
          }
          &:nth-child(2){
              font-size: 14px;
          }
        }
      }
    }
  }
  .songsheet{
   table {
      width: 100%;
      margin-top: 4px;
      tr {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        td {
          &:nth-child(1) {
           width: 70%;
            display: flex;
            align-items: center;
            img {
              width: 45px;
              height: 45px;
            }
            span {
                font-size: 14px;
                padding-left: 20px;
            }
          }
          &:nth-child(2){
              width: 20%;
              font-size: 14px;
          }
          &:nth-child(3){
              width: 40%;
              font-size: 14px;
          }
        }
      }
    }
  }
}
.active {
  border-bottom: 3px solid #c62f2f;
  color: #c62f2f;
}
</style>
