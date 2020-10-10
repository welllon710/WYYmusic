<template>
  <div class="bigbox">
    <div class="swipe_two" @click='move'>
      <div class="swipe_left">
       <img src="~assets/image/left.png" class='swipe_left_one'>
      </div>
 
      <div class="swipe_center" >
              <transition-group name="slide">
          <div class="three" v-for="(item,index) in list" :key="index"  v-show="index===count">
         
           <div class="one" v-for="(itemm,index) in item" :key="index" :class="{active:index===count}">
             <img :src="itemm.pic56x56Url" >
             <span>{{itemm.name}}</span>
           </div>
        
          </div>
            </transition-group>
      </div>
      <div class="swipe_right">
        <img src="~assets/image/right.png" class='swipe_right_one'>
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    }
  },
  data() {
    return {
      count:0
    }
  },
  methods: {
    move(e){
     if(e.target.className ==='swipe_left_one'){
      this.count--
      if(this.count <= 0){
        this.count = 0
      }
     }
     if(e.target.className ==='swipe_right_one'){
        this.count++
        if(this.count >2){
          this.count = 0
        }
     }
    }
  }
  
}
</script>

<style lang="less" scoped>
.bigbox{
  width: 100%;
  display: flex;
  justify-content: center;
.swipe_two{
    padding-top: 18px;
    height: 68px;
    display: flex;
    justify-content: space-between;
    width: 1040px;
    .swipe_left{
      width: 50px;
       cursor: pointer;
      img{
        width: 40px;
        height: 40px;
        position: relative;
        top: 7px;
      }
    }
    .swipe_right{
       width: 50px;
       cursor: pointer;
      img{
        width: 40px;
        height: 40px;
        position: relative;
        top: 7px;

      }
      
    }
    .swipe_center{
      flex: 1;
       overflow: hidden;
       position: relative;
      .three{
      width: 100%;
      display: flex;
      justify-content:space-evenly;
      position:absolute;
        .one{
          width: 68px;
          height: 68px;
           display: flex;
           flex-direction: column;
           cursor: pointer;
         img{
          width: 30px;
          height: 30px;
          align-self: center;
          color: #666666;
         }
         span{
           font-size: 12px;
           text-align: center;
           padding-top: 10px;
         }
         
        
        }
      }
    }  
}
}
.active{
  color: #c62f2f;
}

.slide-enter-active,.slide-leave-active {
  transition: all 1s;
}
.slide-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>