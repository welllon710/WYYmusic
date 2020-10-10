<template>
    <div class="bigradio" >
     <swipe :list='bannerlist' :swipewidth='wwidth'></swipe> 
    <swipe-two :list='catelist'></swipe-two>
    <discover-radio :radios='hotlist' :radiowidth='wwidth' name= '听听'></discover-radio>
    <payradio :paylist='paylist' :paywidth='wwidth'></payradio>
    <discover-radio :radios='reradio' :radiowidth='wwidth' name= '电台个性推荐'></discover-radio>
    <discover-radio :radios='create' :radiowidth='wwidth' name= '创造|翻唱'></discover-radio>
    <discover-radio :radios='electronics' :radiowidth='wwidth' name= '3D|电子'></discover-radio>
    <discover-radio :radios='story' :radiowidth='wwidth' name= '情感故事'></discover-radio>
    <discover-radio :radios='emotion' :radiowidth='wwidth' name= '情感调频'></discover-radio>
    <discover-radio :radios='twod' :radiowidth='wwidth' name= '二次元'></discover-radio>
  </div>
</template>

<script>
import swipe from '../../../../components/common/swipe';
import SwipeTwo from './r_com/swipe_two';
import DiscoverRadio from '../../../../components/conent/discover/radio';
import payradio from './r_com/payradio';
import { mapGetters } from "vuex";
import { radiobanner,hotradio, payradios,catelist,re_radio,create,electronics,story,emotion,twod} from "../../../../network/axios";
export default {
    data() {
        return {
            bannerlist:[],
            hotlist:[],
            paylist:[],
            itemwidth:'',
            catelist:[],
            reradio:[],
            create:[],
            electronics:[],
            story:[],
            emotion:[],
            twod:[],
        }
    },
    components: {
        swipe,
        SwipeTwo,
        payradio,
        DiscoverRadio,
    },
    mounted(){
        this.getbanner()
        this.gethotradio()
        this.getpayradio()
        this.getcatelist()
        this.getreradio()
        this.getcreate()
        this.getelectronics()
        this.getstory()
        this.getemotiin()
        this.gettwod()
    }, 
    computed: {

    ...mapGetters(['wwidth'])
    },
    methods: {
        getbanner(){
            radiobanner().then(res=>{
                this.bannerlist = res.data
            })
        },
        gethotradio(){
            hotradio().then(res=>{
                this.hotlist = res.djRadios
            })
        },
        getpayradio(){
            payradios().then(res=>{
                this.paylist = res.data.list
            })
        },
        getcatelist(){
            catelist().then(res=>{
              this.catelist.push(res.categories.filter((item,index)=>index<9))
              this.catelist.push(res.categories.filter((item,index)=>index>=9&&index<18))
              this.catelist.push(res.categories.filter((item,index)=>index>=18))
            })
        },
        getreradio(){
            re_radio().then(res=>{
            this.reradio = res.djRadios
            })
        },
        getcreate(){
            create().then(res=>{
                this.create = res.djRadios
            })
        },
        getelectronics(){
            electronics().then(res=>{
               this.electronics = res.djRadios
            })
        },
        getstory(){
            story().then(res=>{
              this.story = res.djRadios
            })
        },
        getemotiin(){
            emotion().then(res=>{
                this.emotion = res.djRadios
            })
        },
        gettwod(){
            twod().then(res=>{
                this.twod = res.djRadios
            })
        }
    }
}
</script>

<style lang="less" scoped>
.slide-enter-active,.slide-leave-active {
  transition: all 1s;
}

.bigradio{
    position: relative;
    width: 100%;
}

</style>