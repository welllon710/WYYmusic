<template>
  <div class="rightmenu"  v-show="show" :style="{transform: 'translate('+a+'px,'+b+'px)'}">
    <div class="up">
       <slot name='up'></slot>
       <span>
           <i class='iconfont icon-bofang '></i>
            播放
       </span>
       <span>
           <i class='iconfont icon-bofang '></i>
            下一首播放
       </span>
    </div>
    <div class="up">
        <span>
           <i class='iconfont icon-bofang '></i>
            收藏
       </span>
       <span>
           <i class='iconfont icon-bofang '></i>
            分享
       </span>
       <span>
           <i class='iconfont icon-bofang '></i>
            复制链接
       </span>
       <span>
           <i class='iconfont icon-bofang '></i>
            下载全部
       </span>
    </div>
    <div class="up">
         <slot name='down'></slot>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            a: 0,
            b:0,
            show:false,
        }
    },
    mounted () {
        this.$bus.$on('place',(res)=>{
            this.a = res.x
            this.b = res.y
            this.show = res.isshow
        })
        this.$bus.$on('isshow',(res)=>{
            this.show = res
        })

    },

}
</script>

<style lang="less" scoped>
.rightmenu{
    width: 212px;
    background-color:#fafafc;
    box-shadow: 0 0 0.625rem #e2e2e2;
    position:absolute;
    top: 0;
    left: 0;
    .up{
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #e1e1e2;
        width: 100%;
        span{
            display: inline-block;
            padding: 5px 0  0 12px;
            font-size:13px;
            cursor: pointer;
            &:hover{
                background-color: #ededef;
            }

            i{
                margin-right: 13px;
                font-size: 20px;
            }
        }
    }
}
</style>