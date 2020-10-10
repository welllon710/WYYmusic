import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import discover from '../views/discover/discover.vue';
import _private from '../views/_private/private.vue';

const phone = ()=>import('../views/discover/childcommps/phone.vue')
const register = ()=>import('../views/discover/childcommps/register.vue')
const phonecode = ()=>import('../views/discover/childcommps/phonecode.vue')

const video = ()=>import('../views/video/video.vue')
const lyric = ()=>import('../views/lyric/lyric.vue')
const friends = ()=>import('../views/friends/friends.vue')
import discover_router from '../views/discover/discover_router/discover_router.vue';
const songsheet = ()=>import('../views/discover/childrouter/songsheet/songsheet.vue')
const radio = ()=>import('../views/discover/childrouter/radio/radio.vue')
const rank = ()=>import('../views/discover/childrouter/rank/rank.vue')
const singer = ()=>import('../views/discover/childrouter/singer/singer.vue')
const newsong = ()=>import('../views/discover/childrouter/newsong/newsong.vue')
const songdaily = ()=>import('../views/main/songdaily.vue')
const detail = ()=>import('../components/conent/detail/detail.vue')
const searchdetail = ()=>import('../components/conent/detail/searchdetail.vue')
const singerdetail =()=>import('../components/conent/detail/singerdetail/singerdetail.vue')
const mvdetail = ()=>import('../views/mvdetail/mvdetail.vue')

const router = new VueRouter({
  routes:[
    {
      path:'',
      redirect:'/discover'
    },
    {
      path:'/private',
      component:_private,

    },
    {
      path:'/video',
      component:video,
    },
    {
      path:'/friends',
      component:friends,
    },
    {
      path:'/discover',
      components:{
        default:discover,
      },
      children:[
        {
          path:'/discover',
          components:{
            default:discover_router,
          }, 
          children:[
            {
              path:'phone', //登录路由
              component:phone
            },
            {
              path:'register',
              name:'register',
              component:register
            },
            {
              path:'phonecode',
              name:'phonecode',
              component:phonecode
            },
          ]
        },
        {
          path:'every',
          component:songdaily,
        },
        {
          path:'detail/:id', // 歌单详情路由
          component:detail

        },
        {
          path:'search/:id' ,//搜索歌曲路由
          // name:'search',
          component:searchdetail,
        },
        {
          path:'singerdetail/:id', //歌手详情路由
          name:'singer',
          component:singerdetail,
        },
        {
          path:'songs',
          component:songsheet
        },
        {
          path:'radio',
          component:radio
        },
        {
          path:'rank',
          component:rank
        },
        {
          path:'singer',
          component:singer
        },
        {
          path:'newsong',
          component:newsong
        },
      ]
    },
    {
      path:'/lyric/:id', //歌词页面路由
      name:'Lyric',
      component:lyric,
    },
    {
      path:'/mvdetail/:id',//mv页面路由
      component:mvdetail
    }
 
  ],
  mode:'history'
})

export default router
