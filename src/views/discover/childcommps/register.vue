<template>
  <div class="register">
      <!-- <router-link to="/discover/phone" class='_return'>返回登录</router-link> -->
      <span class='_return' @click='_return'> 返回登录</span>
      <div class="phone_img">
          <img src="~assets/image/login4.png" alt="">
      </div>
      <div class="phone_text">
         <div class='username'>
            <div>
                <img src="~assets/image/86.png" alt="">
            </div>
            <input type="text" placeholder="请输入手机号" >
        </div>
        <div class='password'>
             <img src="~assets/image/lock.png" >
            <input type="password"  placeholder="请输入密码">
        </div>
      </div>
      <div class="endlogin" >
        <!-- <router-link :to="register" class='phone_code'>注册</router-link> -->
        <span class='phone_code' @click='getregister'>注册</span>
      </div>
  </div>
</template>

<script>
export default {
   data() {
       return{
           url:this.$route.matched[0].path + '/phone',
           register:this.$route.matched[0].path + '/phonecode'
       }
   },
   created() {
       console.log(this.url);
   },
   methods: {
       getregister(){
           console.log('dianjile');
           this.$router.push(this.$route.matched[0].path + '/phonecode')
       },
       _return(){
             this.$router.push(this.$route.matched[0].path + '/phone')
       }
   }
   
}
</script>

<style lang="less" scoped>
.register{
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
    .phone_img{
        padding: 2.5rem 0;
    }
    .phone_text{
        width: 16.5625rem;
        height: 5.3125rem;
    .username{
        display: flex;
        div{
            width: 6.25rem;
             border: 0.0625rem solid #d8d8d8;
             border-right: none;
             border-bottom: none;
             background-color: #fafafa ;
             img{
                 position: relative;
                 top: 0.4375rem;
             }
        }
        input{
            border-bottom: none;
        }
    }
    input{
        height: 2.5rem;
        width: 100%;
        border: 0.0625rem solid #d8d8d8;
        background-color: #fafafa ;
        text-indent:0.625rem;
    }
    .password{
        position: relative;
        img{
            width: 1.25rem;
            height: 1.25rem;
            position: absolute;
            top: 0.6875rem;
            left: 0.6875rem;
        }
        input{
            text-indent:2.5rem;
            box-sizing: border-box;
        }
    }
    }
    .endlogin{
      width: 16.25rem;
      height: 2.5rem;
      background-color: #ea4848;
      border-radius: 0.625rem;
      text-align: center;
      line-height: 2.5rem;
      color: #ffffff;
      margin-top: 2.5rem;
      cursor: pointer;
      .phone_code{
          font-size: 0.9375rem;
          text-decoration: none;
          color: white;
      }
    }
   ._return{
    align-self: start;
    padding: 0.875rem 0 0 0.9375rem;
    font-size: 0.75rem;
    color: #666666;
    text-decoration: none;
    cursor: pointer;
   }
}
</style>