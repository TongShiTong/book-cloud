// pages/self/self.js
import { fetch } from "../../utils/util.js"
Page({

  data: {
    userInfo: {}, // 表示用户的信息
    collectionNum:{},
    isLoading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNum()
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },
  getNum () {
    this.setData({
      isLoading: true
    })
    fetch.get('/collection/total').then(res => {
      this.setData({
        collectionNum: res,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  onShareAppMessage: function () {
  
  }
})