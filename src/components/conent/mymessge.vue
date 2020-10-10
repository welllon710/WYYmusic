<template>
  <div class="mymessage" ref="meg" v-show="isshow">
    <div class="top">
      <div class="up">
        <img :src="personmeg.headimg" alt="" />
        <span>{{ personmeg.name }}</span>
         <el-button :plain="true" @click="signN" class="sign"
        >签到</el-button
      >
      </div>
      <div class="down">
        <div class="mystase">
          <span class='num'>0</span>
          <span class='china'>动态</span>
        </div>
        <div class="myfollow">
          <span  class='num'>4</span>
          <span class='china'>关注</span>
        </div>
        <div class="myfans">
          <span  class='num'>0</span>
          <span class='china'>粉丝</span>
        </div>
      </div>
    </div>
    <div class="center">
        <div class='c_up'>
            <span>
                <i></i>
                会员中心
            </span>
            <span class='c_right'>
                未订购
                <i></i>
            </span>
        </div>
         <div class='c_up'>
             <span>
                <i></i>
                等级
             </span>
              <span  class='c_right'>
                LV.6
                <i></i>
            </span>
         </div>
          <div class='c_up'>
              <span>
                 <i></i>
                 商城
             </span>
              <span  class='c_right'>
                <i></i>
            </span>
          </div>
    </div>
    <div class="bottom">
        <div >
            <span>
                <i></i>
                个人信息设置
            </span>
            <span class='b_right'>
                <i></i>
            </span>
        </div>
        <div >
             <span>
                <i></i>
                绑定社交账号
            </span>
            <span class='b_right'>
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </div>
    <div class="end">
        <span @click="endlogin">
            <i></i>
            退出登录
        </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {endlogin,sign} from '../../network/axios';
export default {
    data() {
        return {
            isshow: '',
        }
    },
  computed: {
    ...mapGetters(["personmeg", "backxy"]),
  },
  mounted() {
    this.$bus.$on("backxy", (res) => {
      this.isshow = res.show    
      let x = res.x - 200 - 135;
      this.$refs.meg.style.left = x + "px";
    });
  },
  methods:{
      endlogin(){
          endlogin().then(res=>{
            this.$store.commit('person','')
            this.isshow = false
          })
      },
      signN(){
          let cookie = this.$store.state.profile.cookie
          sign(cookie).then(res=>{
            if(res.code =200){
                this.$message({
                message: "签到成功,经验+3",
                type: "success",
              });
            }
          }).catch(err=>{
               this.$message({
                message: "一天只能签到一次哦!",
                type: "error",
              });
          })
      }
  }
};
</script>

<style lang="less" scoped>
.mymessage {
  width: 275px;
  height: 366px;
  background-color: #fafafa;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  .top {
    height: 132px;
    border: 1px solid #e1e1e2;
    .up {
      padding: 20px 8px 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      span {
        font-size: 15px;
        position: relative;
        left: -10px;
      }
      .sign {
        border: 1px solid #e1e1e2;
        padding: 3px 12px;
        font-size: 12px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .down {
      display: flex;
      justify-content: space-around;
      padding-bottom: 10px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .num{
          font-weight: 800;
      }
      .china{
        font-size:13px;
        color: #666;
      }
      .mystase {
        position: relative;
        &::after {
          content: "";
          width: 1px;
          height: 35px;
          position: absolute;
          top: 0;
          left: 60px;
          background: #e1e1e2;
        }
      }
      .myfollow{
        position: relative;
        &::after {
          content: "";
          width: 1px;
          height: 35px;
          position: absolute;
          top: 0;
          left: 60px;
          background: #e1e1e2;
        }
      }
    }
  }
  .center{
      height:108px ;
      padding-bottom: 5px;
      border-bottom: 1px solid #e1e1e2;
     .c_up{
        position: relative;
        padding: 10px 0 10px 20px;
        font-size:13px;
        &:hover{
            background-color: #ebeced;
        }
        }
     .c_right{
         position:absolute;
         right: 0;
         padding-right: 10px;
     }

  }
  .bottom{
      height: 72px;
       border-bottom: 1px solid #e1e1e2;
    div{
        position: relative;
        padding: 10px 0 10px 20px;
        font-size:13px;
         &:hover{
            background-color: #ebeced;
        }
        .b_right{
            position:absolute;
         right: 0;
         padding-right: 10px;
        }
    }
  }
  .end{
      height: 50px;
      line-height:50px;
      font-size:13px;
       &:hover{
            background-color: #ebeced;
        }
     span{
         padding-left: 20px;
     }
  }

}
</style>
