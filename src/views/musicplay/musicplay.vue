<template>
  <div class="musicplay">
    <audio :src="nowplay?nowplay.url:''" id='audio' ></audio>
    <div class="left" @click="updown">
      <img src="~assets/image/playleft.png" class='up'/>
        <div class="yesno" @click="yesorno">
          <i class="iconfont icon-bofang3" v-show="!playing"></i>
         <i class="iconfont icon-bofang4" v-show="playing" ></i>
        </div>
      <img src="~assets/image/playright.png" class='down' />
    </div>
    <div class="center">
     <span>{{backtime}}</span>
     <div class="progress" >
      <div class='star' ref="stars"  @click="jumpball" >
        <div class="color" ref="color" @click="colorll" :style="{transform: 'scaleX('+progress+')'}"></div>
        <i   ref="ball"  class='ball' :class="{active:ballbool}" :style="{transform: 'translateX('+ballX+'px)'}"></i>
      </div>
     </div>
     <span>{{nowplay?nowplay.time:''}}</span>
    </div>
    <div class="right">
      <i class="iconfont icon-yinliang" ></i>  
      <div class="volume" ref="volume" @click='jumpvolume'>
         <div class="v_color" ref="v_color" @click='v_color' :class="{active:ballbool}" :style="{transform: 'scaleX('+volume+')'}"></div>
         <span class='v_ball' ref="v_ball" :class="{active:volumexbool}" :style="{transform: 'translateX('+volumex+'px)'}"></span>
      </div>
      <i class="iconfont icon-geciweidianji"></i>
      <i class="iconfont icon-iconfront-" @click='playlistshow=true'></i>
    </div>
    <div v-show="playlistshow">
      <play-list @setplayurl='seturl(arguments)'
      @setisshow='playlistshow=false' 
      :alldata='alllist'
      ref="play"
      ></play-list>
    </div>
  </div>
</template>

