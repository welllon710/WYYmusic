<template>
  <div class="ul">
    <div class="li" v-for="(item,index) in list" :key="index" @click="setred(index,item)">
        <div class="left">
            <span>{{index>=9?index+1:'0'+(index+1)}}</span>
        </div>
        <div class="right">
           <div class="img">
                <img :src="item.cover">
                <span>热度:{{item.playCount}}</span>
           </div>
            <div class='text'>
                <p>{{item.name}}</p>
                <p>{{item.artistName}}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
        }
    },
    methods: {
        setred(item,idnex){
             this.$router.push({path:`/mvdetail/${item.id}`})  // 跳转MV 详情页
        }
    }
}
</script>

<style lang="less" scoped>
.ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    .li{
        display: flex;
        width: 49%;
        padding: 20px 0;
        border-bottom: 1px solid #e1e1e2;
        &:nth-of-type(odd){
            position: relative;
            &::before{
            content: "";
          width: 1px;
          height: 100px;
          position: absolute;
          top: 16px;
          right: 0px;
          background: #e1e1e2;
            }
        }
        
       .left{
           width: 40px;
           line-height: 90px;
           font-style: italic;
           font-size: 22px;
           color:#666;
        
       } 
       .right{
           flex: 1;
           display: flex;
           .img{
               position: relative;
               img{
                   width: 160px;
                    height: 90px;
               }
               span{
                    background-color: rgba(0, 0, 0, 0.2);
                   position:absolute;
                   top: 0;
                   right:0;
                   color:#e1e1e2;
                   font-size:14px;
                   padding: 0 5px;
               }
           }
           .text{
               font-size: 14px;
               color:#666;
               padding-left: 15px;
               p{
                   padding-top: 5px;
                  
               }
           }
       }
    }
}
</style>