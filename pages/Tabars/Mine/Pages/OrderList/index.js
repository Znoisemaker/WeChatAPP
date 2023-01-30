// pages/Tabars/Mine/Pages/OrderList/index.js
import AV from '../../../../../libs/av-core-min.js'
const util = require('../../../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.loadInfo()
  },
  OrderClickItem(e){
    let index = e.currentTarget.dataset.index
    let list = this.data.orderList
    let item = list[index]
    wx.navigateTo({
      url: '/pages/Tabars/Mine/Pages/OrderDetail/index?item=' + item.OrderId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  loadInfo() {

    let userinfoid = app.globalData.userinfoid
    let Query = new AV.Query('RewardOrderList')
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    Query.equalTo('owner', userPoint)
    Query.include('SkuPoint')
    Query.find().then((list) => {
      let Arr = Array.from(list)
      var list = []
      for (var i = 0; i < Arr.length; i++) {
        let t = Arr[i] 
        var temp = {}
        if (t.attributes.SkuPoint.attributes) {
          let item = t.attributes.SkuPoint
          temp.Skuid = item.id
          temp.OrderId = t.id
          temp.SkuDetail = item.attributes.SkuDetail
          temp.freeSort = item.attributes.freeSort
          temp.icon = item.attributes.icon.attributes.url
          temp.createdAt = util.FormatChinesTimeToSecond(t.createdAt)
          list.push(temp)
        }
        this.setData({
          orderList:list
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})