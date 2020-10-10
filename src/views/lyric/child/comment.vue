<template>
  <div class="comment">
    <div class="title">
        听友评论<span>(已有{{allpage}}条评论)</span>
    </div>
    <!-- 不可直接输入的评论框 -->
    <div class="content" v-if="iscontent">
        <div class="publish" @click='come'>
            <div class="c_left">
                <i class="iconfont icon-thin-_write_penc"></i>
                <span>发表评论</span>
            </div>
            <div class="c_right">
                <i class="iconfont icon-xiaolian"></i>
                <i class="iconfont icon-aite"></i>
            </div>
        </div>
    </div>
    <!-- 可直接输入的文本框评论 -->
    <div class="contents" v-else>  
        <div class="top">
            <textarea class='text' v-model="text"  ref="text"></textarea>
        </div>
        <div class="bottom">
            <span>
                <i class='iconfont icon-xiaolian '></i>
                 <i class='iconfont icon-aite  '></i>
            </span>
            <button @click='jumpcomment'>评论</button>
        </div>
    </div>
    <div class="main">
        <div class="m_title" v-if="count===0&&aaa">
            精彩评论
        </div>
        <ul v-if="count===0&&aaa">
            <li v-for="(item,index) in cc(list)" :key="index" >
                <img :src="item.img" alt="">
                <div class="l_left">
                   <div class="up">
                       <a href="">{{item.name}}：</a>
                       <span>{{item.content}}</span>
                   </div>
                   <div class="down">
                       <div>
                           <span>{{item.time}}</span>
                       </div>
                       <div>
                           <i class="iconfont icon-dianzan">
                           {{item.like}}
                           </i>
                           <span>分享</span>
                            <span @click='reply(item)'>回复</span>
                       </div>
                   </div>
                </div>
            </li>
        </ul>
        <h4 v-if="count===0&&aaa" >查看更多评论</h4>
        <!-- 分界线 -->
        <div class="m_title">
            最新评论({{allpage}})
        </div>
        <ul v-if="bbb">
            <li v-for="(item,index) in cc(comslist)" :key="index+'idenx'">
                <img :src="item.img" alt="">
                <div class="l_left">
                   <div class="up">
                       <a href="">{{item.name||item.user.nickname}}：</a>
                       <span>{{item.content}}</span>
                   </div>
                   <div class="nage" v-if="item.replyid">
                      <a href="">@{{item.replyname}}:</a>
                      <span>{{item.replycontent}}</span>
                   </div>
                   <div class="down">
                       <div>
                           <span>{{item.time}}</span>
                       </div>
                       <div>
                           <i class="iconfont icon-dianzan" @click='help(item,index)' :class="{active:item.liked}" ref="iii">
                           {{item.like}}
                           </i>
                           <span >分享</span>
                            <span @click='reply(item)'>回复</span>
                       </div>
                   </div>
                </div>
            </li>
        </ul>
       <div class="page"> <paging :total='pageall' @add='addcount' @sub='subcount'></paging></div>
    </div>
  </div>
</template>

