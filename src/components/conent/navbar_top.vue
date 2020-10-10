<template>
  <div class="navbar_top">
    <div class="navbar_left" >
      <i class="iconfont icon-wangyiyunyinle-" @click="jumpdiscover"></i>
    </div>
    <div class="navbar_center">
      <div class="n_c_left">
        <div class='n_c_left_one'>
          <span class="iconfont icon-zuo " ></span>
          <span class="iconfont icon-you"></span>
        </div>
        <div class='n_c_left_two'>
          <input type="text" placeholder="搜索音乐,视频,歌词,电台" v-model="count" @input="getcount" @focus="focus"  
          ref="input" @blur="lose"
           />
          <i class='iconfont icon-search' @click="search_click"></i>
        </div>
      </div>
      <div class='n_c_right'>
         <div @click="login">
              <img src="~assets/image/login.jpg" v-if="Object.keys(personmeg).length ==num" >
              <img :src="personmeg.headimg"  v-else>
            <span class='navlogin' @click="jump" v-if="Object.keys(personmeg).length ==num">登录</span>
            <span class='navlogin'  v-else @click="mymessage" ref='getx'>
            {{personmeg.name}}
            </span>
         </div>
         <div>
             <i class='iconfont icon-huanfu'></i>
              <span @click="staus">查询</span>
             <i  class='iconfont icon-email'></i>
             <i class='iconfont icon-shezhi'></i>
         </div>
      </div>
    </div>
    <div class="navbar_right">
        <i class='iconfont icon-minimize'></i>
        <i class='iconfont icon-zuixiaohua'></i>
        <i class='iconfont icon-zuidahua' @click="maxwidth"></i>
        <i class='iconfont icon-guanbi'></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { login_state } from "../../network/axios";
export default {
    data() {
        return {
           count:'',
           id:'登录',
           num:0,
           isshow:false,
       }
    },
    computed: {
      ...mapGetters(['personmeg'])
    },
    methods: {
      getcount(){
          this.$emit('getinput',this.count)
      },
      focus(){
        this.$emit('inputfocus')
      },
      search_click(){
        this.$emit('search_click')
        
      },
      leave(){
        this.$emit('m_leave')
         this.$refs.input.value = ''
      },
      lose(){
        this.$emit('blurlose')
      },
      login(){
        this.$emit('starlogin')
      },
      jump(){
        this.$router.push('/discover/phone')
      },
      staus(){
       let cookie = this.$store.state.profile.cookie
       login_state(cookie).then(res=>{
         console.log(res);
       })
      },
      maxwidth(){
        this.$bus.$emit('maxwidth')
      },
      mymessage(e){
      this.isshow = !this.isshow
       let xy = {
         x:e.clientX,
         y:e.clientY,
         show: this.isshow,
       }
      
       this.$bus.$emit('backxy',xy)
      },
      jumpdiscover(){
        console.log('ss');
        this.$router.push('/discover')
      }
    },
};
</script>

<style lang="less" scoped>
.navbar_top {
  height: 3rem;
  min-width: 64.0627rem;
  background-color: rgb(198, 47, 47);
  display: flex;
  .navbar_left {
    width: 13rem;
    i {
      font-size: 9.375rem;
      position: relative;
      top: -3.4374rem;
      
    }
  }
  .navbar_center {
    flex: 1;
    display: flex;
    position: relative;
    .n_c_left{
         display: flex;
         align-items: center;
         .n_c_left_one{
             padding-right: 0.9375rem;
             span{
                 border: 0.0624rem solid black;
                 border-radius: 0.3127rem;
                 padding: 0.1251rem 0.3127rem;
                 color:white;
                 &:nth-child(1){
                     border-right: none;
                 }
             }
         }
         .n_c_left_two{
             position: relative;
             input{
                 padding: 0.2499rem 0.6249rem;
                  outline: none;
                  border: none;
                  background-color: rgb(168, 40, 40);
                  border-radius: 0.9375rem;
                  color:#c77373
             }
             i{
                 position: absolute;
                 right: 0.3127rem;
                 top: 0.2499rem;
                 color:#ca7d7d;
                 font-size: 1.0626rem;
             }
         }
    }
    .n_c_right{
        display: flex;
        align-items: center;
        height: 100%;
        position: absolute;
        right: 0;
        img{
            width: 1.5623rem;
            height: 1.5623rem;
            border-radius: 0.9375rem;
            position: relative;
            top: 0.4373rem;
        }
        .navlogin{
            padding-left: 0.6249rem;
            line-height: 2.7501rem;
            color:white;
            font-size: 0.8751rem;
             text-decoration:none;
            cursor: pointer;
            &:hover{
              color:#80ffff
            }
        }
        & div:nth-child(2) {
            padding-left: 3rem;
            i{
                padding: 0 0.8751rem;
                font-size: 1.2501rem;
                color: white;
            }
        }
    }

  }
  .navbar_right {
    width: 12%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  i{
      color:white
  }
}
</style>
