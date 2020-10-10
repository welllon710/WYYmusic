<template>
  <div class="messgae" v-if="messobj">
    <div class='up'>
        <slot name="name"></slot>
        <span>{{messobj.briefDesc}}</span>
    </div>
    <div class='down'>
        <h3>{{messobj.introduction[0].ti}}</h3>
        <span v-for="(item,index) in arr" :key="index" class='txt'>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        messobj: {
            type: Object,
        },
        name:{type:Object}
    },
    data() {
        return {
            arr: []
        }
    },
    mounted () {
      this.$nextTick(() => {
       let str = this.messobj.introduction[0].txt
       this.arr = str.split('。')
      })
       
    },
}
</script>

<style lang="less" scoped>
.messgae{
    padding-top: 25px;
    .up{
        h3{
            padding-bottom: 6px;
        }
        span{
            color:#666;
            padding: 35px;
            line-height: 2;
        }
    }
    .down{
        h3{
           padding: 30px 0 8px  0;
        }
        .txt{
            display: inline-block;
            color:#666;
            line-height: 2;
            text-indent: 50px;
        }
    }
}
</style>