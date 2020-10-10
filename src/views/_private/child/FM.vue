<template>
  <div class="bigbox">
    <div class="FM">
      <div class="top">
        <div class="left">
          <img src="~assets/image/fmimg.png" />
        </div>
        <div class="right">
        5555555555555
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import lrc from "../../lyric/child/lyc";
// import { personal_fm } from "../../../network/detail";
export default {
  name:fm,
  components: {
    lrc,
  },
  created () {
    // this.getfm()
  },
  methods: {
    //  getfm(){
    //      let cookie = this.$store.state.profile.cookie
    //      personal_fm(cookie).then(res=>{
    //          console.log(res);
    //      })
    //  }
  },
};
</script>

<style lang="less" scoped>
.bigbox {
  width: 100%;
  display: flex;
  justify-content: center;
  .FM {
    width: 760px;
     display: flex;
     justify-content: center;
    .top{
        display: flex;
        width: 100%;
        margin-top: 39px;
     .left {
      padding-top: 35px;
    }
    .right{
        margin-left: 50px;
    }
    }
   
  }
}
</style>
