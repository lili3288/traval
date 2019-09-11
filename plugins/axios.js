import {
  Message
} from 'element-ui'

export default (nuxt) => {
  nuxt.$axios.onError(res => {
    const {
      message,
      statusCode
    } = res.response.data
    if (statusCode === 400) {
      Message.info(message)
    } else if (statusCode === 401) {
      Message.info('请先登录，即将跳转到登录页')
      console.dir(nuxt)
      nuxt.redirect({path:'/user/login'})
    }
  })


}
