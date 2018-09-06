const baseUrl = "https://m.yaojunrong.com/"

// 封装一个请求数据的方法
const fetch = {
  http(url,method,data){
    return new Promise((resolve,reject) => {
      let token = wx.getStorageSync('token') 
      let header = {
        'content-type': 'application/json'
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res){
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err){
          reject(err)
        }
      })
    }) 
  },
  // 定义get方法
  get(url,data){
    return this.http(url,'GET',data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  }
}

const login = () => {
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:"wx07e04f2e63c2e677",
        secret:"058e0e2ccd118c3ccbca49e5a515af5a"
      }).then(res => {
        console.log(res)
      })
    }
  })
}
exports.login = login;
exports.fetch = fetch;