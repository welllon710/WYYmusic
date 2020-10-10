<template>
  <div class="detaillist">
    <table  cellspacing="0">
       <thead>
          <tr>
            <td>序号</td>
            <td>操作</td>
            <td>音乐标题</td>
            <td>歌手</td>
            <td>专辑</td>
            <td>时长</td>
          </tr>
        </thead>
      <tbody>
      <tr v-for="(item,index) in songlist" :key="index" @dblclick="geturl(item)" 
          @contextmenu.prevent="rightclick"
          @click='cancel'>
          <td>{{index>=9?index+1:'0'+(index+1)}}</td>
          <td>
            <i class='iconfont icon-xihuan'></i>
            <i class='iconfont icon-xiazai'></i>
          </td>
          <td>{{item.name||item}}</td>
          <td>
             <span v-for="(itemm,indexx) in item.ar" :key="indexx">
              {{itemm.name}}
             </span>
          </td>
          <td>{{aaa(item.al)}}</td>
          <td>{{settime(times[index])}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {dateFormat} from '../../common/time';
export default {
    data() {
      return {
        isshow: false
      }
    },
    props: {
        songlist: {
            type: Array,
        },
        times:{type:Array}
    },
    methods: {
        aaa(obj){
      for (const item in obj) {
        if(item ==='name'){
          return obj[item]
        }
      }
    },
    settime(a){
      let b = new Date(a)
    return  dateFormat('MM:SS',b)
    },
    geturl(item){
      console.log(item);
    },
    rightclick(e,item){
      this.isshow = true
      let a = {
        x:e.clientX - 200 ,
        y:e.clientY - 47,
        isshow :this.isshow,
      }
     this.$bus.$emit('place',a)
    },
    cancel(){
      this.isshow = false
      console.log( this.isshow);
      this.$bus.$emit('isshow',this.isshow)
    }
  }
}
</script>

<style lang="less" scoped>
 .detaillist{
   width: 100%;
   border: 1px solid #ededed;
  table{
    table-layout: fixed;
    width: 100%;
    tr{
      &:hover{
      background-color: #00ffff;
      cursor: pointer;
      }
      td{
        font-size: 14px;
        padding: 4px 0;
        overflow: hidden;
        white-space: nowrap;
	      text-overflow: ellipsis;
        word-wrap: break-word;
        &:nth-child(1){
          width: 5%;
          text-align: center;
        }
        &:nth-child(2){
          width: 5%;
          i{
            &:nth-child(1){
              margin-right:15%
            }
          }
        }
         &:nth-child(3){
          width: 35%;
        }
          &:nth-child(4){
          width: 20%;
        }
        &:nth-child(5){
          width: 25%;
        }
         &:nth-child(6){
          width: 9%;
        }
      }
    }
  }
  }
  thead{
    tr{
      td{
        border-right: 1px solid #e1e1e2;
        border-bottom: 1px solid #e1e1e2;
        &:nth-child(6){
           border-right:none
        }
      }
    }
  }
</style>