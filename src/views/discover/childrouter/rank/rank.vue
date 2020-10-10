<template>
  <div class="bigbox">
    <div class="rank" :style="{width:wwidth+'px'}">
    <top>
      <span slot="left">官方榜</span>
    </top>
    <div class='center'>
       <soar :soar='official.soar'>
           <img src="~assets/image/soar.png" @click="$router.push({path:`/discover/detail/${official.soar.id}`})">
       </soar>
       <soar :soar='official.new' >
           <img src="~assets/image/newsong.png" @click="$router.push({path:`/discover/detail/${official.new.id}`})">
       </soar>
       <soar :soar='official.original' >
           <img src="~assets/image/original.png" @click="$router.push({path:`/discover/detail/${official.original.id}`})">
       </soar>
      <div class='c_bottom'>
         <soar :soar='official.hot' class='one'>
           <img src="~assets/image/hot.png" @click="$router.push({path:`/discover/detail/${official.hot.id}`})">
       </soar>
       <soar :soar='singer'  class='two'>
           <img src="~assets/image/singer.png" >
       </soar>
      </div>
    </div>
      <top>
        <span slot='left'>全球榜</span>
      </top>
      <item-img :allsong='kkk' :wwidth='wwidth' :isshow='true'></item-img>
  </div>
  </div>
</template>
<script>
import top from "../../../../components/conent/top/top";
import soar from "./child/official";
import { newlist,singer,listall } from "../../../../network/axios";
import ItemImg from "../songsheet/s_h_com/itemimg";
import { mapGetters } from 'vuex';
export default {
  components: {
    top,
    soar,
    ItemImg
  },
  data() {
    return {
      official: {
        soar: { list: [],  time: "" ,id:'19723756'},
        new: { list: [],  time: "" ,id:'3779629'},
        original: { list: [],  time: "" ,id:'2884035'},
        hot: { list: [], time: "",id:'3778678' },
      },
      soar: 19723756,
      new: 3779629,
      original: 2884035,
      hot: 3778678,
      singer:{list: [],  time: ""},
      alllist: [],
    };
  },
  computed: {
      kkk(){
         this.alllist.splice(0,4)
         return this.alllist
      },
      ...mapGetters([
      'wwidth',
    ])
  },

  created() {
    this.getofficial(this.soar);  
    this.getofficial(this.new);
    this.getofficial(this.original);
    this.getofficial(this.hot);
    this.getsinger()
    this.getalllist()
    
  },
  mounted () {
       this.$bus.$on('setwwidth',(res)=>{
       this.itemwidth = res
       console.log(res);
  })
  },
  methods: {
    getofficial(type) {
      newlist(type).then((res) => {
        this.official[this.getindex(type)].list = res.playlist.tracks;
        this.official[this.getindex(type)].time = res.playlist.updateTime;
      });
    },
    getsinger(){
      singer().then(res=>{
        console.log(res);
       this.singer.list = res.list.artists
       this.singer.time = res.list.updateTime
      })
    },
    getalllist(){
      listall().then(res=>{
        this.alllist = res.list
      })
    },
    getindex(index) {
      switch (index) {
        case 19723756:
          return "soar";
          break;
        case 3779629:
          return "new";
          break;
        case 2884035:
          return "original";
          break;
        case 3778678:
          return "hot";
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content: center;
.rank {
  padding-top: 15px;
  position: relative;
  width: 100%;
  .center{
    display: flex;
    justify-content:space-around;
    flex-wrap: wrap;
    .c_bottom{
      width: 100%;
      display: flex;
      justify-content:flex-start;
      .one{
        padding-left: 1.5%;
      }
      .two{
        padding-left: 3.5%;
      }
      
    }
  }
}
}
</style>
