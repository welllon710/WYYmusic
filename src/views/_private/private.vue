<template>
  <div class="private">
   <div class='private_centent'>
      <p-recommend></p-recommend>
      <p-main>
        6666
      </p-main>
   </div>
  </div>
</template>

<script>
import PHeadArea from '../../components/conent/headArea';
import PRecommend from '../../components/conent/discover/recommend';
import PMain from '../main/main';

export default {
components:{
  PHeadArea,
  PRecommend,
  PMain,

}
}
</script>

<style lang="less" scoped>
.private{
    position: relative;
    z-index: 2;
    height: 100%;
  .private_centent{
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>