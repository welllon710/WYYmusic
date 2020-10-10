<template>
 <div class="bigbox">
    <div class="mv" :style="{width:wwidth+'px'}">
    <top>
        <span slot="left">最新MV </span>
        <div slot='center'>
          <span v-for="(item,index) in list" :key="index" @click="pick(item,index)" :class="{active:count===index}">{{item}}</span>
        </div>
        <span slot="right">更多</span>
    </top>
    <send-item :sendlist ='slicemv(mvlist)' :isbool="false" :isshow='setshow'></send-item>
    <div class="rb">
      <top>
        <span slot="left">热播MV </span>
        <span slot="right">更多</span>
      </top>
    <send-item :sendlist ='slicemv(wylist)' :isbool="false" :isshow='setshow'></send-item>
    </div>
    <div class="rb">
    <top>
        <span slot="left">网易出品 </span>
        <span slot="right">更多</span>
    </top>
    <send-item :sendlist ='slicemv(wylist)' :isbool="false" :isshow='setshow'></send-item>
    </div>
    <div class="rank">
       <top>
        <span slot="left">MV排行榜</span>
        <div slot='center'>
          <span v-for="(item,index) in list" :key="index" @click="pickrank(item,index)" :class="{active:counts===index}">{{item}}</span>
        </div>
        <span slot="right">更多</span>
       </top>
      <mvrank :list='mvrank'></mvrank>
    </div>
  </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex';
import  top  from "../../../components/conent/top/top";
import  SendItem  from "../../../components/conent/discover/send_item";
import mvrank from './mvrank';
import {firstmv,exclusive,topmv} from '../../../network/detail';
export default {
    components: {
        top,
        SendItem,
        mvrank
    },
    data() {
      return {
        list: ['内地','港台','欧美','日本','韩国'],
        count:0,
        counts:0,
        isshow:false,
        a:6,
        mvlist:[],
        wylist:[],
        mvrank:[],
      }
    },
    computed: {
       ...mapGetters([
      'wwidth',
    ]),
      setshow(){
      if(this.wwidth >1000){
          return  true
      }
      else{
        return false
      }
    },
    seta(){
      if(!this.setshow){
          this.a = 6
      }else{
          this.a = 8
      }
      return this.a
    },

    },
    mounted () {
    this.getfirstmv('内地') //获取最新MV
    this.gettopmv('内地') //获取MV 排行
    this.getexclusive() //获取网易MV
    },
    methods: {
      pick(item,index){  //点击标签
        this.count = index
        this.getfirstmv(item) //切换国家
      },
      pickrank(item,index){ //mv 排行榜切换
      this.counts = index
      this.gettopmv(item) //切换国家
      },
      getfirstmv(id){
        firstmv(id).then(res=>{
        this.mvlist = res.data
        })
      },
      getexclusive(){
        exclusive().then(res=>{
          this.wylist = res.data
        })
      },
      gettopmv(id){
        topmv(id).then(res=>{
          this.mvrank = res.data
        })
      },
      slicemv(item){
          if(item.length >= this.seta){
            return  item.slice(0,this.seta)
          }else{
              return item
          }
      },
    },
    
}
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content:center;
  .mv{
    margin-top: 15px;
  }
  .rb{
    margin-bottom: 40px;
  }
}
.active{
  color:black !important;
}
</style>