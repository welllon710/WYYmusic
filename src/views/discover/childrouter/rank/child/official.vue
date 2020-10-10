<template>
      <div class="official" >
          <div class="top">
              <slot></slot>
              <span>{{settime}}更新</span>
              <span></span>
          </div>
          <div class="center">
              <div class="li" v-for="(item,index) in setlist" :key="index">
              <div class="one">
                   <span class="num" :class="{active:index + 1 < 4}">{{index+1}}</span>
                   <span class="fen">—</span>
              </div>
              <div class="two">
                <span class="al">{{aaa(item.al)||item.name}}</span>
                <div class="ar" >
                    <span v-for="(itemm,indexx) in item.ar" :key="indexx">{{itemm.name}}</span>
                </div>
              </div>
              </div>
          </div>
          <div class="bottom">
              查看全部
          </div>
      </div>
</template>

<script>
import { dateFormat } from "../../../../../components/common/time";
import { mapGetters } from 'vuex';
export default {
    props: {
        soar: {
            type:Object,
        },
    },
    data() {
        return {
            list: []
        }
    },
    computed:{
        settime(){
            let a = new Date(this.soar.time)
           return dateFormat('mm'+'月'+'dd'+'日',a)
        },
        setlist(){
            return this.soar.list.splice(0,8)
        },
         ...mapGetters([
            'wwidth',
        ])
    },
    methods:{
        aaa(obj){
            for (const item in obj) {
                if(item==='name'){
                    return obj[item]
                }
            }
        },
 
    }
}
</script>

<style lang="less" scoped>

    .official{
        padding-top: 18px;
        width: 30%;
        height: 371px;
        .top{
            position: relative;
            width: 100%;
            img{
                width: 100%;
                height: 95px;
            }
            span{
                font-size: 13px;
                position: absolute;
                bottom: 22px;
                left: 33%;
                color: #abccf1;
            
            }
        }
        .center{
            .li{
                display: flex;
                justify-content: space-between;
                height: 30px;
                overflow: hidden;
                &:nth-of-type(odd){ background:#f5f5f7;}
                .one{
                    width: 60px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .fen{
                        font-size: 9px;
                        padding-left: 6px;
                    }
                    .num{
                        font-size: 16px;
                      
                    }
                }
                .two{
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    height: 100%;
                    align-items: center;
                    .al{
                        color: #333;
                        width: 80px;
                    }
                    .ar{
                        color: #888;
                        width: 50px;
                        display: flex;
                    }
                  
                }
                span{
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .bottom{
            height: 40px;
            font-size: 14px;
            color: #888;
            line-height: 40px;
            background-color: #f5f5f7;
            position: relative;
            top: -4px;
            display: flex;
            justify-content: flex-end;
            padding-right: 10%;
        }
    }

.active{
    color: #cd2929;
    

}
</style>