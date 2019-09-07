// 用户管理
export const state = () => ({
  // 数据
  cityInfo: [],

  // departCity: "", //出发城市
  // departCode: "", //出发城市代码
  // destCity: "", //目标城市
  // destCode: "", //目标城市代码
  // departDate: "" //日期

})
export const mutations = {
  getCityInfo(state, data) {
    let fn = 0
    // 判断是否是重复的搜索记录
    for (let i = 0; i < data.length - 1; i++) {
      if (data[data.length - 1].departCity === data[i].departCity && data[data.length - 1].destCity === data[i].destCity && data[data.length - 1].departDate === data[i].departDate) {
        fn += 1
        return
      }
    }
    if (fn === 0) {
      if (data.length > 5) {
        data.splice(0, 1)
      }
      state.cityInfo = data
    }

  }
}
export const actions = {}