<script>
let audio = ''
import PlayList from './child/playlist';
import { mapGetters } from 'vuex';
import {record} from '../../network/detail';
import { geturl } from "../../network/axios";
import { Urldetail } from "../../components/common/urldetail";
export default {
  data() {
    return {
      playing: false,//播放状态
      nowplay:{  //当前播放信息
        name:'',
        img:'',
        time:'',
        url:''
      },
      progress:0,//播放进度
      ballX: 0, // 进度条滑块位置
      ballbool:false, 
      currenttime:0, //当前播放时间
      volume:0.5, //音量进度条初始位置
      volumex:0, //音量滑块位置
      volumexbool:false,
      timesize:0,// 初始化
      volumsize:90,// 初始化
      mode:1, // 播放模式，
      index:0,// 歌曲下标
      playlistshow:false,
      alllist:[], //历史播放记录
      // bool:false
    }
  },
  components: {
    PlayList,
  },
  mounted () {
    audio = document.getElementById('audio')
    this.init()  // 初始化播放事件，很重要
    this.getrecord() //获取播放记录
    this.$nextTick(()=>{
      if(this.backhistory){
         this.nowplay = this.backurl[this.index]
      }else{
         this.nowplay = this.alllist[this.index]
      }
    })
    setTimeout(() => {        //用定时器获取元素宽度，否则不准
      this.timesize = this.$refs.stars.offsetWidth
      this.volumsize = this.$refs.volume.offsetWidth 
      this.volumex = this.volume * this.volumsize
    }, 0);
    this.$bus.$on('pause',()=>{
      this.playing = false
      audio.pause()
    })
    this.$bus.$on('play',()=>{
      this.playing = true
      audio.play()
    })
  },
  beforeDestroy (){
    this.$bus.$off('play')
     this.$bus.$off('pause')
  },
  computed: {
    ...mapGetters([
      'backurl','wwidth','backindex','backhistory'
    ]),
    minutes(){
      return this.nowplay.time.slice(0,2) //获取分
    },
    seconds(){
       return this.nowplay.time.slice(3,5)//获取秒
    },
    backtime(){
      let mm = '',ss=''
      let time = parseInt(this.currenttime)
      if(time >= 0 && time<60){
        time < 10?  ss='0'+time : ss=time
        return '00:'+ ss
      }else if(time >= 60){
        mm = parseInt(time/60) //得到分
        mm < 10?  mm='0'+mm :mm
        let SS = time - parseInt(mm*60)
        SS < 10 ? ss='0'+SS : ss = SS
        return  mm+':'+ss
      }
    },
    seek(){ //暂时放着
      this.backurl.find((item,index)=>{
        if(item.name===this.nowplay.name){
          console.log(index);
        }
      })
    },
    judge(){ //判断当前时播放列表还是历史记录
      if(this.backhistory){
        return this.backurl.length
      }else{
         return this.alllist.length
      }
    },

  },
  methods: {
    yesorno(e){  //播放暂停
      if(e.target.className==='iconfont icon-bofang3'&&this.nowplay.url!==''){
        this.playing = true
        audio.play()
        this.ballmove()
        this.volumeball()
      }
      if(e.target.className==='iconfont icon-bofang4'){
        this.playing = false
        audio.pause()
      }
    },
    init(){  //播放事件
    console.log('init');
      let that = this
      audio.addEventListener('play',()=>{
        console.log('开始播放');
      })
      audio.addEventListener('timeupdate', that.progressbar)  //进度条发生改变触发事件
       audio.addEventListener('loadstart',()=>{ //音量事件
         that.volume = audio.volume   
         that.volumex = audio.volume * that.volumsize
       })
      audio.addEventListener("ended",()=>{
          console.log('结束了');
          this.down()
      })
    },
    progressbar (){
        this.currenttime = audio.currentTime // 未处理的当前时间
        let percentage = audio.currentTime / audio.duration  || 0; // 当前进度的百分比
        this.progress = percentage //播放条缩放比例
        this.ballX = this.progress * this.timesize
    },
    ballmove(){
      this.slide('progress',this.$refs.ball,this.timesize)
    },
    volumeball(){
        this.slide('volume',this.$refs.v_ball,this.volumsize)
    },
    slide(type,ball,bgclength){ //type:判断是进度条还是音量,ball:小球元素
      let that = this   //保存this
      ball.onmousedown  = function(e){
      if(type==='progress'){
        that.ballbool = true
        audio.pause()
        }else{
        that.volumexbool =true
        }
        let nowx = e.clientX //保存鼠标按下当前位置
        let ballleft = that.reg(ball.style.transform) //当前缩放距离
        let endx = 0  //最终位置
        let endballleft = 0 //缩放最终位置
      document.onmousemove = function(e){
        endx = e.clientX
        let movex = endx - nowx 
        let distancemove = movex + ballleft - 0 //移动距离
        if(movex > 0){ //边界值判断
          endballleft = distancemove > bgclength? bgclength:distancemove
        }else{
           endballleft = distancemove <= 0? 0:distancemove
        }
        if(type==='progress'){
        that.progress = endballleft / bgclength //滑动条移动
        that.ballX = endballleft  //小球移动
        }else{
          that.volume = endballleft / bgclength
          that.volumex = endballleft
        }
      document.onmouseup =  function(e){
          if(type==='progress'){
            console.log('太瘦了');
            audio.currentTime = endballleft * audio.duration/bgclength //播放时间移动
            audio.play();
            that.ballbool = false
          }else{
            audio.volume = endballleft / bgclength
            that.ballbool = false
          }
        document.onmousedown = null
        document.onmousemove = null;
        document.onmouseup = null;
      }
      }
      }
    },
    updown(e){
      if(e.target.className === 'up'){
        console.log('上一首');
        this.up()
      }
      if(e.target.className === 'down'){
        console.log('下一首');
        this.down()
      }
    },
    up(){
      this.upandown('up')
    },
    down(){
      this.upandown('down')
    },
    upandown(type){
      switch (this.mode) { //播放模式
        case 2:
          this.index = Math.floor(Math.random()*this.backurl.length) //随机播放
          break;
        default :
          if(type==='up'){
            this.index - 1>=0 ? this.index-- : 0
          }else{
            this.index = this.index +1 > this.judge? this.judge - 1 : this.index+1
            console.log(this.index);
            console.log('执行');
          }
          break;
      }
      if(this.backhistory){
         this.nowplay = this.backurl[this.index]
      }else{
         this.nowplay = this.alllist[this.index]
      }
      this.playing = true
      setTimeout(() => {
        audio.play()
      }, 100);
    },
    jumpball(e){
      let clickx = e.offsetX  // 当前点击位置
      this.ballX = clickx
      this.progress = clickx / this.timesize 
      audio.currentTime = clickx * audio.duration/this.timesize //播放时间移动
      audio.play();
    },
    colorll(e){
      let clickx = e.layerX  // 当前点击位置
      e.stopPropagation(); //阻止冒泡
      this.ballX = clickx
      this.progress = clickx / this.timesize 
      audio.currentTime = clickx * audio.duration/this.timesize //播放时间移动
      audio.play();
    },
    jumpvolume(e){
       let clickx = e.offsetX  // 当前点击位置
       this.volumex = clickx
       this.volume = clickx / this.volumsize
       audio.volume =  this.volume

    },
    v_color(e){
      let clickx = e.layerX  // 当前点击位置
      e.stopPropagation(); //阻止冒泡
      this.volumex = clickx
      this.volume = clickx / this.volumsize
      audio.volume =  this.volume
    },
    seturl(value){
      let a = value[0]//音乐信息
      let b = value[1] //index
      this.nowplay = a
      this.index = b
      this.playing = true
      setTimeout(() => {
        audio.play()
      }, 100);
     

    },
    getrecord(){ //获取播放记录
      let cookie = this.$store.state.profile.cookie
      let id = this.$store.state.profile.id
      record(id,cookie).then(res=>{
        res.allData.map((item,index)=>{
          geturl(item.song.id).then(ress=>{
            let k = new Urldetail(item.song,ress.data)
            this.alllist[index] = k
          })
        })
      })
      this.$store.commit('alldata',this.alllist)
    },
    reg(str) {
    return Number(str.replace(/translateX\(|px\)/g , '')) //正则截取
  },
  },
  watch:{
    backurl(){ //添加音乐
       if(this.backhistory){
         this.nowplay = this.backurl[this.index]
      }else{
         this.nowplay = this.alllist[this.index]
      }
      this.index = this.backindex //改变后index
      this.playing = true
      audio.play()
      
    },
    wwidth(value){ 
     this.ballbool = true
     setTimeout(() => {
       this.progressbar()
      
     }, 100)
     this.timesize = this.$refs.stars.offsetWidth  //实时判断
     this.volumsize = this.$refs.volume.offsetWidth
    },
    backtime(value){  //提交当前时间
      this.$store.commit('gettime',value)
    },
    playing(value){ //是否播放
      this.$store.commit('getbool',value)
    },
    index(value){  //进行上一首还是下一首时候。把index提交vuex
      this.$store.commit('changeindex',value)
    },
  },
}
</script>

