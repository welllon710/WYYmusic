<template>
  <div class="bigbox">
      <div class="radio" :style="{width:wwidth+'px'}">
      <top>
          <span slot="left">{{name}}</span>
          <span slot="right">更多</span>
      </top>
    <re-songs-item :songslist ='slicemv(radios)' :isout='setshow' :liwidth='radiowidth' class='item'></re-songs-item>
  </div>
  </div>
</template>

<script>
import top from '../top/top';
import reSongsItem from './re_songs_item'
import { mapGetters } from 'vuex';
export default {
    components: {
        top,
        reSongsItem
    },
    props: {
        radios: {
            type: Array, 
        },
        radiowidth:{type:Number},
        name: {type:String}
    },
    data() {
        return {
            a:5
        }
    },
    computed: {
      setshow(){
      if(this.radiowidth >800){
          return  true
      }
      else{
        return false
      }
     
    },
      seta(){
        if(!this.setshow){
          return  this.a = 5
        }else{
         return  this.a = 6
        }
    
    },
     ...mapGetters([
      'wwidth',
    ])
    },
    methods:{
        slicemv(item){
          if(item.length >= this.seta){
            return  item.slice(0,this.seta)
          }else{
              return item
          }
      },

    }
}
</script>

<style lang="less" scoped>
.bigbox{
    width: 100%;
    display: flex;
    justify-content:center;
    padding-bottom: 60px;
    .radio{
      width: 100%;
    }
    .item{transition:1s}
}
</style>