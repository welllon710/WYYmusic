<template>
  <div class="lrc">
    <div class="musicmeg">
        <div>
            <h2>{{backnow?backnow.name:''}}</h2>
            <h5>mv</h5>
            <h5>极高音质</h5>
        </div>
        <div>{{backnow?backnow.alia:''}}</div>
        <div>
            <div class='a'>
                <span>专辑：</span>
                <span>大鱼</span>
            </div>
            <div class='a'>
                <span>歌手：</span>
                <span>{{backnow?backnow.author:''}}</span>
            </div>
            <div class='a'>
                <span>来源：</span>
                <span>每日歌曲推荐</span>
            </div>
        </div>
    </div>
    <div class="main">
        <ul :style="{transform: 'translateY('+dis+'px)'}">
            <li v-for="(item,index) in list" :key="index" 
            :class="{active:index===count}"
            >{{item}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        list: {
            type: Array,
        },
        timelist:{type:Array}
    },
    data() {
        return {
            count: 0,
            dis:0,
        }
    },
    computed: {
       ...mapGetters(['backtime','backurl','backindex','backhistory','backalldata']),
       backnow(){
           if(this.backhistory){
            return this.backurl[this.backindex]
           }else{
            return this.backalldata[this.backindex]
           }
       }
    },
    methods:{
        move(time){
           this.timelist.find((item,index)=>{
             if(item===time){
                 this.dis = 0 - index * 26
                 this.count = index
             }
           })
        }
    },
    watch:{
        backtime(value){
           this.move(value)
        }
    }
}
</script>

<style lang="less" scoped>
.lrc{
    padding-top: 40px;
   .musicmeg{
    div{
        padding-bottom: 10px;
        &:nth-child(1){
          display:flex;
          align-items: center;
          h2{
              font-weight: 400;
          }
          h5{
               font-weight: 400;
               height: 13px;
               font-size:12px;
               margin: 0 5px;
               border: 1px solid #cd2929;
               line-height: 13px;
               padding: 1px 2px;
               border-radius: 3px;
               color:#cd2929;
          }  
        }
        &:nth-child(2){
           font-size: 13px;
           color:#41403f;
        }
        &:nth-child(3){
           display:flex;
           justify-content:space-between;
           .a{
               span{
                   font-size: 13px;
                   color: #2f5fa8;
               }
           }

        }
    }
   } 
   .main{
       padding-top: 10px;
       height: 320px;
       overflow: hidden;
       position: relative;
       ul{
          position: absolute; 
          top: 0;
          transition: all .3s;
           li{
               padding: 3px 0;
               font-size: 15px;
           }
       }
   }
}
.active{
    color: #00ffff;
    transition: color .3s;
}
</style>