<style lang="less" scoped>
.musicplay{
  height: 50px;
  width: 100%;
  min-width: 1024px;
  background-color: #f6f6f8;
  position: absolute;
  z-index: 20;
  bottom:0;
  display: flex;
  .left{
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    cursor: pointer;
    .yesno{
      width: 40px;
      height: 40px;
       i{
      font-size: 40px;
      color: #c62f2f;
       }
    }
  }
  .center{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    span{
        font-size: 13px;
    }
    .progress{
      width: 100%;
      padding: 0 20px;
      .star{
        height: 5px;
        background-color: #e6e6e8;
        position: relative;
        // width: 100%;
        min-width: 450px;
        .color{
          background-color: #c62f2f;
          height: 100%;
          position: absolute;
          transform-origin: 0 0;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;

        }
        .ball{
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: red;
        display: inline-block;
        position: absolute;
        cursor: pointer;
        top: -5px;
        left: 0;
      }
      }
    }
  }
  .right{
    width: 300px;
    align-self: center;
    display: flex;
    justify-content: space-evenly;
    .icon-yinliang{
       position: relative;
        top: 0px;
        left: 25px;
    }
    .volume{
      width: 90px;
      height: 5px;
      background-color: #e6e6e8;
      align-self: center;
      margin-left: 10px;
      position: relative;
      min-width: 90px;
      .v_color{
          background-color: #c62f2f;
          height: 100%;
          position: absolute;
          transform-origin: 0 0;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
      }
      .v_ball{
        width: 12px;
        height: 12px;
        display:inline-block;
        background-color: #c62f2f;
        position:absolute;
        border-radius: 50%;
        top: -3px;
        left:0;
      }
    }
    i{
      font-size: 20px;
    }
  }
}
.active{
  transition:none !important;
}
</style>