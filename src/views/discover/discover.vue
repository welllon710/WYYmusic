<template>
  <div class="discover">
    <div class="discover_centent">
      <discover-recommend></discover-recommend>
      <discover-main>
      <div slot='message' v-if="($route.path ==='/discover/every')||isbool">
        <router-view></router-view>
      </div>
     <div slot='main' v-else>
        <main-nav></main-nav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
     </div>
      </discover-main> 
    </div>
  </div>
</template>
<script>
import DiscoverRecommend from "../../components/conent/discover/recommend";
import DiscoverMain from "../main/main";
import MainNav from "../../components/conent/discover/main_nav";
import songdaily from '../main/songdaily';
export default {
  name: "discover",
  data() {
    return {
      isshow:true,
      reg:/^\/discover\/detail|search.*$/
    };
  },
 
  computed: {
    isbool() {
      return this.reg.test(this.$route.path) 
    }
  },
  
  components: {
    DiscoverRecommend,
    DiscoverMain,
    MainNav,
    songdaily
  },

};
</script>

<style lang="less" scoped>
.discover {
  // position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  // top: 48px;
  .discover_centent {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
