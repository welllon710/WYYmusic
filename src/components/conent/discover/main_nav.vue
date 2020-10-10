<template>
  <div class="main_nav">
   <div class='main_nav_div'>
        <ul class='main_nav_ul'>
        <li v-for='(item,index) in list' :key="index" class='main_nav_li' 
        :class="{active:index===count}"
        @click="jump(item,index)"
        >
            {{item.iid}}
        </li>
    </ul>
   </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list:[
                {iid:'个性推荐' ,address:'/discover'},
                {iid:'歌单',address:'/discover/songs'},
                {iid:'主播电台',address:'/discover/radio'},
                {iid:'排行榜',address:'/discover/rank'},
                {iid:'歌手',address:'/discover/singer'},
                {iid:'最新音乐',address:'/discover/newsong'}
            ],
            count:0
        }
    },
    methods: {
        jump(item,index){
            this.count = index
            this.$router.push(item.address)
        
        }
    },
}
</script>

<style lang="less" scoped>
.main_nav{
    height: 2.6875rem;
    border-bottom: 0.0625rem solid #e1e1e2;
    .main_nav_div{
        height: 100%;
        display: flex;
        justify-content: center;
        .main_nav_ul{
        display: flex;
        height: 100%;
        width: 35.3125rem;
        list-style: none;
        justify-content:space-evenly;
        align-items: center;
        .main_nav_li{
            font-size: 0.9375rem;
            cursor: pointer;
            padding: 0.6875rem 0;
            &:hover{
                color: red;
            }
        }
    }
    }
   
}
.active{
    border-bottom: 2px solid #c62f2f;
}
</style>