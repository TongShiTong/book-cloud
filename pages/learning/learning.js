// pages/learning/learning.js
import { fetch } from "../../utils/util.js"
Page({
  data: {
   readList:[]
  },
  onShow () {
   this.getRead()
  },
  getRead() {
    // 获取阅读过的书籍
      fetch.get('/readList').then(res => {
        console.log(res)
        let arr = [...res.data]
        arr = arr.map(item => {
          item.title.percent = Math.round((item.title.index/item.title.total) * 100)
          return item
        })
        this.setData({
          readList: arr,
        })
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