<template>
  <div class="bigbox">
      <div class="new_music" :style="{width:mwidth +'px'}">
        <top>
          <span slot="left">最新音乐</span>
          <span slot="right">更多</span>
      </top>
        <div class="new_music_center">
            <div class="new_music_item" v-for="(item,index) in musiclist" :key="index" >
              <span>{{index >= 9 ? index + 1 - 0 : '0'+ (index + 1 - 0) }}</span>
              <div class="new_music_right">
                  <img :src="item.picUrl">
                  <div class="one">
                      <span>{{item.name}}</span>
                      <div class="two">
                          <img src="~assets/image/sq.png" >
                          <span>{{part[index].name}}</span>
                      </div>
                  </div>
              </div>
            </div>
        </div>

      </div>
  </div>
</template>

<script>
import top from "../top/top";
export default {
    props: {
        musiclist: {
            type: Array
        },
        musicwidth:{type:Number}
    },
    components: {
        top,
    },
    computed:{
        part(){
            let abc = []
        abc = this.musiclist.map(item=>{
                return item.song.artists[0]
            })
            return abc
        
        },
        mwidth(){
        if(this.musicwidth > 1040){
          this.musicwidth = 1040
        }
        if(this.musicwidth < 762){
          this.musicwidth = 762
        }
        return this.musicwidth
        }
    }

}
</script>

<style lang="less" scoped>
.bigbox{
    width: 100%;
    display: flex;
    justify-content:center;
    margin-bottom: 30px;
    .new_music{
       width: 763px;
       min-width: 763px;
       margin-top:13px;
    }
    .new_music_center{
        display: flex;
        flex-wrap: wrap;
         border: 1px solid #ededed;
         border-right: none;
         margin-top: 10px;
         justify-content: space-between;
        .new_music_item{
            display: flex;
            width: 48%;
            min-width: 380px;
            padding: 10px 0 10px 0;
            border-right: 1px solid #ededed;
            span{
                align-self: center;
                padding: 0 15px 0 11px;
                color: #a599b1;
            }
            .new_music_right{
                display: flex;
                img{
                    width: 40px;
                    height: 40px;
                }
                .one{
                    span{
                        font-size: 12px;
                        color: #333;
                    }
                    .two{
                        span{
                            color: #888;
                            padding-left: 8px;
                        }
                        img{
                            width: 18px;
                            height: 11px;
                            padding-left: 10px;

                        }
                    }
                }
            }
            &:hover{
                background-color: #f5f5f7;
            }
        }
    }
}
</style>