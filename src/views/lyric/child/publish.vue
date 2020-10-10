<template>
  <div class="publish">
      <div class="up">
        <slot name='title'></slot>
        <i class='iconfont icon-guanbi ' @click='close'></i>
      </div>
      <div class="center">
        <slot name='text'></slot>
        <div>
            <span>
                <i class='iconfont icon-xiaolian '></i>
                 <i class='iconfont icon-aite  '></i>
            </span>
            <span>140</span>
        </div>
      </div>
      <div class="bottom">
        <button  :class="{active:isshows}" @click="letsgo">评论</button>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        isshows: {
            type: Boolean,
        }
    },
    methods: {
        close(){     //关闭
            this.$emit('colses')
        }, 
        letsgo(){ //点击评论
            this.$emit('starreply')
        }
    }
}
</script>

<style lang="less" scoped>
.publish{
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 474px;
    height: 276px;
    border: 1px solid #e1e1e2;
    box-shadow: 0 0 0.625rem #e2e2e2;
    background-color: #fafafa;
    .up{
        display: flex;
        justify-content:space-between;
        padding: 15px 10px 25px 20px;
        span{
            font-size: 15px;
            font-weight: 600;
            color: #666
        }
    }
    .center{
        width: 100%;
        display: flex;
        flex-direction: column;
        textarea{
            width: 410px;
            height: 100px;
            align-self: center;
            padding: 10px;
          
        }
        div{
            display: flex;
            justify-content:space-between;
            padding: 10px 22px;
            i{
                font-size:20px;
               &:nth-child(2){
                   padding-left: 10px;
               }
            }
            span{
                font-size: 13px;
            }
        }
    }
    .bottom{
        width: 100%;
        background-color: #f5f5f7;
        height: 50px;
        display: flex;
        justify-content:flex-end;
        align-items: center;
        button{
            height: 30px;
            width: 80px;
            margin-right:20px;
            background-color: #96c0e1;
            border:none;
            border-radius: 5px;
            color: #b5d3ea;
        }
    }
}
.active{
    background-color: #0c73c2 !important;
    color: #fff !important;
}
</style>