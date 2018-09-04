//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    // 轮播图数据
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    isLoading:false
  },
  onLoad () {
    this.getData()
    this.getContent()
    } ,
    getData(){
      this.setData({
        isLoading:true
      })
      fetch.get('/swiper').then(res => {
        this.setData({
          swiperData:res.data,
          isLoading:false
        })
      }).catch(err => {
        this.setData({
          isLoading:false
        })
      })
    },
    getContent(){
      fetch.get('/category/books').then(res => {
        this.setData({
          mainContent: res.data
        })
      })
    },
    // 定义一个点击跳转事件
    jumpBook(event){
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/details/details?id=${id}`,
      })
    }
})