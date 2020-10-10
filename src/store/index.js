import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../components/common/storage'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    search_history:[],
    profile:storage.get('proify') || {},
    wwidth: 762,
    url: storage.get('playlist')||[],
    time:"",
    isplay:false,
    index:-1,
    ishistory:true,
    allhistory:[],
  },
  mutations: {
   add(state,payload){
   let abc = state.search_history.find(item=>item===payload)
   if(abc){
     return
   }else{
    state.search_history.push(payload)
   }
   },
   person(state,payload){
    storage.set('proify',payload)
    state.profile = payload
   },
   changewidth(state,payload){
    state.wwidth = payload
   },
   addurl(state,payload){
    let abc = state.url.find(item=>item.name===payload.name)
    let arr = []
    if(abc){
      return
    }else{
      state.index++
      payload.index = state.index
      arr.push(payload)
      state.url.push(payload)
    }
    storage.set('playlist',state.url)
   },
   gettime(state,payload){
    state.time = payload
   },
   getbool(state,payload){
    state.isplay = payload
   },
   changeindex(state,payload){
    state.index = payload
   },
   history(state,payload){
    state.ishistory = payload
   },
   alldata(state,payload){
     state.allhistory = payload
   }
  },
  actions: {
    
  },
  modules: {
  },
  getters:{
    personmeg(state){
      return state.profile
    },
    songlist(state){
      return state.songSheet
    },
    wwidth(state){
      return state.wwidth
    },
    backurl(state){
      return state.url
    },
    backtime(state){
      return state.time
    },
    backbool(state){
      return state.isplay
    },
    backindex(state){
      return state.index
    },
    backhistory(state){
      return state.ishistory
    },
    backalldata(state){
      return state.allhistory
    }
  }
})

export default store