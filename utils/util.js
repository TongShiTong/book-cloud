const baseUrl = "https://m.yaojunrong.com/"

// 封装一个请求数据的方法
const fetch = {
  http(url,method,data){
    return new Promise((resolve,reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header: {
          'content-type': 'application/json'
        },
        success(res){
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
  }
}


exports.fetch = fetch;