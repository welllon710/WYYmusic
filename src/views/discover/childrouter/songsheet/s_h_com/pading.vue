<template>
  <div class="pading" @click="father" v-if="total > 0">
    
        <div class='page_left' >
            《
        </div>
        <span class='text' v-for="(item,index) in abc" :key='index' :class="{active:item === count}" >
            {{item}}
        </span>
        <div class='page_right' >
            》
        </div>
   
  </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default:0,
        }
    },
    data() {
        return {
            count:1,
        }
    },
    computed: {
        abc(){
            let a = this.count
            let b = this.total //13
            if(b > 10){
            if(a <= 5){
                return [1,2,3,4,5,6,7,8,9,'...',b]
            }else if(a >= b-4){  //9
                return [1,'...',b-8,b-7,b-6,b-5,b-4,b-3,b-2,b-1,b]
            }else{
                return [1, '...', a-3, a-2, a-1, a, a+1, a+2, a+3, '...', b]
            }        
            }else{
                return b
            } 
        },
    },
    methods: {
      father(e){
        if(e.target.className === 'page_left'){
             this.count--
             if(this.count < 1){
                 this.count = 1
             }
            this.$emit('sub',this.count-1)

        }
        if(e.target.className === 'page_right'){
            console.log('jia ');
            this.count++
            if(this.count > this.total ){
                this.count = this.total
             }
            this.$emit('add',this.count -1)
        }
      },

    }

}
</script>

<style lang="less" scoped>
.pading{
    width: 400px;
    height: 22px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .page_left{
        width: 22px;
        height: 22px;
        border: 1px solid #e1e1e2;
        position: relative;
        z-index: 10;
        cursor: pointer;
    }
    .text{
        flex: 1;
        font-size: 10px;
        display: flex;
        justify-content:center;
        align-items: center;
        :last-child{
            width: 40px;
        }
    }
    .page_right{
        width: 22px;
        height: 22px;
        border: 1px solid #e1e1e2;
        cursor: pointer;
       
    }
}
.active{
    color: #c62f2f; 
}

</style>