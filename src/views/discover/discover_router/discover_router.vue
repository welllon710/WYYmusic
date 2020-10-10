<template>
  <div class="discover_router">
    <div :class="{ login: $route.path == '/discover/phone' }">
      <router-view></router-view>
    </div>
    <main-swipe :list="bannerlist" :swipewidth="wwidth" @getmusic='geturls'></main-swipe>
    <discover-songs :wwdith="wwidth"></discover-songs>
    <discover-send-out :sendlist="list"></discover-send-out>
    <discover-new-music
      :musiclist="newlist"
      :musicwidth="wwidth"
    ></discover-new-music>
    <discover-recommend-mv :_mvlist="mvlist"></discover-recommend-mv>
    <discover-radio :radios="radiolist" :radiowidth="wwidth"></discover-radio>
  </div>
</template>

<script>
import MainSwipe from "../../../components/common/swipe";
import DiscoverSongs from "../../../components/conent/discover/recommend_songs";
import DiscoverSendOut from "../../../components/conent/discover/send_out";
import DiscoverNewMusic from "../../../components/conent/discover/new_music";
import DiscoverRecommendMv from "../../../components/conent/discover/recommend_mv";
import DiscoverRadio from "../../../components/conent/discover/radio";
import { mapGetters } from "vuex";
import {
  sendOut,
  newMusic,
  recommendMv,
  redio,
  getswipe,
  geturl,
} from "../../../network/axios";
import {dateFormat} from '../../../components/common/time';
import {songdetail} from '../../../network/detail';
import { Urldetail } from "../../../components/common/urldetail";
export default {
  data() {
    return {
      list: [],
      newlist: [],
      mvlist: [],
      radiolist: [],
      bannerlist: [],
    };
  },
  computed: {
    ...mapGetters(['wwidth'])
  },
  components: {
    MainSwipe,
    DiscoverSongs,
    DiscoverSendOut,
    DiscoverNewMusic,
    DiscoverRecommendMv,
    DiscoverRadio,
  },
  created() {
    this.swipe();
    this.getsendout();
    this.getnewmusic();
    this.getmv();
    this.getradio();
  },

  methods: {
    swipe() {
      getswipe().then((res) => {
        this.bannerlist = res.banners;
      });
    },
    getsendout() {
      //获取独家放送
      sendOut().then((res) => {
        this.list = res.result;
      });
    },
    getnewmusic() {
      //获取最新音乐
      newMusic().then((res) => {
        this.newlist = res.result;
      });
    },
    getmv() {
      //获取MV
      recommendMv().then((res) => {
        this.mvlist = res.result;
      });
    },
    getradio() {
      redio().then((res) => {
        this.radiolist = res.result;
      });
    },
    geturls(id){
       songdetail(id).then(res=>{
          let ids = res.songs[0].id
          geturl(ids).then(ress=>{
            let p = new Urldetail(res.songs[0],ress.data)
            this.$store.commit('addurl',p)
          })
       })
    }
  },
};
</script>

<style lang="less" scoped>
.discover_router {
  position: relative;
  .login {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 21.875rem;
    height: 33.125rem;
    background-color: #fafafa;
    border: 0.0625rem solid #eee;
    box-shadow: 0 0 10px #e2e2e2;
  }
}
</style>
