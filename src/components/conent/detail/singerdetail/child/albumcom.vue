<template>
   <div class="down">
            <div class="li" v-for="(item, index) in setcut" :key="index">
             <div class="up">
                 <span>{{index>=9?index+1:'0'+(index+1)}}</span>
                <i class='iconfont icon-xihuan'></i>
                <i class='iconfont icon-xiazai'></i>
             </div>
             <div class="in">
                 {{item.name}}
             </div>
               <div class="down">
                 <span>{{settime(item.dt)}}</span>
                </div>
            </div>
          
          </div>
</template>

<script>
import {dateFormat} from '../../../../common/time';
export default {
    props: {
        list: {
            type: Array,
        }
    },
    data() {
        return {
            a: 10
        }
    },
    computed: {
       setcut(){
           if(this.list.length > 10){
               return this.list.splice(0,this.a)
           }else{
               return this.list
           }
       }
    },
    methods: {
        settime(a){
            let b = new Date(a)
            return  dateFormat('MM:SS',b)
        }
    }
}
</script>

<style lang="less" scoped>
.down{
    
    .li{
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 3px 0;
        .in{
            position:absolute;
            left: 120px;
            font-size: 13px;
        }
        .up{
             display: flex;
             align-items: center;
             margin-left: 20px;
            i{
                padding: 0 8px;
            }
            span{
                font-size: 13px;
            }
        }
        .down{
            margin-right: 50px;
             font-size: 13px;
        }
    }
}
</style>