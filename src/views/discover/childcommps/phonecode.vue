<template>
  <div class="phonecode">
       <!-- <router-link to="/discover/phone" class='_return'>返回登录</router-link> -->
       <span class='_return' @click="jump">返回登录</span>
      <div class="phonecode_img">
          <img src="~assets/image/login4.png" >
      </div>
       <div class="phonecode_text">
           <span>为了安全，我们会向你的手机发送短信效验码</span>
        </div> 
       <div class="getkey">
          <div class="getkey_text">
              <img src="~assets/image/key.png" >
              <input type="text" placeholder="填写验证码" >
          </div>
          <div class="getkey_btn">
            重新获取
          </div>
       </div>
       <div class="phonecode_next">
        <el-button :plain="true" class="el_button">下一步</el-button>
       </div>

  </div>
</template>

<script>
export default {
    methods: {
        jump(){
            this.$router.push(this.$route.matched[0].path + '/phone')
        }
    }
}
</script>

<style lang="less" scoped>
.phonecode{
    display:flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 10;
    width: 21.875rem;
    height: 33.125rem;
    background-color:#fafafa;
    border: 0.0625rem solid #eee;
    box-shadow: 0 0 10px #e2e2e2;
    .phonecode_img{
        padding-top: 3.875rem;
    }
    .phonecode_text{
        font-size: 0.75rem;
        color: #333333;
    }
    .getkey{
        display: flex;
        margin: 1.875rem 0;
        font-size: 0.9375rem;
        .getkey_text{
            display: flex;
            position: relative;
            img{
                width: 1.375rem;
                height: 1.375rem;
                position: absolute;
                top: 0.625rem;
                left: 0.3125rem;
            }
            input{
                border: 0.0625rem solid #d8d8d8;
                width: 7.8125rem;
                height: 2.5rem;
                border-radius: 0.3125rem;
                text-indent: 1.875rem;
            }
           
        }
         .getkey_btn{
            padding: 0.75rem 1.875rem;
            background-color: #ea4848;
            border-radius: 0.3125rem;
            margin-left: 0.625rem;
            color:white;
            cursor: pointer;
            &:hover{
                background-color: #c72e2e;
            }
        }
    }
    .phonecode_next{
        width: 16.25rem;
        height: 2.5rem;
        .el_button{
            width: 100%;
            height: 100%;
            border-radius: 0.3125rem;
            background-color: #ea4848;
            color: white;
            font-size: 1rem;
        }

    }
}
._return{
    padding: 0.875rem 0 0 0.9375rem;
    font-size: 0.75rem;
    position: absolute;
    left: 0;
    color: #666666;
    text-decoration: none;

}
</style>