// pages/learning/learning.js
import { fetch } from "../../utils/util.js"
Page({
  data: {
   readList:[],
   isLoading:false,
  },
  onShow () {
   this.getRead()
  },
  getRead() {
    // 获取阅读过的书籍
    return new Promise((resolve,reject) => {
      this.setData({
        isLoading:true
      })
      fetch.get('/readList').then(res => {
        console.log(res)
        resolve(res)
        let arr = [...res.data]
        arr = arr.map(item => {
          item.title.percent = Math.round((item.title.index / item.title.total) * 100)
          return item
        })
        let readList = this.data.readList
        this.setData({
          readList: arr,
          isLoading:false
        })
        this.getTime()
      }).catch(err => {
        this.setData({
          isLoading:false
        })
      })
    })   
  },
  getTime(){
    let content = this.data.readList;
    console.log(content)
    this.setData({
      readList:content
    })
    console.log(this.data.readList)
    content.map(item =>{
      var date1 = new Date(item.updatedTime);
      var date2 = new Date();
      var time1 = date1.getTime();
      var time2 = date2.getTime();
      var time = parseInt((time2 - time1)/1000);
      console.log(time)
      if(time < 60){
        item.time = `${time}秒前`
      }else if(time >= 60 && time <3600){
        time = parseInt(time/60);
        item.time = `${time}分钟前`
      }else if(time > 3600 && time < 86400){
        time = parseInt(time / 3600);
        item.time = `${time}小时前`
      }else if(time > 86400){
        time = parseInt(time / 86400);
        item.time = `${time}天前`
      }
    })
    this.setData({
      readList:content
    })
  },
  jumpRead(event){
    console.log(event)
    const id = event.currentTarget.dataset.id
    const bookId = event.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `/pages/book/book?id=${id}&bookId=${bookId}`,
    })
  },
  jumpDetail(event) {
    console.log(event)
    const id = event.target.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  onShareAppMessage: function () {
  
  }
})