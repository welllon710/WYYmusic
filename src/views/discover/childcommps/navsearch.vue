<template>
  <div class="navsearch" v-if='songname'>
    <div class="search_top">
      <div v-if="songname">
          搜“<span>{{songname}}</span
          >”相关的结果 >
      </div>
      <div ></div>
    </div>
    <div class="search_song">
      <div class="single">
        <i class="iconfont icon-yinle"></i>
        <span>单曲</span>
      </div>
      <ul>
        <li v-for="(item, index) in song" :key="index" @click="getid(item)">
          {{item.name}}--{{item.artists[0].name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    song: { type: Array },
    songname:{type:String}
  },
  methods: {
    getid(item){
     this.$emit('getid',item)
    }
  }
};
</script>

<style lang="less" scoped>
.navsearch {
  width: 22.3749rem;
  height: 16.2501rem;
  background-color: #ffffff;
  border: 0.0625rem solid #b7b7b7;
  box-shadow: 0 0 0.625rem #e2e2e2;
  position: absolute;
  left: 16.25rem;
  z-index: 10;
  &::before {
    width: 0;
    height: 0;
    content: "";
    position: absolute;
    left: 2rem;
    top: -0.6875rem;
    border-left: solid 0.6875rem transparent;
    border-bottom: solid 0.6875rem #e2e3e4;
    border-right: solid 0.6875rem transparent;
  }
  .search_top {
    font-size: 0.9375rem;
    padding: 0.625rem;
    span {
      color: #0c73c2;
    }
  }
  .search_song {
    .single {
      padding: 0.3125rem 0 0.3125rem 0.625rem;
      background: #f5f5f7;
      span {
        padding-left: 0.3125rem;
        color: #333333;
        font-size: 0.875rem;
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        font-size: 0.875rem;
        color: #333333;
        padding: 0.3125rem 0 0.3125rem 2.5rem;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f7;
        }
      }
    }
  }
}
</style>
