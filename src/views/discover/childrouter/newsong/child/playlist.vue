<template>
  <div class="playlist">
    <div class="top">
        <div class='top_left'>
            <img src="~assets/image/play.png" >
            <span>播放全部</span>
        </div>
         <div class='top_right'>
            <img src="~assets/image/file.png" >
            <span>收藏全部</span>
         </div>
    </div>
    <div class="center">
        <div class="li" v-for="(item,index) in list" :key="index">
           <div class="outside">
               <div class='up'>{{index>=9?index+1:'0'+(index+1)}}</div>
               <div class='in'>
                  <div class='in_left'>
                      <img :src="imgurl(item.album)" @load="imgload">
                      <span>{{item.name}}</span>
                  </div>
                  <div class='in_center'>
                      <span v-for="(itemm,indexx) in item.artists"  :key="indexx">{{itemm.name}}</span>
                  </div>
                  <div class='in_right'>
                      <span>{{album(item.album)}}</span>
                  </div>
               </div>
               <div class='down'>{{settime(settimes[index])}}</div>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../../../../components/common/time";
export default {
    props: {
        list: {
            type: Array,
        },
        settimes:{type: Array,}
    },
    data() {
        return {
            author:'',
            time:'',
        }
    },
    methods:{
         album(obj){
            for (const item in obj) {
                if(item === 'name'){
                  return obj[item]
                }
            }
        },
        imgurl(obj){
             for (const item in obj) {
                if(item ==='blurPicUrl'){
                  return obj[item]
                }
            }
        },
       settime(a){
        let b = new Date(a)
        return  dateFormat('MM:SS',b)
    },
    imgload(){
        this.$emit('load')
    }
    }
}
</script>

<style lang="less" scoped>
.playlist{
    margin-top: 10px;
    width: 100%;
    border:1px solid #ededed;
    .top{
        display: flex;
        justify-content:space-between;
        height: 40px;
        .top_left{
            padding-left: 10px;
            line-height: 40px;
            img{
                width: 22px;
                height: 22px;
                position: relative;
                top: 5px;
            }
            span{
                font-size: 14px;
                padding-left: 6px;
            }
        }
        .top_right{
            padding: 2px 11px 2px 10px;
            margin: auto 10px;
            border: 1px solid #e1e1e2;
            border-radius: 5px;
             img{
                 width: 16px;
                 height: 16px;
                 position: relative;
                 top: 2px;
             }
             span{
                font-size: 14px;
                padding-left: 6px;
             }
        }
    }
    .center{
        .li{
            height: 60px;
            &:nth-of-type(odd){ background:#f5f5f7;}
            .outside{
                height: 100%;
                display: flex;
                justify-content:space-between;
                align-items: center;
                .up{
                    width: 30px;
                    height: 60px;
                    line-height:60px;
                    padding-left: 25px;

                }
                .down{
                    width: 100px;
                    height: 60px;
                    line-height:60px;
                    text-indent: 30px;
                }
                .in{
                    flex: 1;
                    display: flex;
                    justify-content:space-between;
                    position: relative;
                    .in_left{
                        img{
                            position: relative;
                            width: 40px;
                            height: 40px;
                            top: 12px;
                        }
                        span{
                            line-height:60px;
                            padding-left: 10px;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                    }
                    .in_center{
                       line-height:60px;
                         position: absolute;
                         right:140px;
                         width: 160px;
                         overflow: hidden;
                        white-space: nowrap;
                    }
                    .in_right{
                        line-height:60px;
                         position: absolute;
                         right:0;
                         width: 150px;
                         overflow: hidden;
                        white-space: nowrap;
                    }
                   span{
                       font-size: 14px;
                   } 
                }
            }
        }
    }
}
</style>