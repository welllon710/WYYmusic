<template>
  <div class="head_area">
    <discover-navbar
      @getinput="inputvalue"
      @inputfocus="focus"
      @search_click="searchs"
      @blurlose="lose"
      @starlogin="login"
    ></discover-navbar>
    <discover-search
      :song="sugSongs"
      v-show="isshow"
      :songname="meg"
      @getid="geturl"
    ></discover-search>
    <better-scroll
      class="better_scroll"
      ref="getscroll"
      @mouseleave.native="leave"
      v-show="ishot"
    >
      <discover-focus :hot="hots"></discover-focus>
    </better-scroll>
  </div>
</template>

<script>
import DiscoverNavbar from "../conent/navbar_top";
import DiscoverSearch from "../../views/discover/childcommps/navsearch"; //input 搜索
import DiscoverFocus from "../../views/discover/childcommps/inputfocus"; //input focus 事件
import BetterScroll from "../common/better_scroll";



import { search, searchDetail,geturl} from "../../network/axios";
import {songdetail} from '../../network/detail';
import { Debounce } from "../conent/debounce";
import { throttle } from "../conent/throttle";
import {Urldetail} from '../common/urldetail';
let timer;
export default {
  data() {
    return {
      sugSongs: [], //搜索出来的歌曲
      model: [],
      isshow: false,
      ishot: false,
      hots: [],
      meg: "", //输入框内容
      islogin: false,
    };
  },
  components: {
    DiscoverNavbar,
    DiscoverSearch,
    DiscoverFocus,
    BetterScroll,

  },
  created() {
    this.inputvalue = Debounce(this.inputvalue, 500); //防抖处理，感觉没啥必要
    this.focus = throttle(this.focus, 1000); // 焦点节流
  },
  mounted() {
    this.$bus.$on("close_login", () => {
      //点x 关闭
      this.islogin = false;
      this.$router.replace(this.$route.matched[0].path);
    });
  },
  destroyed() {
    this.$bus.$off("close_login"); //事件总线接收后得在 destoryed 中销毁
  },

  methods: {
    inputvalue(value) {
      // 输入框事件 1
      this.meg = value; //关键字
      this.isshow = true;
      this.ishot = false;
      search(value, 7).then((res) => {
        this.sugSongs = res.result.songs;
      });
    },
    focus() {
      //聚焦事件 1
      this.$refs.getscroll.refresh();
      if (this.meg) {
        this.isshow = true;
      } else {
        this.ishot = true;
      }
      searchDetail().then((res) => {
        this.hots = res.data;
      });
    },
    searchs() {
      //搜索按钮 1
      if (this.meg) {
        // this.$router.push({
        //   path:`/discover/search`,
        //   query:{
        //     id:this.meg
        //   }
        
        // }) //跳转搜索结果页面
        this.$router.push({path:`/discover/search/${this.meg}`}) //跳转歌词界面
        this.$store.commit("add", this.meg);
      }
    },
    leave() {
      // 从热搜离开
      this.ishot = false;
      // this.isshow = false;
    },
    lose() {
      //焦点丢失 1
      // this.isshow = false;
    },
    login() {
      //点击登录 1
      this.islogin = true;
    },
    geturl(item){  //获取音乐URL
      geturl(item.id).then((res) => {
        songdetail(item.id).then((ress) => {
          let a = new Urldetail(ress.songs[0],res.data)
          this.$store.commit('addurl',a)
        })  
      })
    }
  },
};
</script>

<style lang="less" scoped>
.head_area {
  position: relative;
  width: 100%;
  z-index: 4;
  .better_scroll {
    height: 31.25rem;
    width: 26.6875rem;
    position:absolute;
    // position: relative;
    // top: 3rem;
    // right: 21.5rem;
    left: 16rem;
    overflow: hidden;
    &::before {
      width: 0;
      height: 0;
      content: "";
      position: absolute;
      left: 2rem;
      top: -0.6875rem;
      border-left: solid 0.6875rem transparent;
      border-bottom: solid 0.6875rem #e2e3e4;
      border-right: solid 0.6875rem transparent;
      z-index: 10;
    }
  }
}
</style>