<script>
import paging from "../../discover/childrouter/songsheet/s_h_com/pading";
import Comments from '../child/comments';
export default {
    props: {
        list: {
            type: Array,
            default(){
                return []
            }
        },
        comslist:{
            type:Array,
            default(){
                return []
            }
        },
        allpage:{
            type:Number,
            default:0,
        },
        sethelp:{type:Boolean},
        iscontent:{type:Boolean},
    },
    data() {
        return {
            count: 0,
            comments:[],
            text:'',
            name:'',
        }
    },
    computed: {
       pageall(){
           return Math.floor(this.allpage / 20)
       },
       aaa(){
          if(this.list.length!==0){
              return true
          }else{
              return false
          }
       },
       bbb(){
        if(this.comslist){
              return true
          }else{
              return false
          }
       }

    },
    components: {
        paging,
    },
    methods:{
        addcount(res){  //分页器传出当前的页数+++
            this.count = res
            this.$emit('subnum',this.count)
        },
        subcount(res){  //分页器传出当前的页数---
            this.count = res
            this.$emit('addnum',this.count)
        },
        come(){  //打开歌词内的评论窗口
            this.$emit('keyboard')
        },
        jumpcomment(){  //传出文本框内容
            this.$emit('jump',this.text)
        },
        cc(arr){ //处理数据方法,命名有点随意
        let k = null
        let comments = []
        if(Array.isArray(arr)){
        arr.map((item,index)=>{
        k = new Comments(item)
        comments[index] = k 
        })
        }
        return comments
        },
        reply(item){  //回复
            item.page = this.count
            this.text = '回复'+item.name+':'
            this.$emit('comreply',item)  //传出当前点击的回复，所包含的信息
        },
        help(item,index){  //点赞
            this.$emit('help',item,index)
        },
        focus(){
            this.$refs.text.focus()  //获取焦点
     
        },
        bbbb(){
            console.log('获取焦点');
        }
    
    }

}
</script>

<style lang="less" scoped>
.comment{
    i{
        cursor: pointer;
    }
    .title{
        font-size: 17px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e1e1e2;
    }
    .content{
        margin-top: 15px;
        width: 546px;
        height: 50px;
        background-color: #f0f0f2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #888;
        .publish{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 524px;
            height: 28px;
            border: 1px solid #e1e1e2;
            background-color: #fff;
        .c_left{
            padding-left: 10px;
            span{
                padding-left: 5px;
            }
        }
        .c_right{
            padding-right: 10px;
            i{
                padding-left: 8px;
            }
        }
        }
    }
    .contents{
        width: 100%;
        height: 108px;
        margin: 18px 0  40px 0;
        background-color: #f0f0f2;
        
        .top{
            width: 100%;
            display: flex;
            justify-content:center;
        .text{
            height: 45px;
            width: 668px;
            margin: 10px 0;
            padding: 5px 0 0 5px;
            border-color: #e1e1e2;
        }
        }
        .bottom{
            display: flex;
            justify-content:space-between;
            span{
                i{
                    font-size: 20px;
                    padding: 0 8px;
                }
            }
            button{
                padding: 3px 8px;
                border: none;
                background-color: #fff;
                border: 1px solid #e1e1e2;
                margin-right: 8px;
                font-size: 13px;
                border-radius: 5px;
            }

        }

    }
    .main{
        margin-top: 20px;
        .m_title{
            font-size: 13px;
            padding-bottom: 8px;
        }
        ul{
            list-style: none;
            li{
                display: flex;
                padding: 20px 0;
                border-top: 1px solid #e1e1e2;
                img{
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                    margin-right: 14px;
                }
                .l_left{
                    flex: 1;
                    .up{
                        font-size: 13px;
                        a{
                            text-decoration: none;
                        }
                    }
                    .down{
                        display: flex;
                        justify-content: space-between;
                        font-size: 13px;
                        color: #9c9c9c;
                        margin-top: 10px;
                        div{
                            &:nth-child(1){
                                span{
                                    padding-right: 8px;
                                }
                            }
                            &:nth-child(2){
                                i{
                                    font-size: 13px;
                                }
                                span{
                                    padding-left: 20px;
                                    position: relative;
                                    &::before{
                                        content: "";
                                        width: 1px;
                                        height: 15px;
                                        position: absolute;
                                        top: 0px;
                                        left: 9px;
                                        background: #e1e1e2;
                                    }
                                }
                            }
                        }
                    }
                    .nage{
                        width: 496px;
                        background-color: #f0f0f2;
                        line-height: 32px;
                        font-size: 13px;
                        padding: 0 10px;
                        a{
                            text-decoration: none;
                        }
                        span{
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
        h4{
            font-weight: 400;
            text-align: center;
            padding: 20px 0 40px 0;
        }
        .page{
           margin: 20px 0 40px 0;
        }
    }
}
.active{
    color:red ;
}
</style>