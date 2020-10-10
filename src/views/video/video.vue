<template>
  <div class="video">
    <div class='video_centent'>
      <!-- MV播放页路由 -->
      <router-view></router-view> 
      <recommend></recommend>
      
      <videomain>
       <div class="mains" slot="main">
         <div class="top">
           <h3 v-for="(item, index) in laber" :key="index" 
           :class="{active:index===count}" @click="getindex(index)">{{item}}</h3>
         </div>
        <video-two v-if="show"></video-two>
        <mv v-else></mv>
       </div>
      </videomain>
   </div>
  </div>
</template>

<script>
import recommend from '../../components/conent/discover/recommend';
import videomain from  '../main/main';
import videoTwo from "./child/_video";
import mv from "./child/mv";
export default {
  components: {
   recommend,
   videomain,
   videoTwo,
   mv
  
  },
  data() {
    return {
      laber: ['视频','MV'],
      count:0,
      show:true,
    }
  },
  methods:{
      getindex(index){
      this.count = index
      if(index===0){
        this.show = true
      }else{
         this.show = false
      }
    },
  }

}
</script>

<style lang="less" scoped>
.video{
    position: relative;
    z-index: 2;
    height: 100%;
  .video_centent{
    display: flex;
    width: 100%;
    height: 100%;
    .mains{
      width: 100%;
      height: 100%;
             .top{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content:center;
      border-bottom: 1px solid #e1e1e2;
      h3{
        width: 70px;
        text-align: center;
        line-height:50px;
        margin: 0 15px;
      }
    }
    }
    
  }
}
.active{
  border-bottom: 2px solid #c62f2f;
}
</style>