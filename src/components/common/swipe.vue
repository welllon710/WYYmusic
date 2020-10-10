<template>
 <div class="bigbox">
    <div class="swipe" :style="{width:swipewidth +'px',}">
    <div class="mask">
      <span @click='left'>左</span>
        <span @click='right'>右</span>
    </div>
    <div class="list" >
      <ul>
        <li v-for='(item,index) in list' :key="index" :style="ddd[index]" >
          <img :src="item.imageUrl ||item.pic" @click="getmusic(item,index)">
        </li>
      </ul>
    </div>
   <div class="btn" :style="{width:swipewidth +'px',}">
     <span v-for='(item,indexx) in list.length' :key="indexx" :class="{active:indexx===count}"></span>
   </div>
  </div>
 </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
    swipewidth:{type:Number}
  },
  data() {
    return {
      a:1,
      tool:[],
      listyle:[
        { position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:'0.5s',
          transform: "translateX(0)", //1
          zIndex:'1',
  
        },
         {
          position: 'absolute',
          height: '200px',
          transition:' 0.8s',
          transform: `translateX(111px)`, //2
          zIndex:'2',
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.5s',
          transform: 'translateX(540px) ',//3
          zIndex:'1',
  
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.5s',
          transform: 'translateX(651px)',//4
      
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.8s',
          transform: 'translateX(762px)',//5
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.8s',
          transform: 'translateX(873px) ',//6
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.8s',
          transform: 'translateX(984px)',//7
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.8s',
          transform: 'translateX(1095px)',//8
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.8s',
          transform: 'translateX(1206px)',//9
        },
         {
          position: 'absolute',
          height: '190px',
          bottom: '0',
          transition:' 0.8s',
          transform: 'translateX(1317px)',//10
        },
        
      ],
      count:0,
    }
  },
  created(){
    setInterval(() => {
     this.right()
    }, 2000);
  },

  computed: {
   ddd(){
     let a= this.list.length
     return this.listyle.splice(0,a)
   }
  },
  methods: {
    left(){
      let abc = this.ddd.find(item=>item.zIndex==2)
      abc.transform = `translateX(${(this.swipewidth-540) * 0.503}px)`
      this.ddd.push(this.ddd[0])
      this.ddd.shift()
      this.count--
      if(this.count < 0){
        this.count = this.list.length-1
      }
    
    },
    right(){
    let abc = this.ddd.find(item=>item.zIndex==2)
     abc.transform = `translateX(${(this.swipewidth-540) * 0.503}px)`
      this.ddd.unshift(this.ddd[this.list.length - 1])
      this.ddd.pop()
      this.count++
      if(this.count > this.list.length - 1){
        this.count = 0
      }
    },
    getmusic(item){
      this.$emit('getmusic',item.targetId)
    },

  }
}
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content: center;
.swipe{
  width: 762px;
  min-width: 762px;
  height: 15.375rem;
  box-sizing: border-box;
  .mask{
    position: relative;
    top: 50%;
    z-index:5;
    display: flex;
    justify-content: space-between;
    span{
      padding: 0 0.625rem;
    }

  }
  .list{
    width: 100%;
    height: 12.5rem;
    overflow: hidden;
    ul{
      list-style: none;
      position: relative;
      height: 12.5rem;
      width: 100%;
      li{
        cursor: pointer;
      img{
        width: 33.75rem;
        height: 12.5rem;
      }
    }
    }
    
  }
  .btn{
    width: 47.8125rem;
    min-width: 765px;
    height: 1.625rem;
    text-align: center;
    position: relative;
    top: -0.1875rem;
    span{
      display:inline-block;
      width: 1.0625rem;
      height: 0.125rem;
      background-color: #c8c8c8;
      margin-right: 0.3125rem;
    }

  }
}
}
.active{
  background-color: #c62f2f !important;
}
</style>