<template>
  <div class="input_focus">
    <div class="history">
        <div>
            <span>搜索历史</span>
            <img src="~assets/image/garbage.png" alt="">    
        </div>
        <div class='history_song'>
            <p v-for='(item,index) in $store.state.search_history' :key="index" class='history_song_P'>
                {{item}}
            </p>
        </div>
    </div>
    <div class="hotsearch">
        <span>热搜榜</span>
       <div>
           <div v-for="(item,index) in hot" :key="index" class='hotsearch_one'>
               <span class='hot_number' :class="{red:index <= 2}">{{index + 1 - 0 }}</span>
               <div class='hotsearch_two'>
                   <p > 
                       <i :class='{active:index <= 2}'> {{item.searchWord}}</i>
                       <span>{{item.score}}</span>
                       <img :src="item.iconUrl" v-if="item.iconUrl">
                   </p>
                   <div class='hotsearch_two_text'>
                       {{item.content}}
                   </div>
               </div>
           </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
       hot:{type:Array}
    }
}
</script>

<style lang="less" scoped>
.input_focus{
    width: 26.5625rem;
    position: absolute;
    left:0rem;
    z-index: 10;
    background-color: white;
    border: 0.0625rem solid #eee;
    box-shadow: 0 0 0.625rem #e2e2e2;
    &::before{
        width: 0;
            height: 0;
            content: "";
            position: absolute ;
            left: 2rem;
            top: -0.6875rem;
            border-left: solid 0.6875rem transparent;
            border-bottom: solid 0.6875rem #E2E3E4;
            border-right: solid 0.6875rem transparent;
    }
    .history{
        padding: 0.5rem 0 0.5rem 1.25rem;
        span{
          font-size :1rem;
          padding-right: 0.625rem;
        }
        img{
            width: 1.125rem;
            height: 1.125rem;
            position: relative;
            top: 0.1875rem;
        }
    }
    .history_song{
        display: flex;
    }
    .history_song_P{
        border:0.0625rem solid #d7d7d7;
        padding: 0.25rem 0.625rem;
        border-radius: 1.25rem;
        margin: 0.625rem 0.9375rem 0 0;
        font-size :0.875rem
    }
    .hotsearch{
        padding: 0.3125rem 0 0.625rem 1.25rem;
        .hotsearch_one{
            display: flex;
            align-items: center;
            padding-top: 1rem;
            &:hover{
               background-color: #eee;
            }
            .hot_number{
               margin-right: 1.5625rem;
            }
           .hotsearch_two{
               i{
                   font-style: normal;
                   font-size :0.9375rem
               }
               span{
                   color:#cdcdcd;
                   padding: 0 0.625rem;
                   font-size :0.8125rem
               }
               img{
                   width: 1.25rem;
                   height: 1.25rem;
                   position: relative;
                   top: 0.25rem;
                   left: 0.625rem;
               }
           }
           .hotsearch_two_text{
               font-size: 0.8125rem;
               padding-top: 0.3125rem;
            color:#cdcdcd;
               
           }


        }
    }
}
.active{
    font-weight: 800;
}
.red{
    color: red;
}
</style>