<template>
  <div class="detail">
    <div class="top">
      <img :src="p.img" alt="" />
      <div class="text">
        <div class="one">
          <div class="one_left">
            <span>
              歌单
            </span>
            <span>
             {{p.navname}}
            </span>
          </div>
          <div class="one_right">
            <span class="num">
              <p>歌曲数</p>
              <p>{{p.track}}</p>
            </span>
            <span>
              <p>播放数</p>
              <p>{{p.playCount}}</p>
            </span>
          </div>
        </div>
        <div class="two">
            <img :src="p.img" alt="">
            <span>{{p.name}}</span>
            <span>{{p.creatime}}创建</span>
        </div>
        <div class="three">
            <div class='iti'>
                 <i class="iconfont icon-bofang  "></i>
                 <span>播放全部</span>
                 <i class="iconfont icon-jiahao "></i>
            </div>
            <div class='ni'>
                 <i class="iconfont icon-wenjian "></i>
                <span>收藏({{p.sub}})</span>
            </div>
             <div class='ni'>
                 <i class="iconfont icon-wenjian "></i>
                <span>分享({{p.share}})</span>
            </div>
             <div class='ni'>
                 <i class="iconfont icon-wenjian "></i>
                <span>下载全部</span>
            </div>
        </div>
        <div class="four">
            <span>标签：</span>
            <span v-for="(laber) in p.tags" :key="laber" class='laber'>{{laber?laber:''}}</span>
        </div>
        <div class="five">
            <span>简介：</span>
            <span>{{p.des?p.des:'此人很懒没有任何简介'}}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
        <div class="nav">
            <div v-for="(item,index) in list" :key="index" :class="{active:index===count}"
            class='li'
            >
                <span>{{item}}</span>
                <span v-if="index===1">({{p.comment}})</span>
            </div>
          <div class='search'>
                <input type="text"  placeholder="搜索歌单音乐">
                <i class='iconfont icon-search'></i>
          </div>

        </div>
        <detail-list :songlist='namelist' :times='time' @rightclick='right'></detail-list>
        <rightmenu>
          <span slot="up">
           <i class='iconfont icon-bofang '></i>
           查看歌单
          </span>
           <span slot="down">
           <i class='iconfont icon-bofang '></i>
           不敢兴趣
          </span>
        </rightmenu>
    </div>
  </div>
</template>

<script>
import { detail } from "../../../network/detail";
import {songdetail} from '../../../network/axios';
import DetailList from './detaillist';
import {Details} from './detail';
import rightmenu from './rightmenu';
export default {
    data() {
        return {
            list:['歌曲列表','评论','收藏者'],
            count:0,
            playlist:[],
            p:{},
            namelist:[],
            time:[],
        }
    },
    components: {
      DetailList,
      rightmenu
    },
    created () {
      this.getdetail(this.$route.params.id);
    },
  methods: {
    async getdetail(id) {
    let res = await detail(id)
    let creator = res.playlist.creator
    let s  = new Details(res.playlist,creator)
    this.p = s
    for (const item of res.playlist.trackIds) {
      songdetail(item.id).then(res=>{
        this.time.push(res.songs[0].dt)
        this.namelist.push(res.songs[0])
      })
    }
    },
  },

  watch: {
    $route(id){
      this.getdetail(id.params.id);
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  .top {
    padding: 30px 0 60px 0;
    display: flex;
    img {
      width: 198px;
      height: 198px;
      
    }
    .text {
      flex: 1;
      padding-left: 30px;
      .one {
        display: flex;
        justify-content: space-between;
        .one_left {
          span {
            &:nth-child(1) {
              color: #c62f2f;
              display: inline-block;
              width: 36px;
              height: 18px;
              border: 1px solid #c62f2f;
              font-size: 12px;
              text-align: center;
              line-height: 18px;
            }
            &:nth-child(2) {
              font-size: 22px;
            }
          }
        }
        .one_right {
          display: flex;
          .num {
            font-size: 12px;
            position: relative;
            padding-right: 22px;
            color:#999;
            &::after {
              content: "";
              width: 1px;
              height: 27px;
              position: absolute;
              top: 5px;
              left: 49px;
              background: #e1e1e2;
            }
            p{
                text-align: end;
            }
          }
          span {
            &:nth-child(2) {
              color:#999;
              font-size: 12px;
            }
          }
        }
      }
      .two{
          height: 30px;
          padding-top: 12px;
          display: flex;
          img{
              width: 30px;
              height: 30px;
              border-radius: 15px;
          }
          span{
              line-height:30px;
              display: inline-block;
              font-size: 13px;
              &:nth-child(2){
                padding: 0 10px 0;
                color:#7d6666;
              }
               &:nth-child(3){
                padding: 0 10px 0;
                color:#888;
              }
          }
      }
      .three{
          display: flex;
          padding-top: 15px;
          align-items: center;
          div{
            width: 140px;
            padding: 4px 0px 4px 10px;
             height:28px;
          }
          .iti{
              background-color: #c62f2f;
              border-radius: 5px;
              display: flex;
              align-items: center;
              color: white;
              margin-right: 12px;
              .icon-jiahao{
                  position: relative;
                  right: -15px;
              }
              .icon-bofang{
                  font-size:18px;
                  padding-right: 8px;
              }
              span{
                  font-size: 15px;
              }
          }
          .ni{
              border-radius: 5px;
              display: flex;
              align-items: center;
              border: 1px solid #e1e1e2;
               margin-right: 12px;
              span{
                  font-size: 15px;
              }
              i{
                  padding-right: 8px;
              }
          }
      }
      .four{
          padding-top: 20px;
          font-size: 13px;
          .laber{

                  color: #0c73c2;

          }
      }
      .five{
          padding-top: 8px;
          font-size: 13px;
          display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .bottom{
      .nav{
        padding: 0 0 0 40px;
        display: flex;
        border-bottom: 1px solid #e1e1e2;
        position: relative;
          .li{
              margin-right: 50px;
              padding-bottom: 5px;
              cursor: pointer;
          }
          .search{
              position: absolute;
              right: 0;
              top: -6px;
              input{
                  padding: 4px 10px;
                  border-radius: 10px;
                  border: none;
                  border: 1px solid #e1e1e2;
              }
              i{
                  font-size: 20px;
                  position: relative;
                  left: -30px;
                  top:3px
              }
          } 
      }
  }
}
.active{
    border-bottom: 4px solid #c62f2f;
}
</style>
