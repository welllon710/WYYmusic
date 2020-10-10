<template>
  <div class="country">
      <span v-for="(item,index) in country" :key="index"
        :class="{active:index===count}"
        @click="getcountry(item,index)"
        >{{item}}
        </span>
        <div v-show="isshow">
            <span class='one'>推荐</span>
            <span>全部</span>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        country: {
            type: Array,
        },
        isshow:{type:Boolean},
    },
    data() {
        return {
            count: 0
        }
    },
    methods: {
        getcountry(item,index){
            this.count = index
            this.$emit('country',item)
        }
    },
}
</script>

<style lang="less" scoped>
.country{
        width: 100%;
        display: flex;
        cursor: pointer;
        position: relative;
           
    span{
         margin-right: 30px;
         padding-bottom: 10px;
    }
    div{
        position: absolute;
        right: 0;
        font-size: 13px;
        top: 8px;
        .one{
            &::after {
          content: "";
          width: 1px;
          height: 15px;
          position: absolute;
          top: 3px;
          right: 70px;
          background: #e1e1e2;
        }
        }

    }
}
.active{
    border-bottom: 2px solid #999999;
}
</style>