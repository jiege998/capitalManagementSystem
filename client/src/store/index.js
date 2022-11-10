import { createStore } from 'vuex'
const types ={
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER',
  CLEAR_USER:'CLEAR_USER'
}
export default createStore({
  state: {
    isAuthenticaten:false,
    user:{}
  },
  getters: {
    isAuthenticaten:state=>state.isAuthenticaten,
    user:state=>state.user
  },
  mutations: {
    [types.SET_AUTHENTICATED](state,isAuthenticaten){
      state.isAuthenticaten = isAuthenticaten
    },
    [types.SET_USER](state,user){
      if(user){
        state.user = user
      }else{
        state.user = {}
      }
    },
    [types.CLEAR_USER](state){
      state.user={}
    },
  },
  actions: {
    setAUthenticaten:({commit},isAuthenticaten)=>{
      commit(types.SET_AUTHENTICATED,isAuthenticaten)
    },
    setUser:({commit},user)=>{
      commit(types.SET_USER,user)
    },
    clearUser:({commit})=>{
      commit(types.CLEAR_USER)
    }
  },
  modules: {
  }
})
