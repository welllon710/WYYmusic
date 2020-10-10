<template>
 <div class="bigbox">
    <div class="singer" :style="{width:wwidth+'px'}">
    <div class="sort" >
        <hotlaber :hotlaber='language' @sethot='singer'>
            <div class='lab'>语种：</div>
        </hotlaber>
        <hotlaber :hotlaber='sort' @sethot='singer'>
            <div class='lab'>分类：</div>
        </hotlaber>
    </div>
    <div>
    <top></top>
    <div class="ul" >
        <div class="li" :style="{width:fff/5.5+'px',height:kkk/3.88+'px'}">
            <div class="smallbox" >
              <img src="~assets/image/singers.png" >
            </div>
            <div class='songs_text'>
                歌手排行榜
            </div>
       </div>
        <div v-for="(item, index) in list" :key="index" class="li" 
        @click="getid(item.name)"
        :style="{width:fff/5.5+'px',height:kkk/3.88+'px'}">  
            <div class="smallbox" >
              <img :src="item.img1v1Url" >
            </div>
            <div class='songs_text'>
               {{item.name}}
            </div>
          </div>
    </div>
    </div>
  </div>
 </div>
</template>

<script>
import hotlaber from "../../../../components/conent/hotlaber";
import { mapGetters } from 'vuex';
import top from '../../../../components/conent/top/top';
import { singers } from "../.././../../network/axios";
import { search } from "../.././../../network/detail";


export default {
    components: {
        hotlaber,
        top
    },
   data() {
    return {
      language: ['全部','华语','欧美','日本','韩国','其他',],
      sort:['全部','男歌手','女歌手','乐队组合',],
      findters:['热门','A','B','C','D','E','F','G','H','I','J','K','L',
      'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      time:false,
      lan:[],
      list:[],
      a:-1,
      b:-1,
    }
  },
   computed: {
        ...mapGetters([
            'wwidth',
        ]),
        fff(){
       if(this.wwidth > 880) {
            return  880
       }else{
         return this.wwidth
       }
     },
     kkk(){
        if(this.wwidth > 840) {
            return  840
       }else{
         return this.wwidth
       }
     }
  },
  created() {
    this.getsingers(this.a,this.b)
  },
  methods:{
    getsingers(a,b){
     singers(a,b).then(res=>{
       this.list = res.artists
     })
    },
    getid(id){
     search(id).then(res=>{
     let iid = res.result.artists[0].id
     this.$router.push({path:`/discover/singerdetail/${iid}`})
    })
    },
    singer(res){   //点击
    this.getlanguage(res)
    this.getsin(res)
    this.getsingers(this.a,this.b)
    },

    getlanguage(index){  //用两个不同的变量保存
      switch (index) {
         case '华语':
          this.a = 7  //this.a
        break;
         case '欧美':
          this.a = 96
        break;
         case '日本':
          this.a = 8
        break;
          case '韩国':
          this.a = 16
        break;
          case '其他':
          this.a = 0
        break;
         case '全部':
          this.a = -1
        break; 
      }
    },
    getsin(key){
      switch (key) {
        case '全部':
          this.b = -1
        break; 
          case '男歌手':   //this.b
          this.b = 1
        break;
         case '女歌手':
          this.b = 2
        break;
         case '乐队':
          this.b = 3
        break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content:center;
  .singer{
        position: relative;
        .ul{
          padding-top: 25px;
          width: 100%;
           display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
         margin-top: 0.625rem;
          .li{
            list-style: none;
            width: 138px;
            height: 196px;
            cursor: pointer;
             .smallbox{
                width: 100%;
               img{
                 width: 100%;
               }
             }
            }
           .songs_text{
             font-size: 14px;
           }  

          }
        }
  }
</style>