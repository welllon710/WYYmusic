<template>
  <div class="bigbox">
      <div class="recommend_radio">
          <top>
              <span slot="left">电台个性推荐</span>
               <span slot="right">更多</span>
          </top>
        <re-songs-item :songslist='setlist' :isout='false'></re-songs-item>
      </div>
  </div>
</template>

<script>
import top from '../../../../../components/conent/top/top';
import reSongsItem from '../../../../../components/conent/discover/re_songs_item';
export default {
    components: {
        top,
        reSongsItem
    },
    props: {
        list: {
            type: Array,
        }
    },
    computed: {
        setlist(){
            return this.list.splice(0,6)
        }
    },
}
</script>

<style lang="less" scoped>

</style>