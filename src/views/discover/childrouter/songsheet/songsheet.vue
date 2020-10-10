<template>

  <div class="songsheet">
   <span class="all" @click='come'>
        {{all==''?'华语':all}}
    <img src="~assets/image/bottom.png" >
    </span>
    <classify  class="classify"
    :languages='languages'
    :stylelist='stylelist'
    :scene='scene'
    :emotion='emotion'
    :theme='theme'
    @setall='setname'
    v-show="isshow"
    ></classify>
  <hotlaber :hotlaber='hotlaber' @sethot='setlaber'>
    <div class='lab'>热门标签:</div>
  </hotlaber>
  <songitem :allsong='allsong' :page='jumppage' class="songitem" :wwidth='wwidth' :isshow='kkk'>
  </songitem>

  <pading :total='total'
  @add='getadd'
  @sub='getsub'
  ></pading>
  </div>
</template>

<script>
import { excellent,whole,hot } from '../../../../network/axios';
import classify from "./s_h_com/classify";
import hotlaber from '../../../../components/conent/hotlaber';
import songitem from './s_h_com/songitem';
import pading from './s_h_com/pading';
import {mapGetters} from 'vuex';
export default {
    data() {
      return {
        all:'',
        languages:[],//语种
        stylelist:[],//风格
        scene:[],//场景
        emotion:[], //情感
        theme:[], //主题
        hotlaber:[] ,
        allsong:[], // 全部歌单
        total:'', // 除以100=页码总数
        jumppage: 0, //偏移量 1*50  2*50 
        isshow: false,
        itemwidth:'',
        isout:false
      }
    },
    components: {
       classify,
       hotlaber,
       songitem,
       pading
    },
    computed:{
      address(){
        const {all,jumppage} = this
        return {
          all,
          jumppage
        }
      },
      kkk(){
        if(this.wwidth > 900){
          return true
        }else{
          return false
        }
      },
      ...mapGetters(['wwidth'])
    },   
  created () {
      this.gethot()
      this.getwhole()
      this.gethotsong(this.jumppage * 50,'全部') // 初始值 全部
  },
  methods: {
    come(){
      this.isshow = !this.isshow
    },
    setlaber(item){   //热门切换标签
      this.all = item
    },
    setname(value){  //全部切换标签
      this.all = value
    },
    gethot(){  //标签
      hot().then(res=>{
        this.hotlaber = res.tags
      })
    },
    gethotsong(page,cat){ //img歌单
      let limit
      if(page === 0){
        limit = 99
      }else{
        limit = 100
      }
      excellent(page,limit,cat).then(res=>{
       this.allsong = res.playlists
       this.total = Math.floor(res.total / 100)  //总数
      })
    },
    getwhole(){   //全部标签
      whole().then(res=>{
      this.categories = res.categories
      let abc = res.sub
      this.languages = abc.filter(item=>item.category === 0)
      this.stylelist = abc.filter(item=>item.category === 1)
      this.scene = abc.filter(item=>item.category === 2)
      this.emotion = abc.filter(item=>item.category === 3)
      this.theme = abc.filter(item=>item.category === 4)
      })
    },
    getadd(count){
      this.jumppage = count
    },
    getsub(count){
      this.jumppage = count
    }

  },
  watch: {
    address(value){
      console.log(value); //{all: "韩语", jumppage: 2}
      let a = value.jumppage*50
      let b = value.all
      this.gethotsong(a,b)
    }
  },
}
</script>

<style lang="less" scoped>

.songsheet{
    margin-top: 20px;
    position: relative;
    .all{
        height: 24px;
        border-radius: 5px;
        border: 1px solid #e1e1e2;
        font-size: 12px;
        padding: 5px 15px;
        img{
            width: 10px;
            height: 10px;
        }
    }
    .classify{
      position: absolute;
      top: 35px;
      z-index: 2;
      &::before {
    width: 0;
    height: 0;
    content: "";
    position: absolute;
    left: 23px;
    top: -33px;
    border-left: solid 0.6875rem transparent;
    border-bottom: solid 0.6875rem #eae5e5;
    border-right: solid 0.6875rem transparent;
  
  }
    }
    .bigbox{
       width: 100%;
    }

}

</style>