<template>
  <div class="_video">
       <span class="all" @click='come'>
           {{all==''?'全部视频':all}}
        <img src="~assets/image/bottom.png" >
        </span>
        <classify :grouplist ='group'  v-show="isshow"  @setall='setname'></classify>
       <hotlaber :hotlaber='category' @sethot='setlaber'>
        <div class='lab'>热门标签:</div>
       </hotlaber>
  </div>
</template>

<script>
import classify from "../child/classify";
import hotlaber from '../../../components/conent/hotlaber';
import { mvgroup,mvcategory,videogroup,timeline} from "../../../network/detail";
export default {
    components: {
        classify,
        hotlaber
    },
    data() {
        return {
            group:[],
            category:[],

            all:'',
            isshow:false,
        }
    },
    computed: {
        cookie() {
            return this.$store.state.profile.cookie
        }
    },
   mounted () {
    this.getgroupmv()
    this.getmvcategory()
    // this.getvideogroup(70002,0)
    this.gettimeline()
  },
  methods: {
    getgroupmv(){ //全部分类
      mvgroup().then(res=>{
        this.group = res.data
      })
    },
    come(){
      this.isshow = !this.isshow
    }, 
    setname(value){  
      this.all = value
    }, 
    getmvcategory(){  //标签
      mvcategory(this.cookie).then(res=>{
        this.category = res.data
      })
    },
    setlaber(item){   
      this.all = item
    },
    getvideogroup(id,offset){
        videogroup(id,offset,this.cookie).then(res=>{
            console.log(res);
        })
    },
    gettimeline(){
        timeline(this.cookie).then(res=>{
            console.log(res);
        })
    }
  }
}
</script>

<style lang="less" scoped>
._video{
     .all{
        height: 24px;
        border-radius: 5px;
        line-height:24px;
        border: 1px solid #e1e1e2;
        font-size: 12px;
        padding: 0 5px;
        margin-top: 20px;
        display: inline-block;
        img{
            width: 10px;
            height: 10px;
        }
    }
}
</style>