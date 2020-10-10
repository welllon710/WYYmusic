<template>
    <div class="phone" >
    <i class="iconfont icon-guanbi" @click="close_login"></i>
    <div class="phone_img">
      <img src="~assets/image/login4.png" alt="" />
    </div>
    <div class="phone_text">
      <div class="username">
        <div>
          <img src="~assets/image/86.png" alt="" />
        </div>
        <input type="text" placeholder="请输入手机号" v-model="username" />
      </div>
      <div class="password">
        <img src="~assets/image/lock.png" />
        <input type="password" placeholder="请输入密码" v-model="password" />
        <p>重设密码</p>
      </div>
    </div>
    <div class="autologin">
      <input type="checkbox" id="自动登录" />
      <span>自动登录</span>
    </div>
    <div class="endlogin">
      <el-button :plain="true" @click="loginclick" class="el_button"
        >登录</el-button
      >
    </div>
    <span
      class="register_icon"
      @click="jump"
      v-show="$route.path === $route.matched[0].path + '/phone'"
      >注册</span
    >
    <div class="endcheck">
      <input type="checkbox" id="checkbox" v-model="checked" />

      <label for="checkbox">同意《乱七八糟的策略》才能继续登录</label>
    </div>
    
  </div>
</template>

<script>
import { debounce } from "../../../components/conent/debounce";
import { throttle } from "../../../components/conent/throttle";
import { starlogin } from '../../../network/axios';
export default {
  data() {
    return {
      checked: false, //勾选框,
      username: "",
      password: "",
      userreg: /^1[345789]\d{9}$/, //手机号正则
      passreg: /^(?=.*[a-zA-Z0-9].*)(?=.*[a-zA-Z\\W].*)(?=.*[0-9\\W].*).{6,20}$/, //密码正则 至少包含数字和字母
      model:{}
    };
  },
  methods: {
    close_login() {
      this.$bus.$emit("close_login");
    },
    jump() {
      this.$router.push(this.$route.matched[0].path + "/register");
    },
    loginclick() {
      //登
      if (this.username && this.password && this.checked) {
        if (
          this.userreg.test(this.username) &&
          this.passreg.test(this.password)
        ) {
          starlogin(this.username, this.password).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: "恭喜你，登录成功",
                type: "success",
              });
              this.model.name = res.profile.nickname //用户名
              this.model.id = res.profile.userId  // 账号ID
              this.model.headimg = res.profile.avatarUrl  //账号头像
              this.model.cookie = res.cookie, //cookie
              this.model.token = res.token  //token
              this.$store.commit('person',this.model)
              this.close_login()
            } else if (res.code === 502) {
              this.$message({
                message: "密码错误",
                type: "error",
              });
            } else {
              this.$message({
                message: "账号不存在",
                type: "error",
              });
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.phone {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
  i{
    position: absolute;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
  }
  .phone_img {
    padding: 2.5rem 0;
  }
  .phone_text {
    width: 16.5625rem;
    height: 5.3125rem;
    .username {
      display: flex;
      div {
        width: 6.25rem;
        border: 0.0625rem solid #d8d8d8;
        border-right: none;
        border-bottom: none;
        background-color: #fafafa;
        img {
          position: relative;
          top: 0.4375rem;
        }
      }
      input {
        border-bottom: none;
      }
    }
    input {
      height: 2.5rem;
      width: 100%;
      border: 0.0625rem solid #d8d8d8;
      background-color: #fafafa;
      text-indent: 0.625rem;
      cursor: pointer;
    }
    .password {
      position: relative;
      img {
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        top: 0.625rem;
        left: 0.6875rem;
      }
      input {
        text-indent: 2.5rem;
        box-sizing: border-box;
      }
      p {
        font-size: 0.75rem;
        position: absolute;
        right: 0.625rem;
        top: 0.75rem;
        cursor: pointer;
        color: #a9a9a9;
      }
    }
  }
  .autologin {
    align-self: start;
    padding: 0.5rem 0 0.625rem 2.75rem;
    span {
      font-size: 0.75rem;
      padding-left: 0.3125rem;
      position: relative;
      top: -0.125rem;
      color: #666666;
    }
  }
  .endlogin {
    width: 16.25rem;
    height: 2.5rem;
    border-radius: 0.625rem;
    text-align: center;
    line-height: 2.5rem;
    cursor: pointer;
    .el_button {
      width: 100%;
      height: 100%;
      background-color: #ea4848;
      color: #ffffff;
      font-size: 0.9375rem;
      border-radius: 0.3125rem;
    }
  }
  .register_icon{
    padding-top: 1.25rem;
    cursor: pointer;
  }
  .endcheck {
    position: absolute;
    bottom: 0.3125rem;
    font-size: 0.875rem;
    input {
      position: relative;
      top: 0.0625rem;
    }
    label {
      padding-left: 0.3125rem;
      color: #a9a9a9;
    }
  }
}

</style>
