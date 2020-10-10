<template>
  <div class="bigbox">
      <div class="newsong" :style="{width:wwidth+'px'}">
        <transition name="fade">
             <loading v-if="isLoading"></loading>
        </transition>
        <div class='top'>
            <div class='top_two'>
                <div class="aa" v-for="(item,index) in aabb" :key="index" :class="{active:index===count}"
                @click="changecolor(index)"
                >{{item}}</div>
            </div>
        </div>
       <div class="laber">
            <country :country='country' @country='getcountry' :isshow='!isshow'></country>
        </div>
        <div class="center">
        <playlist :list='newest' v-show="isshow"  :settimes='timee' @load='imgload'></playlist>
        <dish :list='dish'></dish>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import country from './child/country';
import playlist from './child/playlist';
import dish from './child/dish';
import loading from "../../../../components/common/loading";
import { newest,newdish,songdetail} from "../../../../network/axios";
export default {
    data() {
        return {
            country: ['全部','华语','欧美','韩国','日本',],
            newest:[],
            aabb:['新歌速递','新碟上架'],
            count:0,
            isshow:true,
            dish:[],
            timee:[],
            isLoading:true,
        }
    },
    components: {
        country,
        playlist,
        dish,
        loading
    },
    created() {
        this.getnewest(0)
        this.getnewdish()
    },
    computed: {
        ...mapGetters([
            'wwidth',
        ])
    },
    methods: {
        imgload(){
            this.isLoading = false
        },

        getcountry(res){  //点击
            this.getnewest(this.getindex(res))
        },
        getnewest(type){
            newest(type).then(res=>{
                this.newest = res.data
                for (const value of res.data) {
                    songdetail(value.id).then(res=>{
                       this.timee.push(res.songs[0].dt)
                    })
                }
            })
        },
        getnewdish(){
            newdish().then(res=>{
                this.dish = res.products
            })
        },
        getindex(index) {
         switch (index) {
        case '全部':
          return 0;
          break;
        case '华语':
          return 7;
          break;
        case '欧美':
          return 96;
          break;
        case '日本':
          return 8;
          break;
        case '韩国':
          return 16;
          break;
      }
    },
    changecolor(index){
      this.count = index;
      if (index === 0) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    }
    },
}
</script>

<style lang="less" scoped>
.bigbox{
    width: 100%;
    display: flex;
    justify-content:center;
    .newsong{
        .top{
            width: 100%;
            padding: 30px 0 20px 0;
            display: flex;
            justify-content:center;

            .top_two{
                width: 213px;
                display: flex;
                border:1px solid #e5e5e5;
                .aa{
                    width: 50%;
                    text-align: center;
                    // background-color:#fff;
                    padding: 8px 0;
                    color: #888;
                    font-size: 13px;
                }
            }
        }
        .laber{
             border-bottom: 1px solid #e1e1e2;
        }
    }
}
.active{
 background-color: #7c7d85 ;
 color: red;
}
</style>