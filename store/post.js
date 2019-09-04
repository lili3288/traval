// 用户管理
export const state = () => ({
    // 数据
    userInfo: {
      token: '',
      username: {}
    }
  })
  export const mutations = {
    getUserInfo(state, data) {
      state.userInfo = data
    },
    clearUserInfo(state){
      state.userInfo=''
    }
  }
  export const actions = {}
  