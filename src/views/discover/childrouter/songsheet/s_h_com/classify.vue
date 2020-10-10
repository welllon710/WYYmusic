<template>
  <div class="classify">
    <div class="top">
      添加标签
    </div>
    <div class="allsong">
      全部歌单
    </div>
    <div class="languages">
      <div class="l_left">
        <img src="~assets/image/languages.png"  />
        <span>语种</span>
      </div>
      <div class="l_right">
        <span v-for="(item, index) in languages" :key="index" @click="setred(index,item)"  ref="span">{{
          item.name
        }}</span>
      </div>
    </div>
    <div class="stylelist">
      <div class="l_left">
        <img src="~assets/image/stylelist.png" alt="" />
        <span>风格</span>
      </div>
      <div class="l_right">
        <span v-for="(item, index) in stylelist" :key="index" @click="setred(index,item)"  ref="span">{{
          item.name
        }}</span>
      </div>
    </div>
    <div class="scene">
      <div class="l_left">
        <img src="~assets/image/scene.png" alt="" />
        <span>场景</span>
      </div>
      <div class="l_right">
        <span v-for="(item, index) in scene" :key="index" @click="setred(index,item)"  ref="span">{{ item.name }}</span>
      </div>
    </div>
    <div class="emotion">
      <div class="l_left">
        <img src="~assets/image/emotion.png" alt="" />
        <span>情感</span>
      </div>
      <div class="l_right">
        <span v-for="(item, index) in emotion" :key="index" @click="setred(index,item)" ref="span">{{
          item.name
        }}</span>
      </div>
    </div>
    <div class="theme">
      <div class="l_left">
        <img src="~assets/image/theme.png" alt="" />
        <span>主题</span>
      </div>
      <div class="l_right">
        <span v-for="(item, index) in theme" :key="index" @click="setred(index,item)"  ref="span">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            count: '华语',
            all:'全部歌单'
        }
    },
  props: {
    languages: { type: Array },
    stylelist: { type: Array },
    scene: { type: Array },
    emotion: { type: Array },
    theme: { type: Array },
  },
  methods: {
      setred(index,item){
         this.$emit('setall',item.name)
      }
  }
};
</script>

<style lang="less" scoped>
.classify {
  width: 540px;
  height: 417px;
  overflow-y: auto;
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
  .languages {
    width: 500px;
    margin: 0 auto;
    display: flex;
  }
  .stylelist {
    width: 500px;
    margin: 0 auto;
    display: flex;
    margin-top: 10px;
  }
  .scene {
    width: 500px;
    margin: 0 auto;
    display: flex;
    margin-top: 10px;
  }
  .emotion {
    width: 500px;
    margin: 0 auto;
    display: flex;
    margin-top: 10px;
  }
  .theme {
    width: 500px;
    margin: 0 auto;
    display: flex;
    margin-top: 10px;
    padding-bottom: 30px;
    // margin: 10px 0 20px 0;
  }
}
.l_left {
  width: 84px;
  display: flex;
  align-items: flex-start;
  img{
      width: 26px;
      height: 26px;
      padding-right: 10px;
    }
    span{
        position: relative;
        top: 3px;
    }
}
.l_right {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  span {
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
.active{
    border-color: #c62f2f;
}
</style>
