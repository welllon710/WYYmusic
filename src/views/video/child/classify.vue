<template>
  <div class="classify">
    <div class="top">
      添加标签
    </div>
    <div class="allsong">
      全部歌单
    </div>
    <ul>
        <li v-for="(item,index) in grouplist" :key="index"  @click="setred(index,item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        grouplist: {
            type: Array,
        }
    },
    methods:{
      setred(index,item){
         this.$emit('setall',item.name)
      }
    }
}
</script>

<style lang="less" scoped>
.classify{
  width: 540px;
  height: 417px;
  overflow-y: auto;
  margin-top: 10px;
  background-color: #ffffff;
  border: 0.0625rem solid #b7b7b7;
  box-shadow: 0 0 0.625rem #e2e2e2;
   &::-webkit-scrollbar {
    width: 10px;    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
   .top {
    font-size: 14px;
    padding: 17px 20px;
    border-bottom: 1px solid #e1e1e2;
  }
  .allsong {
    width: 498px;
    height: 33px;
    border: 1px solid #c62f2f;
    text-align: center;
    line-height: 33px;
    font-size: 14px;
    margin: 10px auto;
  }
  ul{
    list-style: none;
    width: 498px;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    li{
    width: 82px;
    height: 33px;
    border: 1px solid #e1e1e2;
    margin: 0 -1px -1px 0;
    text-align: center;
    line-height: 33px;
    font-size: 12px;
    color: #666666;
        
    }
  }
}
</style>