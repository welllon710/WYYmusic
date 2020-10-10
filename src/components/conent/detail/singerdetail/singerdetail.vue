<template>
  <div class="singerdetail">
    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>
      <div class="top">
          <img :src="a.img" @load="imgload">
          <div class="text">
              <div class="one">
                  <div class="one_left">
                      <span>歌手</span>
                      <span>{{a.name}}</span>
                  </div>
                  <div class="one-right">
                    <i class="iconfont icon-wenjian "></i>
                  <span>收藏</span>
              </div>
              </div>
               <div class="two">
                  <span>
                    <i class='iconfont icon-yinle '></i>
                      单曲数:
                  </span>
                  <span>{{a.musicSize}}</span>
              </div>
              <div class="two">
                  <span>
                    <i class='iconfont icon-yinle '></i>
                      专辑数:
                    </span>
                    <span>{{a.album}}</span>
              </div>
               <div class="two">
                  <span>
                    <i class='iconfont icon-zhibo  '></i>
                      MV数:
                    </span>
                    <span>{{a.mvSize}}</span>
              </div>
          </div>
      </div>
      <div class="bottom">
           <div class="b_top">
               <div class="laber">
                  <span v-for="(item,index) in list" :key="index"
                  :class="{active:index==count}"
                  @click="jumpaddress(item,index)"
                  class="li"
                  >{{item.name}}</span>
                  <span class="sann" ref="sann" >
                      <span class="bgc">1</span>
                      <span>2</span>
                      <span>3</span>
                  </span>
            </div>
           </div>
           <Album :list='album' 
           :hotlist='hotlists'  
           :albummessage='albummeg' 
            :isshow='show' 
            v-show="count===0"
            >
            </Album>
           <Mv  :mvlist='mvss'   v-show="count===1"></Mv>
           <Message  :messobj='mess' v-show="count===2">
            <h3 slot="name">{{a.name}}简介</h3>
           </Message>
           <Similar :similist='simi' v-show="count===3"></Similar>
      </div>
  </div>
</template>
<script>
import { artists,album,topsong,albummeg,mv,desc,artist} from "../../../../network/detail";
import  loading  from "../../../common/loading";
import  Album  from "./child/album";
import Mv from "./child/mv";
import Message from "./child/message";
import Similar from "./child/similar";
import { Artists } from "../../detail/detail";
export default {
    data() {
        return {
            path:this.$route.path,
            list: [
                {name:'专辑',address:''},
                {name:'mv',address:'/mv'},
                {name:'歌手详情',address:'/message'},
                {name:'相似歌手',address:''},
            ],
            a:{},
            album:[],
            hotlists:[],
            albummeg:[],
            count:0,
            show:0,
            mvss:[],
            mess:{},
            simi:[],
            isLoading:true,
        }
    },
    components: {
        Album,
        Mv,
        Message,
        loading,
        Similar
    },
    mounted() {
        let nodelist = this.$refs.sann.children   //添加点击事件，动态添加颜色
        Array.from(nodelist).forEach((item,index)=>{
            item.setAttribute('value',index)
        item.addEventListener('click',()=>{
            Array.from(nodelist).forEach(itemm=>{
                itemm.className = ''
            })
            item.className = 'bgc'
           this.show = parseInt(item.getAttribute('value'))
        })
        })
        let id = this.$route.params.id
        this.into(id).then(res=>{
          this.imgload()
        })
    },
    methods:{
        jumpaddress(item,index){
            this.count = index
            localStorage.setItem('a',this.count)
        },
        getartists(id){
            artists(id).then(res=>{
               let a = new Artists(res.artist)
               this.a = a
            })
        },
        getalbum(id){
            album(id).then(res=>{
                this.album = res.hotAlbums
                for (const item of res.hotAlbums) {
                    albummeg(item.id).then(res=>{
                        this.albummeg.push(res.songs)
                    })
                }
            })
        },
        gettopsong(id){
            topsong(id).then(res=>{
                this.hotlists = res.songs
                 
            })
        },
        getmv(id){
            mv(id).then(res=>{
                this.mvss = res.mvs
                 
            })
        },
        getdesc(id){
            desc(id).then(res=>{
                this.mess = res
              
            })
        },
        getsimi(id){
            let cookie = this.$store.state.profile.cookie
            artist(id,cookie).then(res=>{
                this.simi = res.artists
            })
        },
        imgload(){
            setTimeout(() => {
            this.isLoading = false
            }, 1000);
          
        },
        into(value){
            this.getartists(value)
            this.getalbum(value)
            this.gettopsong(value)
            this.getmv(value)
            this.getdesc(value)
            this.getsimi(value)
           return Promise.resolve('执行完毕')
        }
    },
    watch: {
        "$route":{
            handler(route){
                const that = this
                if(route.name ==='singer'){
                    that.into(route.params.id).then(res=>{
                        that.imgload()
                    })
                }else{
                    that.isLoading = true
                    that.album = []
                    that.a = {}
                    that.mess = {}
                }
            }
        }
    },
    
}
</script>

<style lang="less" scoped>
.singerdetail{
.top{
    padding: 30px 0 40px 0;
    display: flex;
    img {
      width: 198px;
      height: 198px;
    } 
    .text{
        flex: 1;
         padding-left: 30px;
        .one{
             display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .one_left {
          span {
            &:nth-child(1) {
              color:white;
              display: inline-block;
              background-color: #c62f2f;
              width: 38px;
              height: 22px;
              border: 1px solid #c62f2f;
              font-size: 12px;
              text-align: center;
              line-height: 22px;
            }
            &:nth-child(2) {
              font-size: 22px;
              font-weight: 300;
              padding-left: 7px;
            }
          }
        }
        .one-right{
            border:1px solid #e1e1e2;
            border-radius: 5px;
            font-size:14px;
            padding: 2px 10px;
            display:flex;
            align-items: center;
            i{
                margin-right: 8px;
            }
        }
        }
        .two{
            span{
                font-size: 13px;
            }
        }
    } 
    }
    .bottom{
        .b_top{
          padding-bottom: 10px;
          border-bottom: 1px solid #e1e1e2;
        .laber{
            margin-left:30px;
            position: relative;
            .li{
               margin-right: 60px;
               padding: 0 2px 6px 2px;
            }
            .sann{
               position: absolute;
               right: 0;
               width: 80px;
               height: 22px;
               display: inline-block;
               border: 1px solid #e6e6e6;
               margin-right: 40px;
               span{
                    display: inline-block;
                    width: 26px;
                    height: 22px;
                    text-align: center;
                    &:nth-child(1){
                        border-right:1px solid #e6e6e6;
                    }
                     &:nth-child(2){
                         border-right:1px solid #e6e6e6;
                     }
               }
            }
        }
        }
    }
}
.active{
      border-bottom: 4px solid #c62f2f;
}
.bgc{
    background-color: #7c7d85;
    }
</style>