<template>
  <div id="app" >
   <nav-head-area ></nav-head-area>
    <keep-alive >
        <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <musicplay></musicplay>
  </div>
</template>

<script>

import musicplay from './views/musicplay/musicplay';
import NavHeadArea from "./components/conent/headArea";
export default {
  components: {
    musicplay,
    NavHeadArea
  },
  name:'app',
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, //打开页面宽度
      timer: false,
      wwdith: document.body.clientWidth - 262, //top组件下面条条
      isRouterAlive:true
    }
  },
  created() {
    console.log(document.documentElement.clientWidth);
  },
  mounted() {
     window.addEventListener("resize", this.setwwidth);
  this.$on("hook:beforeDestory",()=>{

  window.removeEventListener("resize", this.setwwidth);
  })
 
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods: {
     setwwidth() {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    },
    reload(){
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
    watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.wwdith = this.screenWidth - 262;
        if (this.wwdith > 1040) {
          this.wwdith = 1040;
          this.timer = false;
        }
        if (this.wwdith < 762) {
          this.wwdith = 762;
          this.timer = false;
        }
        this.$store.commit('changewidth',this.wwdith)
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
        }, 300);
      }
    },
  },
}
</script>
<style >
html,body,#app{
  height: 100%;
  overflow: hidden;
}
*{
  margin: 0;
  padding: 0;
}

</style>