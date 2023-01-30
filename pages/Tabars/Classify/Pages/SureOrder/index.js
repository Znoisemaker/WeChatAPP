// pages/Tabars/Classify/Pages/SureOrder/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    produce: '',
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let item = JSON.parse(options.item)
    this.loadInfo(item)
  },
  ToseletAddress() { //去选择地址
    wx.navigateTo({
      url: '/pages/Tabars/Mine/Pages/AddressPage/index',
      events: {
        getBackAddress: res => {
          this.setData({
            address: res.BackAddress
          })
        }
      }
    })
  },
  SureExchange() { //确认兑换
    let skuitem = this.data.produce
    if (!this.data.address) {
      wx.showToast({
        title: '请选择发货地址',
        icon: 'none'
      })
      return
    }

    let Todo = AV.Object.extend('RewardOrderList')
    let userinfoid = app.globalData.userinfoid
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    let skuPoint = AV.Object.createWithoutData('RewardSkuList', skuitem.skuid)
    let addressPoint = AV.Object.createWithoutData('addressTable', this.data.address.addressid)
    let todo = new Todo()
    todo.set('SkuPoint', skuPoint)
    todo.set('owner', userPoint)
    todo.set('address', addressPoint)
    todo.save().then((todo) => {
      if (skuitem.limitCount > 0) {
        let skuTodo = AV.Object.createWithoutData('RewardSkuList', skuitem.skuid)
        skuTodo.set('limitCount', skuitem.limitCount - 1)
        skuTodo.save()
      }
      let Free = AV.Object.extend('RewardFreeList')
      let free = new Free()
      free.set('Owner', userPoint)
      free.set('SkuPoint', skuPoint)
      free.save().then((fre) => {
        wx.navigateBack()
      })
    })


  },
  loadInfo(item) {
    let userInfoId = app.globalData.userinfoid
    if (userInfoId == undefined) {
      return
    }
    let query = new AV.Query('addressTable')
    let userPoint = AV.Object.createWithoutData('UserInfo', userInfoId);
    query.equalTo('owner', userPoint)
    query.equalTo('isDefault', true)
    query.first().then((addressItem) => {

      var items = {}
      items.addressid = addressItem.id
      items.address = addressItem.attributes.address
      items.detail = addressItem.attributes.detail
      items.isDefault = addressItem.attributes.isDefault
      items.phoneNumber = addressItem.attributes.phoneNumber
      items.name = addressItem.attributes.name
      this.setData({
        produce: item,
        address: items
      })

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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