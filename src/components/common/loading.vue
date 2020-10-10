<template>
<div class="loading">
    999
</div>
</template>

<script>
export default {
  name: 'Loading' // 定义的组件名称 使用时写法：loading
}
</script>

<style  scoped>
.loading {
  position: absolute;
  left: 0;
  top: 0;
  background: url('~@/assets/image/rotate.gif') center center no-repeat #fff;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>
