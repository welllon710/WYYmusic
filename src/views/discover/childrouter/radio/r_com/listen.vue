<template>
  <div class="bigbox">
    <div class="listen">
      <top>
          <span slot="left">听听</span>
           <span slot="right">更多</span>
      </top>
    <img-item :songslist='hotlist' :isshow='false'></img-item>
    
    </div>
  </div>
</template>

<script>
import top from '../../../../../components/conent/top/top';
import imgItem from '../../../../../components/conent/discover/re_songs_item';
export default {
    props: {
        hotlist: {
            type: Array,
        }
    },
    components: {
        top,
        imgItem
    }
}
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content: center;
  .listen{
      width: 765px;
  }
}
</style>